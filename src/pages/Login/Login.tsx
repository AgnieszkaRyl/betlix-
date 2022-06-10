import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContextProvider";
import { Button, Card, CardContent, TextField } from "@mui/material";
import styles from "./Login.module.scss";
import { Routes, tokenKey } from "../../constants/constants";

const Login = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessages, setErrorMessages] = useState<boolean>(false);

  const navigate = useNavigate();

  const { loginAnonymous, loginWithPassword, logged } = useAuth();

  useEffect(() => {
    if (logged) {
      navigate(Routes.movies);
    }
  }, []);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    loginWithPassword(login, password)
      .then(() => navigate(Routes.movies))
      .catch(() => setErrorMessages(true));
  };

  const continueAnonymous = () => {
    loginAnonymous().then(() => navigate(Routes.movies));
  };

  return (
    <div className={styles.loginContainer}>
      <Card sx={{ minWidth: 275, maxWidth: 330 }}>
        <CardContent>
          <h2>Logowanie</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                label="E-mail"
                variant="filled"
                onChange={(e) => {
                  setErrorMessages(false);
                  setLogin(e.target.value);
                }}
                className={styles.loginField}
              />
            </div>
            <div>
              <TextField
                label="Hasło"
                variant="filled"
                onChange={(e) => {
                  setErrorMessages(false);
                  setPassword(e.target.value);
                }}
                className={styles.loginField}
              />
            </div>
            {errorMessages && <p>Błąd w nazwie lub haśle użytkownika</p>}
            <div>
              <Button
                variant="contained"
                type="submit"
                className={styles.loginField}
              >
                Prześlij
              </Button>
            </div>
          </form>
          <div>
            <Button
              variant="outlined"
              onClick={() => continueAnonymous()}
              type="submit"
              className={styles.loginField}
            >
              Kontynuuj jako gość
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default Login;
