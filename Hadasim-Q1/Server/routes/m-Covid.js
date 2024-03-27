import {  create, getById, remove, update } from '../Services/m-Covid.js';
import express, { json } from "express";
import { new_covid_carrier, update_covid_carrier } from '../Services/validation-middleware.js';


const covidRoute = express.Router()

covidRoute.get('/', async function (req, res, next) {
    try {
        res.json(await getById(req.memberId));
    } catch (err) {
        console.error(`Error while getting vaccination `, err.message);
        next(err);
    }
});

covidRoute.post('/',new_covid_carrier, async function (req, res, next) {
    try {
        res.json(await create(req.body));
    } catch (err) {
        console.error(`Error while creating covid history`, err.message);
        next(err);
    }
});

covidRoute.put('/',update_covid_carrier, async function (req, res, next) {
    try {
        res.json(await update(req.memberId, req.body));
    } catch (err) {
        console.error(`Error while updating covid history`, err.message);
        next(err);
    }
});


covidRoute.delete('/', async function (req, res, next) {
    try {
        res.json(await remove(req.memberId));
    } catch (err) {
        console.error(`Error while deleting covid history`, err.message);
        next(err);
    }
});

export  {covidRoute};