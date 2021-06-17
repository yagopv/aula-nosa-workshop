exports.validatorMiddleware = function (req, res, next) {
  if (req.method === "POST" && !req.body.title) {
    return res.status(400).send({ error: "Missing title" });
  }

  next();
};
