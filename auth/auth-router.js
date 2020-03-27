const router = require('express').Router();
const bcryptjs = require("bcryptjs");
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
      }).catch((error)=>
      {
        res.status(500).send("Internal Server Error");
      });
    });
  }).catch((error)=>
  {
    res.status(500).send("Internal Server Error");
  });
});

router.post('/login', (req, res) =>
{
  
});

module.exports = router;
