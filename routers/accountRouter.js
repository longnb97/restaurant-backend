const express = require('express')
const accountRouter = express.Router()
const bcrypt = require('bcrypt-nodejs')

const AccountModel = require('../models/accountModel')


accountRouter.use('/', (req, res, next) => {
    console.log("user router middleware")
    next()
})

accountRouter.get('/test', (req, res) => {
    console.log('test user router okk')
})

accountRouter.post('/', (req, res) => {
    const { username, password, email, avatarUrl} = req.body;
    const salt = bcrypt.genSaltSync()
    const hashPassword = bcrypt.hashSync(password, salt)
    AccountModel.create(
        { username, hashPassword, email, avatarUrl },
        (err, accountCreated) => {
            if (err) res.status(500).send({ success: 0, err })
            else res.status(200).send({ success: 1, message: "created", accountCreated })
        }
    )

})

accountRouter.get('/', async (req, res) => {
    try {
        let accountFound = await AccountModel.find()
        if (!accountFound) res.status(404).send({ success: 0, message: "account not found" })
        else res.status(200).send({ success: 1, accountFound })
    } catch (error) {
        res.status(500).send({ success: 0, error })
    }
})

accountRouter.get('/:accountId', (req, res) => {
    try {
        AccountModel.findById({ _id: req.params.accountId }, (accountFound) => {
            if (!accountFound) res.status(404).send({ success: 0, message: "account not found" })
            else res.status(200).send({ success: 1, accountFound })
        })
    } catch (error) {
        res.status(500).send({ success: 0 })
    }
})

accountRouter.delete('/:accountId', (req, res) => {
    try {
        AccountModel.findByIdAndRemove({ _id: req.params.accountId }, (err, accountDeleted) => {
            if (!accountDeleted) res.status(404).send({ success: 0, message: "account not found" })
            else res.status(200).send({ success: 1, message: "deleted" })
        })
    } catch (error) {
        res.status(500).send({ success: 0, error })
    }
})

accountRouter.put('/:accountId', async (req, res) => {
    try {
        const { password, email, avatarUrl, displayName } = req.body;
        const updateInfo = { password, email, avatarUrl, displayName };
        console.log(req.body)
        console.log(updateInfo)
        let accountFound = await AccountModel.findById(req.params.accountId)
        if (!accountFound) res.status(404).send({ success: 0, message: "User not found" })
        else {
            for (let key in updateInfo) {
                if (key == 'password' && updateInfo[key]) {
                    let compare = bcrypt.compareSync(updateInfo.password, accountFound.hashPassword)
                    if (!compare) {
                        accountFound.hashPassword = bcrypt.hashSync(updateInfo.password, bcrypt.genSaltSync())
                    }
                }
                else if (updateInfo[key]) {
                    accountFound[key] = updateInfo[key]
                }
            }
            let dataSaved = await accountFound.save();
            res.status(200).send({ success: 1, dataSaved })
        }
    } catch (error) {
        res.status(500).send({ success: 0, error })
    }

})

module.exports = accountRouter;