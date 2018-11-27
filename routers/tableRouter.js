const express = require('express')
const tableRouter = express.Router()

const TableModel = require('../models/tableModel')

tableRouter.use('/', (req, res, next) => {
    console.log('table router middleware em ei')
    next();
})

tableRouter.post('/', (req, res) => {
    try {
        const { url, chairNumber, status, tableNumber, owner } = req.body;
        TableModel.create(
            { url, chairNumber, status, tableNumber, owner },
            (error, tableCreated) => {
                if (error) res.status(500).send({ success: 0, error })
                else res.status(200).send({ success: 1, tableCreated })
            }
        )
    } catch (error) {
        res.status(500).send({ success: 0, error })
    }
})

tableRouter.get('/', (req, res) => {
    try {
        TableModel.find({}, (err, tableFound) => {
            if (err) res.status(500).send({ success: 1, error })
            else if (!tableFound) res.status(404).send({ success: 0, message: "Table not found" })
            else res.status(200).send({ success: 1, tableFound })
        })
    } catch (error) {
        res.status(500).send({ success: 1, error })
    }
})

tableRouter.get('/:tableId', async (req, res) => {
    try {
        let tableFound = await TableModel.findById(req.params.tableId)
        if (!tableFound) res.status(404).send({ success: 0, message: " table not found" })
        else res.status(200).send({ success: 1, tableFound })
    } catch (error) {
        res.status(500).send({ success: 0, error })
    }
})

tableRouter.get('/tablenumber/:tableNumber', async (req, res) => {
    try {
        let tableFound = await TableModel.findOne({tableNumber: `${req.params.tableNumber}`})
        if (!tableFound) res.status(404).send({ success: 0, message: " table not found" })
        else res.status(200).send({ success: 1, tableFound })
    } catch (error) { 
        res.status(500).send({ success: 0, error })
    }
})


tableRouter.delete('/:tableId', async (req, res) => {
    try {
        let tableFound = await TableModel.findByIdAndRemove(req.params.tableId)
        if (!tableFound) res.status(404).send({ success: 0, message: " table not found" })
        else res.status(200).send({ success: 1, tableFound })
    } catch (error) {
        res.status(500).send({ success: 0, error })
    }
})

tableRouter.put('/tablenumber/:tableNumber', async (req, res) => {
    try {
        const { status, tableNumber, chairNumber, owner } = req.body
        const updateInfo = { status, tableNumber, chairNumber, owner }
        let tableFound = await TableModel.findOne({tableNumber:`${req.params.tableNumber}`})
        if (!tableFound) res.status(404).send({ success: 0, message: " table not found" })
        else {
            for (let key in updateInfo) {
                if (updateInfo[key]) {
                    tableFound[key] = updateInfo[key]
                }
            }
            let dataSaved = await tableFound.save();
            res.status(200).send({ success: 1, dataSaved })
        }
    } catch (error) {
        res.status(500).send({ success: 0, error })
    }
})

tableRouter.put('/:tableId', async (req, res) => {
    try {
        const { status, tableNumber, chairNumber, owner } = req.body
        const updateInfo = { status, tableNumber, chairNumber, owner }
        let tableFound = await TableModel.findById(req.params.tableId)
        if (!tableFound) res.status(404).send({ success: 0, message: " table not found" })
        else {
            for (let key in updateInfo) {
                if (updateInfo[key]) {
                    tableFound[key] = updateInfo[key]
                }
            }
            let dataSaved = await tableFound.save();
            res.status(200).send({ success: 1, dataSaved })
        }
    } catch (error) {
        res.status(500).send({ success: 0, error })
    }
})

module.exports = tableRouter;