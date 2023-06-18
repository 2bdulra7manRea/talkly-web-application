 const validateHeadersAuthorizationToken = (req, res, next) => {
  try {
console.log(req.url);
    if(req.url==='/auth/login' || req.url==='/auth/register'){
        next()
        return;
    }

    const bearerToken = req.headers["authorization"];
    if (!bearerToken) {
      res.status(403).json({ error: "Missing Authorization Header" });
      return;
    }

    const token = bearerToken.split(" ")[1];

    req.token = token;

    next();
  } catch (error) {
    res.status(403).json({ error: error?.message });
  }
};


module.exports ={validateHeadersAuthorizationToken}