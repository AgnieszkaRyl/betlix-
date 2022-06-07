import './App.css';
import {Link} from "react-router-dom"

const Home =()=> {

    return (
        <div className="App">
                <div><Link to="/movies">Lista Filmow</Link></div>
                <Link to="/player">Player</Link>
        </div>
    );
}

export default Home;
