class ResponseHandler {
  statusCode;
  message;
  data;

  constructor(statusCode, message, data?) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

const handleResponse = (err, res) => {
  const { statusCode, message, data } = err;
  res.status(statusCode).json({
    status: 'OK',
    statusCode,
    message,
    data,
  });
};

module.exports = {
  ResponseHandler,
  handleResponse,
};
