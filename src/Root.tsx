import { BrowserRouter, Route, Routes } from "react-router-dom";
import MoviesScreen from "./pages/Movies/Movies";
import Player from "./pages/Player/Player";
import Login from "./pages/Login/Login";
import ContextProvider, { useAuth } from "./context/AuthContextProvider";
import Navbar from "./components/Navbar/Navbar";

const Root = () => {
  //zobaczyc czy mozna tutaj przekierowanie zrobic
  const { isLoggedAnyUser } = useAuth();

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {isLoggedAnyUser && <Route path="/movies" element={<MoviesScreen />} />}
        {isLoggedAnyUser && <Route path="/player/:id" element={<Player />} />}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Root;
