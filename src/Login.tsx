import {SyntheticEvent, useState} from "react";
import { useNavigate } from 'react-router-dom';
import set = Reflect.set;

const Login = () => {
    const [errorMessages, setErrorMessages] = useState<boolean>(false);
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate=useNavigate();

    // const renderErrorMessage = (name) =>
    //     name === errorMessages.name && (
    //         <div className="error">{errorMessages.message}</div>
    //     );

    const handleSubmit = (event: SyntheticEvent) => {
        // Prevent page reload
        event.preventDefault();
        if (login === process.env.REACT_APP_LOGIN && password === process.env.REACT_APP_PASSWORD){
            navigate("/movies")
        } else {
            setErrorMessages(true);
        }
    };
    return (
        <div>
            login
            {process.env.REACT_APP_LOGIN}
            {process.env.REACT_APP_PASSWORD}
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text"
                           name="uname"
                           placeholder="login" required
                           onChange={(e) => {
                               setErrorMessages(false);
                               setLogin(e.target.value)
                           }}/>
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password"
                           name="pass"
                           placeholder="password" required
                           onChange={(e) => {
                               setErrorMessages(false);
                               setPassword(e.target.value);
                           }}/>
                </div>
                {errorMessages && <p>Błąd w nazwie lub haśle użytkownika</p>}
                <div className="button-container">
                    <input type="submit"/>
                </div>
            </form>
        </div>
    )
}
export default Login;