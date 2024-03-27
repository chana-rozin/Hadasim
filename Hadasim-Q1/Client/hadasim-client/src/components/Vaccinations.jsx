import { useParams, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";


export default function Vaccinations(){
    const {id} = useParams();
    const [loaded, setLoeaded] = useState(false);
    const [vaccinations, setVaccinations] = useState([]);
    const [err, setErr] = useState(false)

    useEffect(()=>{
        fetch(`http://localhost:3000/members/${id}/vaccinations`)
        .then(res=>{
            if(res.status==200)
                return res.json()
            else
                throw "Error in loaded data"})
        .then(data=>{
            console.log(data);
            setVaccinations(data);})
            .then(()=>setLoeaded(true))
            .catch(err=>{
                console.error(err);
                setErr(true);
            })
        },[]);

        
    return(<>
        {loaded ? <div>
            {vaccinations.count?vaccinations.map(vacc=><div>{vacc.vaccinId}    {vacc.vaccinatedDate}</div>)
            :<p>No vaccinations yet</p>}
        </div>
        :<p>loading...</p>}
        {err && <p>Error, try again later</p>}
    </>)
}