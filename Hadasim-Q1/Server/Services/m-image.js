import { query } from './DB.js';
import {getOffset, emptyOrRows} from '../helper.js';
import config from '../config.js'
import{ __dirname} from "../helper.js"
import path from "path";
import fs from "fs";


const photoDirectory = path.join(__dirname, 'uploads');

async function getMultiple(){
    const offset = getOffset(page, config.listPerPage);
    const rows = await query(`SELECT memberPhoto FROM member LIMIT ${offset},${config.listPerPage}`);
    const data = emptyOrRows(rows);
    return data;
  }
  
async function getById(id, res){
    const rows = await query(`SELECT memberPhoto FROM member WHERE memberId=?`,id);
    const data = emptyOrRows(rows);
    const dir = path.join(photoDirectory, data[0].memberPhoto);
    
    fs.readFile(dir, (err, data) => {
      if (err) {
        console.error('Error reading image:', err);
        res.status(500).send('Error reading image');
      } else {
        // Determine the content type based on the file extension
        // const contentType = 'image/jpeg'; // Change this according to your image type
        // // Set the appropriate content type header
        // res.setHeader('Content-Type', data.type);
        // // Send the file data as the response
        // res.send(data);
        return data;
      }
    });
  }

  async function create(id, image){
    console.log("add photo function hi");
    const result = await query(`update member
    set memberPhoto = '${image}'
    where memberIdentifyNo = ?`, id);
    let message = 'Error in adding photo';
    if (result.affectedRows) {
      return { message: 'File uploaded successfully' }
    }
    return {message};
  }

  async function update(id, image){
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