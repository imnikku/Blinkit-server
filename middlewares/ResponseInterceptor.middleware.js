function ResponseInterceptor(req, res, next) {
  const originalJson = res.json;
  res.json = function (data) {
    const modifiedData = {
      ...data,
      timestamp: new Date().toISOString(),
      status: res.statusCode < 400,
      method: req.method, // HTTP method
      path: req.originalUrl, // The requested URL
    };
    originalJson.call(this, modifiedData);
  };

  next();
}

export default ResponseInterceptor;
