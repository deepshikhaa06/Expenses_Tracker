const express = require('express');
const app = express()
const cors=require("cors")
const PORT=process.env.PORT||8080;
const mongoose=require('mongoose')
const userRouter = require('./routes/userRouter');
const errorHandler =require('./middlewares/errorHandler.Middlerware');
const categoryRouter = require('./routes/category.Router');
const transactionRouter = require('./routes/transaction.Router');

//!CONNECT to the MONGODB
mongoose.connect('mongodb://localhost:27017/expenses-tracker')
.then(()=>console.log("Connected to MongoDB"))
.catch(err=>console.error("Could not connect to MongoDB", err))

//!CORS CONFIG
const corsOptions = {
   origin: ["http://localhost:5173"], // without trailing slash
//    origin:"*",
    optionsSuccessStatus: 200 // for legacy browser support
  };
  
app.use(cors(corsOptions));
//!MIDDLEWARE
app.use(express.json()); //Pass incoming JSON to express

//!ROUTES
app.use("/",userRouter);
app.use("/",categoryRouter);
app.use("/",transactionRouter)

app.use(errorHandler)

//!START THE SERVER
app.listen(PORT, function(){console.log(`Server is listening on ${PORT}`)})

