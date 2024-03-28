import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { reactDateConvert } from "../helper.js";


export default function Covid() {
    const { id } = useParams();
    const [loaded, setLoeaded] = useState(false);
    const [covid, setCovid] = useState({});
    const [err, setErr] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:3000/members/${id}/covid`)
            .then(res => {
                if (res.status == 200)
                    return res.json()
                else
                    throw "Error in loaded data"
            })
            .then(data => {
                console.log(data);

                setCovid(data[0]);
            })
            .then(() => setLoeaded(true))
            .catch(err => {
                setErr(true);
            })
    }, []);

    return (<>
        {loaded ? <div >
            {covid ? <p><b>receiving date:</b> {reactDateConvert(covid.covidReceivingDate)}    <b>recovery date:</b> {reactDateConvert(covid.covidRecoveryDate)}
            </p> : <p>There no covid information</p>}
        </div>
            : <p>loading...</p>}
        {err && <p>Error, try again later</p>}
    </>)
}