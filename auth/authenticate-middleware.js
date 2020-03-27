let jwt = require("jsonwebtoken");

module.exports = (req, res, next) =>
{
  let { authorization } = req.headers;

  if (authorization)
  {
      jwt.verify(authorization, "secret", (err, decodedToken)=>
      {
          if (!err)
          {
              console.log(decodedToken);
              next();
          }
          else
              res.status(401).send("You shall not pass!");
      });
  }
  else
      res.status(401).send("You shall not pass!");
};
