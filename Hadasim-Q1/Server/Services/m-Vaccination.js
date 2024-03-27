import { query } from './DB.js';
import {getOffset, emptyOrRows} from '../helper.js';
import config from '../config.js'

async function getById(memId,vaccinId){
  const rows = await query(
    `select m.memberId, m.vaccinatedDate, v.*
    from (select * from vaccinated where memberId = ? and vaccinId = ?) as m
    join vaccin v on v.vaccinId = m.vaccinId`,memId, vaccinId);
  
  const data = emptyOrRows(rows);
  
  return data;
}

async function getMultiple(id, page=1){
  const offset = getOffset(page, config.listPerPage);
  const rows = await query(
    `select m.memberId, m.vaccinatedDate, v.*
    from (select * from vaccinated where memberId = ? ) as m
    join vaccin v on v.vaccinId = m.vaccinId
    LIMIT ${offset},${config.listPerPage}`,id);
  
  let data = emptyOrRows(rows);
  return data;
}

async function create(vaccinated){
  const result = await query(
    `INSERT INTO vaccinated
    VALUES 
    (null,${vaccinated.memberId},${vaccinated.vaccinId},'${vaccinated.date}')`);
// let message = 'Error in creating member';
if (result.affectedRows) {
  //message = 'member created successfully';
  return result.insertId;
}
  throw "Error in creating vaccination"
//return {message};
}


async function update(vaccinationId, memId, vaccination){
  const result = await query(
    `UPDATE vaccinated 
    SET vaccinId=${vaccination.vaccinId}, 
    vaccinatedDate =${vaccination.date}
    WHERE vaccinationId=${vaccinationId} and memberId=${memId}` );

  let message = 'Error in updating vaccination';

  if (result.affectedRows) {
    message = 'vaccination updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await query(
    `DELETE FROM vaccinated WHERE vaccinationId=${id}`
  );

  let message = 'Error in deleting vaccination';

  if (result.affectedRows) {
    message = 'vaccination deleted successfully';
  }

  return {message};
}

export 
 {getById, getMultiple, create, update, remove}
