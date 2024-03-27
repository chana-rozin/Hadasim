import mysql from 'mysql2';
import express from "express";
import cors from "cors";
import multer from 'multer';
//import {router as memberRouter} from './routes/members.js';
import memberRoute from './routes/member.js';

const app = express();

const upload = multer();
app.use(upload.any());

app.use(express.json());

  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  app.use(cors());

  app.use(cors({
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  }))

  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.use('/members', memberRoute);

app.listen(3000, function () {
    console.log("Server is running on localhost3000");
});


