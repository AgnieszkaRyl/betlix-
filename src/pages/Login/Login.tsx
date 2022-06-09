import {SyntheticEvent, useContext, useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import {VideoContext} from "../../context/ContextProvider";
import {Button, Card, CardContent, TextField} from "@mui/material";
import styles from "./Login.module.scss"
import {isExpired} from "react-jwt";

const Login = () => {
    const [errorMessages, setErrorMessages] = useState<boolean>(false);
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();
    const {loginAnnonymous, loginWithPassword, logged} = useContext(VideoContext);

    useEffect(() => {
        if (logged) {
            navigate("/movies")
        }
    }, []);


    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        if (login === process.env.REACT_APP_LOGIN && password === process.env.REACT_APP_PASSWORD) {
            loginWithPassword();
            navigate("/movies")
        } else {
            setErrorMessages(true);
        }
    };

    console.log(localStorage.getItem("token"));

    const continueAnonymous = () => {
        loginAnnonymous();
        navigate("/movies");
    }

    return (
        <div className={styles.loginContainer}>
            <Card sx={{minWidth: 275, maxWidth: 330}}>
                <CardContent>
                    <h2>Logowanie</h2>
                    <p>{process.env.REACT_APP_LOGIN} </p>
                    <p>{process.env.REACT_APP_PASSWORD}</p>
                    <form onSubmit={handleSubmit}>
                        <div className="input-container">
                            <TextField label="e-mail"
                                       variant="filled"
                                       onChange={(e) => {
                                           setErrorMessages(false);
                                           setLogin(e.target.value);
                                       }}
                                       className={styles.loginField}
                            />
                        </div>
                        <div className="input-container">
                            <TextField label="Password"
                                       variant="filled"
                                       onChange={(e) => {
                                           setErrorMessages(false);
                                           setPassword(e.target.value);
                                       }}
                                       className={styles.loginField}
                            />
                        </div>
                        {errorMessages && <p>Błąd w nazwie lub haśle użytkownika</p>}
                        <div className="button-container">
                            <Button variant="contained" type="submit" className={styles.loginField}>Prześlij</Button>
                        </div>
                    </form>
                    <div>
                        <Button variant="contained"
                                onClick={() => continueAnonymous()} type="submit" className={styles.loginField}>Kontynuuj
                            jako gość</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
export default Login;