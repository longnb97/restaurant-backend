const express = require('express')
const menuRouter = express.Router()
const MenuModel = require('../models/menuModel')

menuRouter.use('/', (req, res, next) => {
    console.log(' menu router middleware em ei')
    next();
})

menuRouter.get('/', async (req, res) => {
    try {
        let menuFound = await MenuModel.find()
        if (!menuFound) res.status(404).send({ success: 0, message: "Food not found" })
        else res.status(200).send({ success: 1, menuFound })
    } catch (error) {
        res.status(500).send({ success: 0, error })
    }
})

menuRouter.get('/:menuId', async (req, res) => {
    try {
        let menuFound = await MenuModel.findById(req.params.menuId)
        if (!menuFound) res.status(404).send({ success: 0, message: "Food not found" })
        else res.status(200).send({ success: 1, menuFound })
    } catch (error) {
        res.status(500).send({ success: 0, error })
    }
})

menuRouter.post('/', (req, res) => {
    const { type, name, imageUrl, price, state } = req.body;
    MenuModel.create(
        { type, name, imageUrl, price, state },
        (error, menuCreated) => {
            if (error) res.status(500).send({ success: 0, error })
            else res.status(200).send({ success: 1, menuCreated })
        }
    )
})

menuRouter.delete('/:menuId', async (req, res) => {
    try {
        let menuFound = await MenuModel.findByIdAndRemove(req.params.menuId)
        if (!menuFound) res.status(404).send({ success: 0, message: "Food not found" })
        else res.status(200).send({ success: 1, menuFound })
    } catch (error) {
        res.status(500).send({ success: 0, error })
    }
})

menuRouter.put('/:menuId', async (req, res) => {
    try {
        const { category, name, imageUrl, price, state } = req.body;
        const updateInfo = { category, name, imageUrl, price, state }
        console.log(req.body);
        console.log(updateInfo)
        let menuFound = await MenuModel.findById(req.params.menuId)
        if (!menuFound) res.status(404).send({ success: 0, message: "Food not Found" })
        else {
            for (let key in updateInfo) {
                if (updateInfo[key]) {
                    menuFound[key] = updateInfo[key]
                }
            }
            let dataSaved = await menuFound.save()
            res.status(200).send({ success: 1, dataSaved})
        }
    } catch (error) {
        res.status(500).send({ success : 0 , error})
    }
})

module.exports = menuRouter;