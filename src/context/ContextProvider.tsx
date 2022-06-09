import {createContext, ReactNode, useEffect, useState} from "react";
import {isExpired, useJwt} from "react-jwt";
import {json} from "stream/consumers";

type ContextTypes = {
    logged: boolean;
    loginAnnonymous: () => void;
    loginWithPassword: () => void;
}
export const VideoContext = createContext<ContextTypes>({
    logged: false,
    loginAnnonymous: () => {},
    loginWithPassword: () => {}
});

interface VideoContextProviderProps {
    children: ReactNode
}

const VideoContextProvider = ({children}: VideoContextProviderProps) => {

    const [logged, setLogged] = useState<boolean>(() => {
        const loggedData = localStorage.getItem("isLogged");
        if (loggedData) {
            return JSON.parse(loggedData)
        }
        return false
    });
    const {isExpired} = useJwt(localStorage.getItem("token") || "");

    const loginAnnonymous = () => {
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
            .then((res) => {
                localStorage.setItem("token", res.AuthorizationToken.Token);
                localStorage.setItem("isLogged", JSON.stringify(false));
                setLogged(false);
                console.log(res)
            })
            .catch(err => console.error(err))
    }

    const loginWithPassword = () => {
        fetch("https://thebetter.bsgroup.eu/Authorization/SignIn", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                    "Username": process.env.REACT_APP_LOGIN,
                    "Password": process.env.REACT_APP_PASSWORD,
                    "Device": {
                        "PlatformCode": "WEB",
                        "Name": "7a6a86e5-356f-4795-8998-305e1b205531"
                    }
                }
            )
        })
            .then(res => res.json())
            .then((res) => {
                localStorage.setItem("token", res.AuthorizationToken.Token);
                localStorage.setItem("isLogged", JSON.stringify(true));
                setLogged(true);
                console.log(res)
            })
            .catch(err => console.error(err))
    }

    useEffect(()=>{
        if (isExpired){
            logged ? loginWithPassword() : loginAnnonymous()
        }
    },[isExpired])

    console.log(localStorage.getItem("token"))

    return (
        <VideoContext.Provider value={{
            logged,
            loginWithPassword,
            loginAnnonymous
        }}>
            {children}
        </VideoContext.Provider>
    )
}
export default VideoContextProvider;