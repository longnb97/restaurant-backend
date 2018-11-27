const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt-nodejs')

const AccountModel = require('../models/accountModel')

authRouter.use('/', (req, res, next) => {
    console.log('Authorization router em ei')
    next()
})

authRouter.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).send({ success: 0, message: ' may dang thieu pass hoac username' })
    } else {
        AccountModel.findOne({username})
            .then(accountFound => {
                if (!accountFound) {
                    res.status(404).send({ success: 0, message: "account Not found" })
                } else {
                    const compare = bcrypt.compareSync(password, accountFound.hashPassword)
                    if(compare){
                        req.session.user = {username: accountFound.username, displayName: accountFound.displayName, id: accountFound._id};
                        console.log("A",req.session)
                        res.send({ success: 1, message: "Logged in!",accountFound  })
                    }
                    else res.status(401).send({ success: 0, message: "Wrong password" })
                }
            })
            .catch(error => res.status(500).send({ success: 0, error }))
    }
})

authRouter.get("/logout", (req, res) => {
    req.session.destroy((err) =>{
        if(err) res.status(500).send({success:0 ,err })
        else res.send({success: 1, message:"logged out!"})
    })
})

authRouter.get('/login/check', (req, res) => {
    if(req.session.user) res.send({success: 1, message: "success", user: req.session.user});
    else res.send({success: 0, message: "failed"})
})


// function isLoggedin(req, res, next){
//     if(req.isAuthenticated()){
//         return next()
//     }
// }

module.exports = authRouter;