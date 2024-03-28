import { query } from './DB.js';
import {getOffset, emptyOrRows} from '../helper.js';
import config from '../config.js'

async function getById(id){
  const rows = await query(
    `select * from covid_carrier where memberId = ?`,id);
  const data = emptyOrRows(rows);
  
  return data;
}

// async function getMultiple(page = 1){
//   const offset = getOffset(page, config.listPerPage);
//   const rows = await query(
//     `select * from covid_carrier
//     limit ${offset},${config.listPerPage}`
//   );
//   const data = emptyOrRows(rows);
  
//   return data;
// }

async function create(carrier){
  const result = await query(
    `INSERT INTO covid_carrier
    VALUES (${carrier.memberId},'${carrier.covidReceivingDate}', '${carrier.covidRrecoveryDate}')`);
  // let message = 'Error in creating member';
  if (result.affectedRows) {
    //message = 'member created successfully';
    return carrier.memberId;
  }
    throw "Error in creating covid carrier"
  //return {message};
}


async function update(id, carrier){
  const result = await query(
    `UPDATE covid_carrier 
    set covidReceivingDate = '${carrier.covidReceivingDate}', covidRecoveryDate = '${carrier.covidRrecoveryDate}'
    WHERE memberId=${id}` 
  );

  let message = 'Error in updating member';

  if (result.affectedRows) {
    message = 'member updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await query(
    `DELETE FROM covid_carrier WHERE memberId=${id}`
  );

  let message = 'Error in deleting member';

  if (result.affectedRows) {
    message = 'member deleted successfully';
  }

  return {message};
}

export 
 {getById, create, update, remove}
