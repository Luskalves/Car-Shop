import express from 'express';
import errorMiddleware from './errors/errorMiddleware';
import carsRoute from './routes/carRoute';

const app = express();

app.use(express.json());

app.use('/cars', carsRoute);

app.use(errorMiddleware);

export default app;
