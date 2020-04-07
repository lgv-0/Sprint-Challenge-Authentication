const router = require('express').Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
let DBHelper = require("../database/dbHelper");

router.post('/register', (req, res) =>
{
  DBHelper.GetUser(req.body.username).then((response)=>
  {
    if (response != undefined)
    {
      res.status(300).send("Username already exists");
      return;
    }

    bcryptjs.hash(req.body.password, 8, (err, hash)=>
    {
      if (err != null)
      {
        res.status(300).send(err);
        return;
      }

      DBHelper.InsertUser(req.body.username, hash).then((response)=>
      {
        res.status(200).send(response);
      }).catch(()=>
      {
        res.status(500).send("Internal Server Error");
      });
    });
  }).catch(()=>
  {
    res.status(500).send("Internal Server Error");
  });
});

router.post('/login', (req, res) =>
{
  DBHelper.GetUser(req.body.username).then((response)=>
  {
    if (response === undefined)
    {
      res.status(401).send("Wrong username/password");
      return;
    }

    bcryptjs.compare(req.body.password, response.password).then((response)=>
    {
      if (!response)
      {
        res.status(401).send("Wrong username/password");
        return;
      }

      let Token = 
        jwt.sign({username:response.username}, "secret", {expiresIn: "1h"});

      res.status(200).send({msg:"Success", token:Token});
    });
  }).catch(()=>
  {
    res.status(500).send("Internal Server Error");
  })
});

module.exports = router;
