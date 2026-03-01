const express= require('express');
const authRouter= require('./models/routes/auth.routes');

const app= express();
app.use(express.json());

//routes
app.use("/api/auth",authRouter);


module.exports= app;