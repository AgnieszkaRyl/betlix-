import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import brokenComputer from "../../assets/computer.png";
import "./../../styles/global.scss";
import styles from "./Player.module.scss";
import { useWindowSize } from "../../hooks/useWindowSize";
import Spinner from "../../components/Spinner/Spinner";
import { Movie } from "../../api/apiInterfaces";
import { useAuth } from "../../context/AuthContextProvider";
import { fetchMovie } from "../../api/apiFunctions";

const Player = () => {
  const { id } = useParams();
  const { logged } = useAuth();
  const [player, setPlayer] = useState<Movie>();
  const [foundMovie, setFoundMovie] = useState<boolean>(true);
  const { width } = useWindowSize();
  const [notAuthorized, setNotAuthorized] = useState<boolean>(false);

  useEffect(() => {
    fetchMovie(logged, id!)
      .then((res) => {
        setPlayer(res);
        if (res.MessageKey === "FORBIDDEN") setNotAuthorized(true);
      })
      .catch((err) => {
        console.error(err);
        setFoundMovie(false);
      });
  }, []);

  if (!player) {
    return <Spinner />;
  }
  const isMobile = width <= 767;

  return (
    <div className="container">
      {player.ContentUrl && foundMovie ? (
        <div className={styles.movieContainer}>
          <ReactPlayer
            url={player.ContentUrl}
            controls
            config={{
              file: {
                forceDASH: true,
                forceHLS: true,
              },
            }}
            onError={(err) => {
              if (err.error.code === 25) {
                setFoundMovie(false);
              }
            }}
            width="100%"
            height={isMobile ? "260px" : "640px"}
          />
          <h2>{player.Title}</h2>
          <p>{player.Description}</p>
        </div>
      ) : (
        <div>
          {notAuthorized ? (
            <p>
              Ups! Chyba zapomniałeś przedłużyć subskrypcję, sprawdź opłaty na
              swoim koncie
            </p>
          ) : (
            <p>Nie znaleziono tego filmu</p>
          )}
          <img src={brokenComputer} className={styles.brokenImg} />
        </div>
      )}
    </div>
  );
};
export default Player;
