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

async function getMemberVacc(id, page=1){
  const offset = getOffset(page, config.listPerPage);
  const rows = await query(
    `select * from vaccinated where memberId = ? 
    LIMIT ${offset},${config.listPerPage}`,id);
  
  let data = emptyOrRows(rows);
  return data;
}

async function getMemberCovid(id){
  const rows = await query(
    `select * from covid_carrier where memberId = ? `,id);
  
  let data = emptyOrRows(rows);
  return data;
}

async function create(mem){
  console.log(`(${mem.id}, '${mem.memberFirstName}', '${mem.memberLastName}', '${mem.memberCity}', '${mem.memberStreet}',${mem.memberHouseNo},'${mem.memberBirthDate}',${mem.memberTel},${mem.celphone})`);
  const result = await query(
    `INSERT INTO member
    VALUES 
    (null,${mem.id}, '${mem.memberFirstName}', '${mem.memberLastName}', '${mem.memberCity}', '${mem.memberStreet}',${mem.memberHouseNo},'${mem.memberBirthDate}','${mem.memberTel}','${mem.memberCell}',null)`
  );
  if (result.affectedRows) {
    return result.insertId;
  }
    throw "Error in creating member"
}


async function update(id, mem){
  console.log(id);
  const result = await query(
    `UPDATE member 
    SET memberFirstName="${mem.memberFirstName}", memberLastName="${mem.memberLastName}" , memberCity="${mem.memberCity}",
    memberStreet="${mem.memberStreet}", memberHouseNo=${mem.memberHouseNo}, 
   memberBirthDate="${mem.memberBirthDate}", memberTel="${mem.memberTel}",memberCell ="${mem.memberCell}"
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
 { getById, getMultiple, getMemberVacc,getMemberCovid, create, update, remove}
