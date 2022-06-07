import {BrowserRouter, Route, Routes} from "react-router-dom";
import MoviesScreen from "./MoviesScreen";
import MoviePlayer from "./MoviePlayer";
import Login from "./Login";
import Home from "./Home";
import {useJwt} from "react-jwt";
import {useEffect, useState} from "react";

const Root =()=>{
    const {isExpired} = useJwt(localStorage.getItem("token") || "");

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
                console.log(res)
            })
            .catch(err => console.error(err))
    }, [isExpired])
    console.log(localStorage.getItem("token"))
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movies" element={<MoviesScreen/>}/>
                <Route path="/player/:id" element={<MoviePlayer/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </BrowserRouter>
        )

}
export default Root;