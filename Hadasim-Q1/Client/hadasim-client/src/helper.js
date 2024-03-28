import * as Yup from "yup";


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

const memberValidateSchema = Yup.object().shape({
    memberIdentifyNo: Yup.number().required("ID is required").test("isValidIsraeliID", "Invalid Israeli ID", (value) =>
      isValidIsraeliID(value) || "Invalid Israeli ID"),
    memberFirstName: Yup.string().required("First name is required").max(45, "First name contain at most 45 characters"),
    memberLastName: Yup.string().required("Last name is required").max(45, "Last name contain at most 45 characters"),
    memberCity: Yup.string().required("City is required").max(45, "City name contain at most 45 characters"),
    memberStreet: Yup.string().required("Street is required").max(45, "Street name contain at most 45 characters"),
    memberHouseNo: Yup.number().required("House number is required").min(1, "Invalid house number").max(10000, "Invalid house number"),
    memberBirthDate: Yup.date().required("Date of birth is required"),
    memberTel: Yup.string().matches(/^(?:0(?:(?:\d{1,2}(?:-?\d{7})?)|(?:5\d(?:-?\d{7})?))|(?:\d{1,2}-?\d{7}))$/, "Invalid Israeli telephone number"),
    memberCell: Yup.string().nonNullable(),
  })

const reactDateConvert = sqlDate => new Date(sqlDate).toJSON().slice(0,10);

const sqlDateConvert=reactDate => new Date(reactDate).toISOString().slice(0,10);

const reactDateTimeConvert = sqlDate => new Date(sqlDate).toJSON().slice(0,19).replace('T', ' ');

const sqlDateTimeConvert=reactDate => new Date(reactDate).toISOString().slice(0,19).replace('T', ' ');

export {isValidIsraeliID,memberValidateSchema, reactDateConvert, sqlDateConvert,reactDateTimeConvert,sqlDateTimeConvert }