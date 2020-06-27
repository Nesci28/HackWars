import * as express from 'express';

class ResponseHandler {
  statusCode: number;
  message: string;
  data: any;

  constructor(statusCode: number, message: string, data?: any) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

const handleResponse = (body: ResponseHandler, res: express.Response) => {
  const { statusCode, message, data } = body;
  res.status(statusCode).json({
    status: 'OK',
    statusCode,
    message,
    data,
  });
};

export { ResponseHandler, handleResponse };
