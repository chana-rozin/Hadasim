import {  create,getMultiple, getById, remove, update } from '../Services/m-Vaccination.js';
import express, { json } from "express";
import { new_vaccination, update_vaccination } from '../Services/validation-middleware.js';

const vaccinationsRoute = express.Router()

vaccinationsRoute.get('/', async function (req, res, next) {
    try {
        res.json(await getMultiple(req.memberId, req.query.page));
    } catch (err) {
        console.error(`Error while getting vaccinations `, err.message);
        next(err);
    }
});

vaccinationsRoute.get('/:vaccId', async function (req, res, next) {
    try {
        res.json(await getById(req.memberId, req.params.vaccId));
    } catch (err) {
        console.error(`Error while searching vaccination `, err.message);
        next(err);
    }
});

vaccinationsRoute.post('/',new_vaccination, async function (req, res, next) {
    try {
        res.json(await create(req.body));
    } catch (err) {
        console.error(`Error while creating vaccination`, err.message);
        next(err);
    }
});

vaccinationsRoute.put('/:vaccinationId',update_vaccination, async function (req, res, next) {
    try {
        res.json(await update(req.params.vaccinationId, req.body));
    } catch (err) {
        console.error(`Error while updating vaccination`, err.message);
        next(err);
    }
});


vaccinationsRoute.delete('/:vaccinationId', async function (req, res, next) {
    try {
        res.json(await remove(req.params.vaccinationId));
    } catch (err) {
        console.error(`Error while deleting vaccination`, err.message);
        next(err);
    }
});

export  {vaccinationsRoute};