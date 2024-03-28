import { emptyOrRows } from "../helper.js";
import { query } from "./DB.js";
import { json } from "express";


async function notVaccinated() {
    console.log("ana2")
    const result = await query(
        `select count(memberId) as count
            from member
            where member.memberIdentifyNo not in(select memberId from vaccinated);`);
    
    return result;
}

export{notVaccinated}