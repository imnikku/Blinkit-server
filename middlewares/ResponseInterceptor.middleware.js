function ResponseInterceptor(req, res, next) {
  console.log("kkk");
  // Save the original `res.send` and `res.json` methods
  const originalSend = res.send;
  const originalJson = res.json;

  // Overwrite `res.send`
  res.send = function (body) {
    // Ensure the response is JSON formatted
    const modifiedBody = {
      status: "success",
      data: typeof body === "object" ? body : { message: body }, // Handle both objects and strings
    };

    // Call the original `res.send` with the modified body
    originalSend.call(this, modifiedBody);
  };
  console.log("nitesh");

  // Overwrite `res.json`
  res.json = function (body) {
    // Ensure the response is JSON formatted
    const modifiedBody = {
      status: "success",
      data: body, // JSON responses are already objects
    };

    // Call the original `res.json` with the modified body
    originalJson.call(this, JSON.stringify(modifiedBody));
  };

  next(); // Pass control to the next middleware or route handler
}

export default ResponseInterceptor;
