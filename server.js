const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session1 = require("express-session");
const cors = require("cors")
const apiRouter = require('./routers/apiRouter')
const morgan = require("morgan")
let app = express();


app.use(function(req, res, next) {
    var allowedOrigins = ['http://thefoodhouse.herokuapp.com', 'http://thefoodhouse.herokuappp.com'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
         res.setHeader('Access-Control-Allow-Origin', origin);
    }
    //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
  });
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "http://thefoodhouse.herokuapp.com");
//     res.header("Access-Control-Allow-Headers", "*");
//     res.header("Access-Control-Allow-Credentials", "*");
//     if (req.method === "OPTIONS") {
//       res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
//       return res.status(200).json();
//     }
//     next();
//   });
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(morgan('dev'))

app.use(session1({
    secret: "bimat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 }
}))

// mongoose.connect("mongodb://localhost/QLNH", (err) => {
//     if (err) console.error(err)
//     else console.log("DB connect success!")
// })

mongoose.connect("mongodb://balo11044:nblong1997@ds145072.mlab.com:45072/quanlynhahang",(err)=>{
  if (err) console.error(err)
  else console.log("DB connect success!")
})

app.use((req, res, next) => {
    console.log(req.session);
    next();
})

app.use('/api', apiRouter)

app.use(express.static('./build'));

app.get("/", (req, res) => {
    res.sendFile('./build/index.html')
})

const PORT = process.env.PORT ||5050
app.listen(PORT, (err) => {
    if (err) console.log(err)
    else console.log(`Sever running at ${PORT}`)
})