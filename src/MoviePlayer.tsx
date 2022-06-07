import ReactPlayer from 'react-player'
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

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

const MoviePlayer = () => {
    const {id} = useParams();

    const [player, setPlayer] = useState<Movie>();
    useEffect(() => {
        fetch("https://thebetter.bsgroup.eu/Media/GetMediaPlayInfo", {
            method: "POST",
            headers: {"Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}`},
            body: JSON.stringify({
                    "MediaId": Number(id),
                    "StreamType": "TRIAL"
                }
            )
        })
            .then(res => res.json())
            .then(res => {
                setPlayer(res);
            })
            .catch(err => console.error(err))
    }, [])

    console.log("id", id)
    if (!player) {
        return <div>Loading</div>
    }
    console.log(player)
    console.log(player.ContentUrl)

    return (
        <div>
            {player.ContentUrl ? (
                <ReactPlayer
                    url={player.ContentUrl}
                    controls
                    config={{
                        file: {
                            forceDASH: true,
                            forceHLS: true
                        }
                    }}
                />
            ) : (
                <div>
                    Nie znaleziono tego filmu
                    <img src="./assets/computer.png"/>
                </div>)}
        </div>
    )
};
export default MoviePlayer;
