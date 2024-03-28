import express from "express";
import { notVaccinated } from "../Services/data-analysis.js";

const analyserRoute = express.Router();

analyserRoute.get("/notVaccinated", async (req, res, next)=>{
    try{
        
        res.json(await notVaccinated());
    }
    catch(err){
        res.status(500);
    }
})

export default analyserRoute;