const express = require('express')
const apiRouter = express.Router();

const userRouter = require('./accountRouter')
const menuRouter = require('./menuRouter')
const tableRouter = require('./tableRouter')
const authRouter = require('./authRouter')

apiRouter.use('/menu/', menuRouter)
apiRouter.use('/users', userRouter)
apiRouter.use('/tables',  tableRouter)
apiRouter.use('/auth', authRouter)

apiRouter.use('/', (req, res, next) => {
    console.log(' api middleware')
    next()
})

apiRouter.get('/test', (req, res) => {
    console.log("test okk")
})

module.exports = apiRouter;