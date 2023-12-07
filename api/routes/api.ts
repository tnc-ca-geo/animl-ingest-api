import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Err from '@openaddresses/batch-error';

export default async function router(schema: any) {
    await schema.post('/login', {
        name: 'Get Login',
        group: 'ImageForward',
        auth: 'user',
        description: 'Login and get a token to use to post images',
        body: {
            type: 'object',
            additionalProperties: false,
            required: ['id', 'token'],
            properties: {
                id: { type: 'string' },
                token: { type: 'string' }
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
            return res.json({
                token: jwt.sign({ id: req.body.id }, process.env.SECRET, {
                    algorithm: 'HS256',
                    expiresIn: '1h'
                }),
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
            required: ['token', 'image'],
            properties: {
                token: { type: "string" },
                camera_serial_number: { type: "string" },
                image: { type: "string" },
                image_group: { type: "string" },
                metadata: {
                    type: 'object',
                    additionalProperties: false,
                    required: ['file_name', 'date_time_taken'],
                    properties: {
                        file_name: { type: "string" },
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

            return res.json({
                message: 'message-123'
            })
        } catch (err) {
            return Err.respond(err, res);
        }
    });
}
