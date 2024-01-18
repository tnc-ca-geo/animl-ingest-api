import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Err from '@openaddresses/batch-error';
import S3 from '@aws-sdk/client-s3';

export default async function router(schema: any) {
    const s3 = new S3.S3Client({ region: process.env.AWS_REGION });

    await schema.post('/login', {
        name: 'Get Login',
        group: 'ImageForward',
        auth: 'user',
        description: 'Login and get a token to use to post images',
        body: {
            type: 'object',
            additionalProperties: false,
            required: ['Id', 'Token'],
            properties: {
                Id: { type: 'string' },
                Token: { type: 'string' }
            }
        },
        res: {
            type: 'object',
            additionalProperties: false,
            required: ['token', 'message'],
            properties: {
                token: { type: 'string' },
                message: { type: 'string' }
            }
        }
    }, async (req: Request, res: Response) => {
        try {
            if (!process.env.LOGIN_ID || !process.env.LOGIN_TOKEN) throw new Err(500, null, 'ID & Token haven\'t been configured on this API')
            if (req.body.Id !== process.env.LOGIN_ID || req.body.Token !== process.env.LOGIN_TOKEN) throw new Err(401, null, 'Unauthorized');

            return res.json({
                token: jwt.sign({ id: req.body.id }, process.env.SECRET, { algorithm: 'HS256', expiresIn: '7d' }),
                message: 'Token Generated'
            });
        } catch (err) {
            return Err.respond(err, res);
        }
    });

    await schema.post('/images', {
        name: 'Upload Image',
        group: 'ImageForward',
        auth: 'user',
        description: 'Uploads and image with json metadata',
        body: {
            type: 'object',
            additionalProperties: false,
            required: ['Token', 'Image', 'Metadata'],
            properties: {
                Token: { type: "string" },
                Camera_serial_number: { type: "string" },
                Image: { type: "string" },
                Image_group: { type: "string" },
                Metadata: {
                    type: 'object',
                    additionalProperties: false,
                    required: ['File_name', 'date_time_taken'],
                    properties: {
                        File_name: { type: "string" },
                        date_time_taken: { type: "string" }
                    }
                }
            }
        },
        res: {
            type: 'object',
            additionalProperties: false,
            required: ['token', 'message'],
            properties: {
                message: { type: 'string' }
            }
        }
    }, async (req: Request, res: Response) => {
        try {
            jwt.verify(req.body.token, process.env.SECRET);
        } catch (err) {
            return Err.respond(new Err(401, err, 'Unauthorized'), res);
        }

        try {
            const img = Buffer.from(req.body.image, 'base64');

            await s3.send(new S3.PutObjectCommand({
                Bucket: process.env.BUCKET,
                Key: req.body.metadata.file_name,
                Body: img
            }));

            return res.json({ message: 'Image Posted' })
        } catch (err) {
            return Err.respond(err, res);
        }
    });
}
