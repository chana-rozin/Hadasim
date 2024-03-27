import Validator from "validatorjs";
import { query } from "./Services/DB.js";
import { json } from "express";

function getOffset(currentPage = 1, listPerPage) {
    return (currentPage - 1) * [listPerPage];
}

function emptyOrRows(rows) {
    if (!rows) {
        return [];
    }
    return rows;
}

const validator = async (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};

Validator.register('israeliPhone', value=>{
    const regex = /^(?:0(?:(?:\d{1,2}(?:-?\d{7})?)|(?:5\d(?:-?\d{7})?))|(?:\d{1,2}-?\d{7}))$/;
    return value.match(regex)? true: false;
    
},{message:'Not valid Israeli phone'})

Validator.register('nullOrRegex', (value, regex) => {
    if (value === null) {
        return true; // Allow null
    }
    return value.match(regex)? true: false;
}, {
    message: 'The mobile number must be null or 05X-XXXXXXX/05XXXXXXXX.'
});

Validator.register('israeliID', value => isValidIsraeliID(value), 'Not valid Israeli ID');

// Validator.registerAsync('uniqueInTable', async (value, options, attribute, passes) => {
//     // Split the string by comma
//     const parts = options.split(',');

//     // Assign the values to variables
//     const table = parts[0].trim();
//     const column = parts[1].trim();
//     const result = await query(`SELECT COUNT(*) AS count FROM ${table} WHERE ${column} = ?`, value);
//     // Extract count from the result
//     //const count = rows[0].count;
//     console.log(result[0].count);
//     // If count is 0, the value is unique; otherwise, it's not
//     if( result[0].count === 0)
//         passes()
//     else
//         passes(false, 'The :attribute already exists in the database table.')
// });

Validator.registerAsync('existsInTable', async (value, options, attribute, passes) => {
     // Split the string by comma
     const parts = options.split(',');

     // Assign the values to variables
     const table = parts[0].trim();
     const column = parts[1].trim();
    // Perform query to check if value exists in the referenced table
    const result = await query(`SELECT COUNT(*) AS count FROM ${table} WHERE ${column} = ?`, value);

    if(result[0].count>0)
        passes();
    else
        passes(false, 'The :attribute does not exist in the referenced table.')
});

Validator.registerAsync('maxInstance', async (value, options, attribute, passes) => {
    // Split the string by comma
    const parts = options.split(',');
    console.log("intance check")
    // Assign the values to variables
    const table = parts[0].trim();
    const column = parts[1].trim();
    const max = parts[2].trim()
   // Perform query to check if value exists in the referenced table
   const result = await query(`SELECT COUNT(*) AS count FROM ${table} WHERE ${column} = ?`, value);
   if(result[0].count<=max)
       passes();
   else
       passes(false, 'The are max number of instance of this :attribute value in referenced table.')
});

Validator.register('datetime', value => {
    // Check if value is a valid datetime
    // Example: You might use a library like Luxon or Moment.js for more sophisticated datetime validation
    return !isNaN(Date.parse(value));
}, {
    message: 'The :attribute must be a valid datetime.'
});

Validator.register('nullOrDatetime', value => {
    if (value === null) {
        return true; // Allow null
    }
    // Check if value is a valid datetime
    return !isNaN(Date.parse(value));
}, {
    message: 'The :attribute must be a valid datetime.'
});

Validator.register('image', value => {
    if (typeof value !== 'string') {
        return false; // Value must be a string (file path or URL)
    }

    // List of common image file extensions
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];

    // Extract file extension from the value
    const extension = value.split('.').pop().toLowerCase();

    // Check if the file extension is in the list of image extensions
    return imageExtensions.includes(extension);
}, {
    message: 'The :attribute must be a valid image file.'
});

function isValidIsraeliID(id) {
    var id = String(id).trim();
    if (id.length > 9 || id.length < 5 || isNaN(id)) return false;

    // Pad string with zeros up to 9 digits
    id = id.length < 9 ? ("00000000" + id).slice(-9) : id;

    return Array
        .from(id, Number)
        .reduce((counter, digit, i) => {
            const step = digit * ((i % 2) + 1);
            return counter + (step > 9 ? step - 9 : step);
        }) % 10 === 0;
}

export {
    getOffset,
    emptyOrRows,
    validator
}