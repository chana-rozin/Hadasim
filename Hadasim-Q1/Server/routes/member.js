import {getMultiple, create, getById, remove, update} from '../Services/member.js';
import {vaccinationsRoute} from './m-Vaccinations.js'
import {covidRoute} from './m-Covid.js'
import imageRoute from "./m-image.js"
import express, { json } from "express";
import { new_member,update_member } from '../Services/validation-middleware.js';


const memberRoute=express.Router()

memberRoute.use('/:id/vaccinations',(req, res, next) => {
    const memberId = req.params.id;
    req.memberId = memberId;
    next();
}, vaccinationsRoute);

memberRoute.use('/:id/covid',(req, res, next) => {
    const memberId = req.params.id;
    req.memberId = memberId;
    next();
}, covidRoute);

memberRoute.use('/:id/image',(req, res, next) => {
    const memberId = req.params.id;
    req.memberId = memberId;
    next();
}, imageRoute );

memberRoute.get('/', async function(req, res, next) {
    try {
      res.json(await getMultiple(req.params.id));
    } catch (err) {
      console.error(`Error while searching member `, err.message);
      next(err);
    }
  });

  memberRoute.get('/:id', async function(req, res, next) {
    try {
      res.json(await getById(req.params.id));
    } catch (err) {
      console.error(`Error while searching member `, err.message);
      next(err);
    }
  });

  memberRoute.post('/',new_member, async function(req, res, next) {
    try {
      res.json(await create(req.body));
    } catch (err) {
      console.error(`Error while creating member`, err.message);
      next(err);
    }
  });

  memberRoute.put('/:id',update_member, async function(req, res, next) {
    try {
      res.json(await update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating member`, err.message);
      next(err);
    }
  });
  

  memberRoute.delete('/:id', async function(req, res, next) {
    try {
      res.json(await remove(req.params.id));
    } catch (err) {
      console.error(`Error while deleting member`, err.message);
      next(err);
    }
  });

export default memberRoute;