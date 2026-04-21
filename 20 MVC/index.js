const express = require('express');
const { connectMongoDb } = require('./connection')

const {logReqRes} = require('./middlewares')
const userRouter = require("./routes/user")

const app = express();
const PORT = 3000;

// Connection
connectMongoDb('mongodb://127.0.0.1:27017/youtube-app-1').then(()=> console.log("Mongodb connected!"))

// Middleware - Plugin 
// app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));


app.use((req, res, next) => {
    console.log("Hello from middleware")
    next()
});

//Routes
app.use('/api/user', userRouter);

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`))
