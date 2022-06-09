import ReactPlayer from 'react-player'
import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {VideoContext} from "../../context/ContextProvider";
import brokenComputer from "../../assets/computer.png";
import "./../../styles/global.scss";
import styles from "./Player.module.scss"
import {useWindowSize} from "../../hooks/useWindowSize";
import spinner from "./../../assets/spin.gif";
import Spinner from "../../components/Spinner/Spinner";

export interface Movie {
    MediaId: number;
    Title: string;
    Description: string;
    MediaTypeCode: string;
    MediaTypeDisplayName: string;
    StreamId: number;
    Provider: string;
    ContentUrl: string;
}

const Player = () => {
    const {id} = useParams();

    const {logged} = useContext(VideoContext);
    const [player, setPlayer] = useState<Movie>();
    const [foundMovie, setFoundMovie] = useState<boolean>(true);
    const {width} = useWindowSize();

    useEffect(() => {
        fetch("https://thebetter.bsgroup.eu/Media/GetMediaPlayInfo", {
            method: "POST",
            headers: {"Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}`},
            body: logged ? JSON.stringify({
                    "MediaId": Number(id),
                    "StreamType": "MAIN"
                }
            ) : JSON.stringify({
                "MediaId": Number(id),
                "StreamType": "TRIAL"
            })
        })
            .then(res => res.json())
            .then(res => {
                setPlayer(res);
            })
            .catch(err => {
                console.error(err);
                setFoundMovie(false);
            })
    }, [])

    if (!player) {
        return <Spinner/>
    }
    const isMobile = width<=767;

    console.log(player)
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
                                forceHLS: true
                            }
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
                    <p>Nie znaleziono tego filmu</p>
                    <img src={brokenComputer} className={styles.brokenImg}/>
                </div>)}
        </div>
    )
};
export default Player;
