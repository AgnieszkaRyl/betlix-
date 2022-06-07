import ReactPlayer from 'react-player'
import {useEffect, useState} from "react";

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

    const [player, setPlayer] = useState<Movie>();
    useEffect(() => {
        fetch("https://thebetter.bsgroup.eu/Media/GetMediaPlayInfo", {
            method: "POST",
            headers: {"Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}`},
            body: JSON.stringify({
                "MediaId": 17,
                "StreamType": "TRIAL"
                }
            )
        })
            .then(res => res.json())
            .then(res=> setPlayer(res))
            .catch(err=>console.error(err))
    }, [])

    if (!player) {
        return <div>Loading</div>
    }
    console.log(player)
    console.log(player.ContentUrl)

    return (
        <div>
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
            tutaj zagra film

        </div>
    )
};
export default MoviePlayer;
