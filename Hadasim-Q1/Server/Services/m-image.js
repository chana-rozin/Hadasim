import { query } from './DB.js';
import {getOffset, emptyOrRows} from '../helper.js';
import config from '../config.js'


async function getMultiple(){
    const offset = getOffset(page, config.listPerPage);
    const rows = await query(`SELECT memberPhoto FROM member LIMIT ${offset},${config.listPerPage}`);
    const data = emptyOrRows(rows);
    return data;
  }

async function getById(id){
    const rows = await query(`SELECT memberPhoto FROM member WHERE memberId=?`,id);
    const data = emptyOrRows(rows);
    return data;
  }

  async function create(id, image){
    console.log("add photo function hi");
    const result = await query(`update member
    set memberPhoto = ${image}
    where memberId = ?`, id);
    let message = 'Error in adding photo';
    if (result.affectedRows) {
      message = 'photo added successfully';
    }
    return {message};
  }

  async function update(id, image){
    console.log(id);
    const result = await query(
      `UPDATE member 
      SET memberPhoto = '${image}'"
      WHERE memberIdentifyNo=?` , id);
    
  let message = 'Error in updating image';

  if (result.affectedRows) {
    message = 'image updated successfully';
  }

  return {message};
  }

  async function remove(id){
    const result = await query(
        `UPDATE member 
        SET memberPhoto = null"
        WHERE memberIdentifyNo=?`, id)
  
    let message = 'Error in deleting image';
  
    if (result.affectedRows) {
      message = 'image deleted successfully';
    }
  
    return {message};
  }

export {getById, create, getMultiple, update, remove};