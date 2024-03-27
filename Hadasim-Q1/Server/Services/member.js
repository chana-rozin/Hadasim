import { query } from './DB.js';
import {getOffset, emptyOrRows} from '../helper.js';
import config from '../config.js'


async function getById(id){
  const rows = await query(`SELECT * FROM member WHERE memberIdentifyNo=?`,id);
  const data = emptyOrRows(rows);
  return data;
}

async function getMultiple(page = 1){
  const offset = getOffset(page, config.listPerPage);
  const rows = await query(` SELECT * FROM member LIMIT ${offset},${config.listPerPage}`);
  const data = emptyOrRows(rows);
  return data;
}

async function create(mem){
  console.log(`(${mem.id}, '${mem.first_name}', '${mem.last_name}', '${mem.city}', '${mem.street}',${mem.house_no},'${mem.birth_date}',${mem.telephone},${mem.celphone})`);
  const result = await query(
    `INSERT INTO member
    VALUES 
    (null,${mem.id}, '${mem.first_name}', '${mem.last_name}', '${mem.city}', '${mem.street}',${mem.house_no},'${mem.birth_date}','${mem.telephone}','${mem.cellphone}',null)`
  );
  // let message = 'Error in creating member';
  if (result.affectedRows) {
    //message = 'member created successfully';
    return result.insertId;
  }
    throw "Error in creating member"
  //return {message};
}


async function update(id, mem){
  console.log(id);
  const result = await query(
    `UPDATE member 
    SET memberFirstName="${mem.first_name}", memberLastName="${mem.last_name}" , memberCity="${mem.city}",
    memberStreet="${mem.street}", memberHouseNo=${mem.house_no}, 
   memberBirthDate="${mem.birth_date}", memberTel="${mem.telephone}",memberCell ="${mem.cellphone}"
    WHERE memberIdentifyNo=?` 
  , id);

  let message = 'Error in updating member';

  if (result.affectedRows) {
    message = 'member updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await query(
    `DELETE FROM member WHERE memberIdentifyNo=${id}`
  );

  let message = 'Error in deleting member';

  if (result.affectedRows) {
    message = 'member deleted successfully';
  }

  return {message};
}

export 
 { getById, getMultiple, create, update, remove}
