import express from 'express';
import errorMiddleware from './errors/errorMiddleware';
import carsRoute from './routes/carRoute';
import motorRoute from './routes/motorRoute';

const app = express();

app.use(express.json());

app.use('/cars', carsRoute);
app.use('/motorcycles', motorRoute);

app.use(errorMiddleware);

export default app;
