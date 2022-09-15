import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  const { status, message } = err;

  if (!status) return res.status(500).json({ error: 'something got wrong!' });

  return res.status(status).json({ error: message });
};

export default errorMiddleware;