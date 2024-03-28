import { useEffect, useState } from "react";
import { Link, Navigate, Outlet, json, useParams } from "react-router-dom"
import { useForm } from 'react-hook-form';
import { useFormik } from "formik";
import * as Yup from "yup";
import {reactDateConvert, sqlDateConvert,memberValidateSchema } from "../helper.js";
import Covid from "./Covid.jsx";
import Vaccinations from "./Vaccinations.jsx";

export default function MemberRegister() {
  const { id } = useParams();
  const [imageLoaded, setImageLoeaded] = useState(false);
  const [image, setImage] = useState();
  const [err, setErr] = useState(false)

  

  async function submitHandler(values){
    values.memberBirthDate = sqlDateConvert(values.memberBirthDate);
      const res = await fetch(`http://localhost:3000/members`,{
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-type': 'application/json'
        }
      });
      if(res.ok){
        alert("Succssfully create");
        formik.setValues(formik.initialValues);
      }
      else{
        alert(`Failed create`);
      }
  }


  const formik = useFormik({
     initialValues: {memberIdentifyNo: 0,
        memberFirstName:"",
        memberLastName: "",
        memberCity: "",
        memberStreet:"",
        memberHouseNo: 0,
        memberBirthDate: "0000-00-00",
        memberTel: "",
        memberCell: null
    },
    // enableReinitialize: true,
    validationSchema: memberValidateSchema,
    onSubmit: submitHandler,
  });

  // const imageHandler=(event)=>{
  //     const file = event.target.files[0];
  //     const fromData = new FormData()
  //     fromData.append('image', file);
  //     fetch(`http://localhost:3000/members/${member.id}/photo`,{method: 'POST', body: fromData})
  //     .then(res=>res.json())
  //     .then(res=>setUploadtatus(res.msg))
  //     .catch(err=>console.error(err));
  // }

  
  return (
    <>
      {err ? <p>Error, try again later</p>

      :<div>NEW MEMBER
        {image && <img src={image} alt="img" />}
        <form onSubmit={formik.handleSubmit}>
          <input
            label="ID"
            name="memberIdentifyNo"
            onChange={formik.handleChange}
            value={formik.values.memberIdentifyNo}
            type={"number"}
          />
          <p>{formik.errors.memberIdentifyNo ? formik.errors.memberIdentifyNo : ""}</p>
          <input
            label="First Name"
            name="memberFirstName"
            onChange={formik.handleChange}
            value={formik.values.memberFirstName}
            type={"text"}
          />
          <p>{formik.errors.memberFirstName ? formik.errors.memberFirstName : ""}</p>
          <input
            label="Last Name"
            type={"text"}
            name="memberLastName"
            onChange={formik.handleChange}
            value={formik.values.memberLastName}
          />
          <p>{formik.errors.memberLastName ? formik.errors.memberLastName : ""}</p>
          <input
            label="memberCity"
            type={"text"}
            name="memberCity"
            onChange={formik.handleChange}
            value={formik.values.memberCity}
          />
          <p>{formik.errors.memberCity ? formik.errors.memberCity : ""}</p>
          <input
            label="Street"
            type={"text"}
            name="memberStreet"
            onChange={formik.handleChange}
            value={formik.values.memberStreet}
          />
          <p>{formik.errors.memberStreet ? formik.errors.memberStreet : ""}</p>
          <input
            label="House number"
            type={"number"}
            name="memberHouseNo"
            onChange={formik.handleChange}
            value={formik.values.memberHouseNo}
          />
          <p>{formik.errors.memberHouseNo ? formik.errors.memberHouseNo : ""}</p>
          <input
            label="Birthdate"
            type={"date"}
            name="memberBirthDate"
            onChange={formik.handleChange}
            value={formik.values.memberBirthDate}
          />
          <p>{formik.errors.memberBirthDate ? formik.errors.memberBirthDate : ""}</p>
          <input
            label="Telephone"
            type={"text"}
            name="memberTel"
            onChange={formik.handleChange}
            value={formik.values.memberTel}
          />
          <p>{formik.errors.memberTel ? formik.errors.memberTel : ""}</p>
          <input
            label="Mobile phone"
            type={"text"}
            name="memberCell"
            onChange={formik.handleChange}
            value={formik.values.memberCell}
          />
          <p>{formik.errors.memberCell ? formik.errors.memberCell : ""}</p>
          <button type={"submit"}>SAVE</button>
        </form>
      </div>}
      {/* <input type="file" name="image" accept="image/*" multiple={false} onChange={imageHandler} /> */}
  </>)
}

