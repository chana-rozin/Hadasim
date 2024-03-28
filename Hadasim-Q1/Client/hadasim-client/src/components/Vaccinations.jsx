import { useParams, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { reactDateTimeConvert } from "../helper.js";

export default function Vaccinations() {
    const { id } = useParams();
    const [loaded, setLoeaded] = useState(false);
    const [vaccinations, setVaccinations] = useState([]);
    const [err, setErr] = useState(false)
 

    useEffect(() => {
        fech_data()
    }, []);

    function fech_data() {
        fetch(`http://localhost:3000/members/${id}/vaccinations`)
            .then(res => {
                if (res.status == 200)
                    return res.json()
                else
                    throw "Error in loaded data"
            })
            .then(data => {
                console.log(data);
                setVaccinations(data);
                setLoeaded(true);
            })
            .catch(err => {
                console.error(err);
                setErr(true);
            })
    }

    return (<>
        {loaded ? <div >
            {vaccinations.length ? vaccinations.map((vacc, i) => <div key={`${i}`}>
                <b>vaccination date:</b> {reactDateTimeConvert(vacc.vaccinatedDate)}    <b> manufacturer:</b> {vacc.vaccinManufacturer}
                </div>)
                : <p>No vaccinations yet</p>}
        </div>
            : <p>loading...</p>}
        {err && <p>Error, try again later</p>}
    </>)
}