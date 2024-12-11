import express from 'express';
import mongoose from 'mongoose';
import router from './routes/user-routes.js';
import blogRouter from './routes/blog-routes.js';

const app = express();

//middleware
app.use(express.json());
app.use("/api/user", router);  
app.use("/api/blog", blogRouter);  

mongoose
  .connect('mongodb://localhost:27017/Aman')
  .then(() => app.listen(5000))
  .then(() => console.log("Connected to Database and listening on port 5000"))
  .catch((err) => console.log(err));
