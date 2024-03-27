import { useEffect, useState } from "react";
import { Link, Navigate, Outlet, json, useParams } from "react-router-dom"
import { useForm } from 'react-hook-form';
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Member() {
  const { id } = useParams();
  const [inEdit, setInEdit] = useState(false);
  const [loaded, setLoeaded] = useState(false);
  const [imageLoaded, setImageLoeaded] = useState(false);
  const [member, setMember] = useState({});
  const [uploadStatus, setUploadtatus] = useState("");
  const [image, setImage] = useState();
  const [err, setErr] = useState(false)

  const validateSchema = Yup.object().shape({
    memberIdentifyNo: Yup.number().required("ID is required").test("isValidIsraeliID", "Invalid Israeli ID", (value) =>
      isValidIsraeliID(value) || "Invalid Israeli ID"),
    memberFirstName: Yup.string().required("First name is required").max(45, "First name contain at most 45 characters"),
    memberLastName: Yup.string().required("Last name is required").max(45, "Last name contain at most 45 characters"),
    memberCity: Yup.string().required("City is required").max(45, "City name contain at most 45 characters"),
    memberStreet: Yup.string().required("Street is required").max(45, "Street name contain at most 45 characters"),
    memberHouseNo: Yup.number().required("House number is required").min(1, "Invalid house number").max(10000, "Invalid house number"),
    //memberBirthDate: Yup.date().required("Date of birth is required"),
    memberTel: Yup.string().matches(/^(?:0(?:(?:\d{1,2}(?:-?\d{7})?)|(?:5\d(?:-?\d{7})?))|(?:\d{1,2}-?\d{7}))$/, "Invalid Israeli telephone number"),
    memberCell: Yup.string().matches(/^05\d([-]?)\d{7}$/, "Invalid Israeli mobile number"),
  })

  async function submitHandler(values){
    //values.memberBirthDate = sqlDateConvert(values.memberBirthDate);
      const result = await fetch(`http://localhost:3000/members/${id}`,{
        method: 'PUT',
        body: values
      });
      if(result.ok){
        console.log(result);
        alert("Succssfully update");
        loadData();
      }
      else{
        alert(`Failed update: ${result.error}`);
      }
  }

  const formik = useFormik({
    initialValues: {},
    enableReinitialize: true,
    validationSchema: validateSchema,
    onSubmit: submitHandler,
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

  // const imageHandler=(event)=>{
  //     const file = event.target.files[0];
  //     const fromData = new FormData()
  //     fromData.append('image', file);
  //     console.log(file);
  //     fetch(`http://localhost:3000/members/${member.id}/photo`,{method: 'POST', body: fromData})
  //     .then(res=>res.json())
  //     .then(res=>setUploadtatus(res.msg))
  //     .catch(err=>console.error(err));
  // }

  function loadData(){
    fetch(`http://localhost:3000/members/${id}`)
    .then(res => {
      if (res.status == 200)
        return res.json()
      else
        throw "Error in loaded data"
    })
    .then(data => {
      console.log(data[0]);
      setMember(data[0]);
      formik.setValues(data[0]);
      setLoeaded(true)
    })
  .catch(err => {
    console.error(err);
    setErr(true);
  })
  }

  useEffect(() => {
    loadData();
  }, []);

  function reactDateConvert(sqlDate){
    const dateParts = sqlDate.split('-');
    
    const date =  new Date(dateParts[2].substr(0,2), dateParts[1] - 1, dateParts[0]);
    console.log(date);
    return date;
  }

  function sqlDateConvert(reactDate){
    const dateParts = reactDate.split('/');
    
    const date=//convert to sql date;
    console.log(date);
    return date;
  }
  
  //console.log(formik.values);
  return (
    <>

      {loaded ? <div>
        {/* {imageLoaded ? <img src={image}/> : <p>loadded</p>} */}
        <Link to="vaccinations">vaccinations</Link>
        <Link to="covid">covid</Link>
        {member.memberIdentifyNo}   {member.memberFirstName}    {member.memberLastName}     {member.memberBirthDate}
        {member.memberCity}   {member.memberStreet}    {member.memberHouseNo}     {member.memberTel}
        {member.memberCell != undefined && <p>{member.memberCell}</p>}
        <Outlet />
      </div>
        : <p>loading...</p>}

      {err && <p>Error, try again later</p>}

      {loaded ? <div>
        {image && <img src={image} alt="img" />}
        <Link to="vaccinations">vaccinations</Link>
        <Link to="covid">covid</Link>
        <button onClick={event => setInEdit(true)}>edit</button>
        <form onSubmit={formik.handleSubmit}>
          <input
            disabled={true}
            label="ID"
            name="memberIdentifyNo"
            onChange={formik.handleChange}
            value={formik.values.memberIdentifyNo}
            type={"number"}
          />
          <p>{formik.errors.memberIdentifyNo ? formik.errors.memberIdentifyNo : ""}</p>
          <input
            disabled={!inEdit}
            label="First Name"
            name="firstName"
            onChange={formik.handleChange}
            value={formik.values.memberFirstName}
            type={"text"}
          />
          <p>{formik.errors.memberFirstName ? formik.errors.memberFirstName : ""}</p>
          <input
            disabled={!inEdit}
            label="Last Name"
            type={"text"}
            name="memberLastName"
            onChange={formik.handleChange}
            value={formik.values.memberLastName}
          />
          <p>{formik.errors.memberLastName ? formik.errors.memberLastName : ""}</p>
          <input
            disabled={!inEdit}
            label="memberCity"
            type={"text"}
            name="memberCity"
            onChange={formik.handleChange}
            value={formik.values.memberCity}
          />
          <p>{formik.errors.memberCity ? formik.errors.memberCity : ""}</p>
          <input
            disabled={!inEdit}
            label="Street"
            type={"text"}
            name="memberStreet"
            onChange={formik.handleChange}
            value={formik.values.memberStreet}
          />
          <p>{formik.errors.memberStreet ? formik.errors.memberStreet : ""}</p>
          <input
            disabled={!inEdit}
            label="House number"
            type={"number"}
            name="memberHouseNo"
            onChange={formik.handleChange}
            value={formik.values.memberHouseNo}
          />
          <p>{formik.errors.memberHouseNo ? formik.errors.memberHouseNo : ""}</p>
          {/* <input
            disabled={!inEdit}
            label="Birthdate"
            type={"date"}
            name="memberBirthDate"
            onChange={formik.handleChange}
            value={reactDateConvert(formik.values.memberBirthDate)}
          />
          <p>{formik.errors.memberBirthDate ? formik.errors.memberBirthDate : ""}</p> */}
          <input
            disabled={!inEdit}
            label="Telephone"
            type={"text"}
            name="memberTel"
            onChange={formik.handleChange}
            value={formik.values.memberTel}
          />
          <p>{formik.errors.memberTel ? formik.errors.memberTel : ""}</p>
          <input
            disabled={!inEdit}
            label="Mobile phone"
            type={"text"}
            name="memberCell"
            onChange={formik.handleChange}
            value={formik.values.memberCell}
          />
          <p>{formik.errors.memberCell ? formik.errors.memberCell : ""}</p>
          {inEdit && <button type={"submit"}>SAVE</button>}
        </form>
      </div> : <p>loading...</p>}
      {/* <input type="file" name="image" accept="image/*" multiple={false} onChange={imageHandler} /> */}

    </>)
}

