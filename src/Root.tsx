import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import MoviesScreen from "./pages/Movies/Movies";
import Player from "./pages/Player/Player";
import Login from "./pages/Login/Login";
import ContextProvider from "./context/ContextProvider";
import Navbar from "./components/Navbar/Navbar";

const Root = () => {

    return (
        <ContextProvider>
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path="/movies" element={<MoviesScreen/>}/>
                    <Route path="/player/:id" element={<Player/>}/>
                    <Route path="/" element={<Login/>}/>
                </Routes>
            </BrowserRouter>
        </ContextProvider>
    )
}
export default Root;