import {useState} from "react"

export default function Analysis(){
    const [notVaccinated, setNotVaccinated] = useState(null)
    const [err, setErr] = useState(false)

    const showNotVaccination= event=>{
        event.preventDefault();
        fetch('http://localhost:3000/analysis/notVaccinated')
        .then(res=>res.json())
        .then(data=>{
            setNotVaccinated(data[0].count);
        })
        .catch(err=>setErr(true))
    }

    return(<>
        <button onClick={event=>showNotVaccination(event)}>not vaccinated yet</button>
        {notVaccinated!=null && <p><b>Not vaccinated:</b> {notVaccinated}</p>}
        {err && <p>error try again later</p>}
    </>)
}