import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function MembersList() {
    const [members, setMembers] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [err, setErr] = useState(false)

    useEffect(() => {
        fetchData();
    }, []);

    function fetchData() {
        fetch('http://localhost:3000/members')
            .then(res => {
                if (res.status == 200)
                    return res.json()
                else
                    throw "Error in loaded data"
            })
            .then(data => {
                setMembers(data);
                setLoaded(true)
            })
            .catch(err => {
                console.error(err);
                setErr(true);
            })
    }

    async function deletetMem(event, mem_id) {
        const confirmed = window.confirm('Deleting a friend causes the deletion of all information related to him in covid data,\n are you sure you want to delete?');
        if (confirmed) {
            fetch(`http://localhost:3000/members/${mem_id}`, {
                method: 'DELETE'
            })
                .then(res => {
                    if (res.ok) {
                        fetchData();
                        alert("Member deleted");
                    }
                    else
                        throw "failed"
                })
                .catch(err =>
                    alert("Delete failed"))
        }
    }

    return (
        <>
            <div>
                <Link to="register">NEW MEMBER</Link>
                {loaded ? members.map((mem) =>
                    <div className="record" key={mem.memberId}>
                        <Link  to={`${mem.memberIdentifyNo}`}>

                            <p>{mem.memberIdentifyNo}  {mem.memberFirstName} {mem.memberLastName}</p>

                        </Link>
                        <button onClick={(event => deletetMem(event, mem.memberIdentifyNo))}>DELETE</button>
                    </div>) : "loading..."}
            </div>
            <button></button>
            {err && <p>Error, try again later</p>}
        </>)
}

