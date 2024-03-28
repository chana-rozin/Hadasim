import {getMultiple, create, getById, remove, update} from '../Services/m-image.js';
import express, { json } from "express";
import multer from "multer";
import path from "path";

const imageRoute=express.Router()

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      let destination = `./uploads`;
      cb(null, destination);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

  
  
  const upload = multer({ storage: storage });

  imageRoute.post("/", upload.single("image"), function (req, res, next) {
    try {
      res.json(create(req.memberId,req.body.ImageName));
    } catch (err) {
      console.error(`Error`, err.message);
      next(err);
    }
  }
  );

imageRoute.get('/',async (req, res, next)=>{
    try {
        res.json(await getById(req.memberId, res))
      } catch (err) {
        console.error(`Error while searching photo `, err.message);
        next(err);
      }
})

export default imageRoute;