import {createContext, ReactNode, useEffect, useState} from "react";
import {useJwt} from "react-jwt";

type ContextTypes = {
    logged: boolean;
    setLogged: (_value: React.SetStateAction<boolean>) => void;
}
export const VideoContext = createContext<ContextTypes>({
    logged: false,
    setLogged: (_value: React.SetStateAction<boolean>)=> {}
});

interface VideoContextProviderProps {
    children: ReactNode
}

const VideoContextProvider = ({children}: VideoContextProviderProps) => {

    const [logged, setLogged] = useState<boolean>( false);
    const {isExpired} = useJwt(localStorage.getItem("token") || "");

    useEffect(() => {
            fetch("https://thebetter.bsgroup.eu/Authorization/SignIn", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: logged ? JSON.stringify({
                        "Username": process.env.REACT_APP_LOGIN,
                        "Password": process.env.REACT_APP_PASSWORD,
                        "Device": {
                            "PlatformCode": "WEB",
                            "Name": "7a6a86e5-356f-4795-8998-305e1b205531"
                        }
                    }
                ) : JSON.stringify({
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
                    console.log(res)
                })
                .catch(err => console.error(err))
    }, [isExpired, logged])
    console.log(localStorage.getItem("token"))

    return (
        <VideoContext.Provider value={{
            logged,
            setLogged
        }}>
            {children}
        </VideoContext.Provider>
    )
}
export default VideoContextProvider;