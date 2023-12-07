import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import serverless from 'serverless-http';
import morgan from 'morgan';
import S3 from '@aws-sdk/client-s3';
// @ts-ignore
import Schema from '@openaddresses/batch-schema';

const app = express();

app.disable('x-powered-by');
app.use(morgan('combined'));
app.use(bodyParser.json());

const s3 = new S3.S3Client({ region: process.env.AWS_REGION });
const schema = new Schema(express.Router(), { openapi: false });

app.use('/api', schema.router);

await schema.load(new URL('./routes/', import.meta.url), {}, { silent: true });

const handler = serverless(app);

const startServer = async () => {
    app.listen(3000, () => {
        console.log('listening on port 3000!');
    });
};

startServer();

export { handler };
