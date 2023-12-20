const express = require("express");
const bodyParser = require('body-parser');
// const path = require("path");
// const multer = require("multer");
// const session = require("express-session");
// const crypto = require("crypto");
const cors = require("cors");
require("dotenv").config();

const app=express();



//Routes

const userRoutes = require("./routes/UserRoutes");

app.use(bodyParser.json());
app.use(cors());
app.use("/odiben/api/user",userRoutes);


app.listen(process.env.LISTENING_PORT,()=>{console.log("Odiben API Layer is live at http://localhost:"+`${process.env.LISTENING_PORT}`)});