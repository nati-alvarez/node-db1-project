const express = require("express");
const router = express.Router();
const db = require('../data/dbConfig');

router.get("/", (req, res, next)=>{
    db("accounts").then(accounts=>{
      res.status(200).json(accounts);
    }).catch(err=>{
      next(err);
    })
});

module.exports = router;
