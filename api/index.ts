import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import serverless from 'serverless-http';
import morgan from 'morgan';
// @ts-ignore
import Schema from '@openaddresses/batch-schema';

const app = express();

app.disable('x-powered-by');
app.use(morgan('combined'));
app.use(bodyParser.json());

const schema = new Schema(express.Router(), { openapi: false });

app.use('/api', schema.router);

await schema.load(new URL('./routes/', import.meta.url), {}, { silent: true });
schema.not_found();
schema.error();

const handler = serverless(app);

const startServer = async () => {
    app.listen(3000, () => {
        console.log('listening on port 3000!');
    });
};

startServer();

export { handler };
