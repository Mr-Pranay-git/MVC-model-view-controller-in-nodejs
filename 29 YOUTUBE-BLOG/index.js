const path = require("path");
const express = require('express');
const mongoose = require('mongoose')
const cookiePaser = require('cookie-parser')

const userRoute = require('./routes/user');
const { checkForAuthenticationCookie } = require("./middlewares/authentication");

const app = express();
const PORT = 8000;
mongoose.connect('mongodb://localhost:27017/blogify').then(e => console.log("MongoBD Connected"))

app.set('view engine', 'ejs');
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended: false}));
app.use(cookiePaser());
app.use(checkForAuthenticationCookie("token"))

app.get('/', (req,res)=>{
    res.render('home', {
        user:req.user,
    });
});
app.use("/user", userRoute);

app.listen(PORT, () => console.log(`server Started at PORT: ${PORT}`))