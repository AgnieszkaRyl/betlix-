import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import MoviesScreen from "./MoviesScreen.tsx";
import Home from "./Home";
import MoviePlayer from "./MoviePlayer.tsx";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/movies" element={<MoviesScreen/>}/>
          <Route path="/player" element={<MoviePlayer/>}/>
      </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
