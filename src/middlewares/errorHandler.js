import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({
      message: err.message,
      data: err,
    });
    return;
  }

  console.log(err);

  res.status(500).json({
    message: 'something went wrong',
  });
};
