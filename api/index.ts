import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import serverless from 'serverless-http';
import morgan from 'morgan';

const app = express();

app.disable('x-powered-by');
app.use(morgan('combined'));
app.use(bodyParser.json());

app.post('/login', async (req: Request, res: Response) => {

});

const handler = serverless(app);

const startServer = async () => {
    app.listen(3000, () => {
        console.log('listening on port 3000!');
    });
};

startServer();

export { handler };
