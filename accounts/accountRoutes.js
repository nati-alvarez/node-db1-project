const express = require("express");
const router = express.Router();
const db = require('../data/dbConfig');

router.get("/", (req, res, next)=>{
    let sqlQuery = db("accounts");
    
    //optional query parameters
    if(req.query.limit) sqlQuery.limit(req.query.limit);

    if(req.query.sortby) sqlQuery.orderBy(req.query.sortby, req.query.sortdir);

    sqlQuery.then(accounts=>{
      res.status(200).json(accounts);
    }).catch(err=>{
      next(err);
    });
});

router.post("/", (req, res, next)=>{
    const {name, budget} = req.body;
    if(!name || !budget) return res.status(400).json({message: "Name and budget fields are required."});
    db("accounts").insert({name: name, budget: budget}, ["id"]).then(accountId=>{
        accountId = accountId[0].id;
        res.status(201).json({id: accountId, ...req.body});
    }).catch(err=>{
        next(err);
    });
});

router.get("/:id", validateAccount, (req, res, next)=>{
    res.status(200).json(req.account);
});

router.delete("/:id", validateAccount, (req, res, next)=>{
    db("accounts").where({id: req.params.id}).del().then(numOfAccountsDeleted=>{
        res.status(200).json(req.account);
    }).catch(err=>{
        next(err);
    });
});

router.put("/:id", validateAccount, (req, res, next)=>{
    const {name, budget} = req.body;
    if(!name || !budget) return res.status(400).json({message: "N"})
    db("accounts").where({id: req.params.id}).update({name: name, budget: budget}).then(numOfAccountsUpdated=>{
        res.status(200).json({id: req.params.id, ...req.body});
    }).catch(err=>{
        next(err);
    });
});

function validateAccount (req, res, next){
    db("accounts").where({id: req.params.id}).then(account=>{
        account = account[0];
        if(!account) return res.status(404).json({message: "Account not found."});
        req.account = account;
        next();
    }).catch(err=>{
        next(err);
    });
}

module.exports = router;
