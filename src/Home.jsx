import './App.css';
import {useEffect} from "react";
import {Link} from "react-router-dom"

const Home =()=> {

    useEffect(() => {
        fetch("https://thebetter.bsgroup.eu/Authorization/SignIn", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                    "Device": {
                        "PlatformCode": "WEB",
                        "Name": "7a6a86e5-356f-4795-8998-305e1b205531"
                    }
                }
            )
        })
            .then(res => res.json())
            .then((res)=>{
                localStorage.setItem("token", res.AuthorizationToken.Token);
            })
            .catch(err => console.error(err))
    }, [])
    console.log(localStorage.getItem("token"))
    return (
        <div className="App">
                <div><Link to="/movies">Lista Filmow</Link></div>
                <Link to="/player">Player</Link>
        </div>
    );
}

export default Home;
