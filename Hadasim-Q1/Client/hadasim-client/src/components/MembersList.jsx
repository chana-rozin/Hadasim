import { replace } from "formik";
import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";

export default function MembersList(){
    const [members, setMembers] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [err, setErr] = useState(false)

    useEffect(()=>{
        fetch('http://localhost:3000/members')
        .then(res=>{
            if(res.status==200)
                return res.json()
            else
                throw "Error in loaded data"})
        .then(data=>{
            setMembers(data);
            console.log(data);
            setLoaded(true)})
        .catch(err=>{
            console.error(err);
            setErr(true);
        })
    },[]);

    return(
    <>
         <div>
            {loaded ? members.map((mem)=>
           <Link key={mem.memberId} to={`${mem.memberIdentifyNo}`}> 
           <div>
               {mem.memberIdentifyNo}  {mem.memberFirstName} {mem.memberLastName}
            </div>
            </Link>) : "loading..."}
         </div>
        {err && <p>Error, try again later</p>}
    </>)
}

