const express = require("express");
const router = express.Router();
const db = require('../data/dbConfig');

router.get("/", (req, res, next)=>{
    db("accounts").then(accounts=>{
      res.status(200).json(accounts);
    }).catch(err=>{
      next(err);
    });
});

router.get("/:id", (req, res, next)=>{
    db("accounts").where({id: req.params.id}).then(user=>{
        user = user[0];
        if(!user) res.status(404).json({message: "User not found."});
        res.status(200).json(user);
    }).catch(err=>{
        next(err);
    });
});

module.exports = router;
