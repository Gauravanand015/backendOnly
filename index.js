const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./Router/userRouter");
const { productRouter } = require("./Router/products.route");
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.json());
app.use(cookieParser())
require("dotenv").config();


app.use("/user",userRouter)

app.use("/productsShow",productRouter)


app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("Connected to DataBase")
    } catch (error) {
        console.log("error while connecting to db",error)        
    }
    console.log("Connected To the Server")
})