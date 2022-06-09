import {useContext, useEffect, useRef, useState} from "react";
import {Card} from "@mui/material";
import popcorn from "../../assets/popcorn.png"
import {Link} from "react-router-dom";
import {VideoContext} from "../../context/ContextProvider";
import Spinner from "../../components/Spinner/Spinner";
import styles from "./Movies.module.scss";
import {useWindowSize} from "../../hooks/useWindowSize";
import arrowRight from "./../../assets/arrowRight.svg"
import arrowLeft from "./../../assets/arrowLeft.svg"
import classNames from "classnames";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import {Navigation} from "swiper";

export interface Image {
    Id: number;
    MediaId: number;
    PlatformCode: string;
    ImageTypeCode: string;
    Url: string;
    Width: number;
    Height: number;
}

export interface Product {
    Id: number;
}

export interface Entity {
    Id: number;
    Guid: string;
    MediaTypeCode: string;
    MediaTypeDisplayName: string;
    MediaAgeRestrictionValueMin: number;
    MediaAgeRestrictionImageUrl: string;
    Title: string;
    Description: string;
    Year: number;
    Duration: number;
    IsTrialContentAvailable: boolean;
    AvailableFrom: Date;
    Images: Image[];
    Products: Product[];
    StartDateTime?: Date;
}

export interface RootObject {
    CacheDataValidTo: Date;
    SourceType: string;
    Entities: Entity[];
    PageSize: number;
    PageNumber: number;
    TotalCount: number;
}

const MoviesList = () => {
    const [movies, setMovies] = useState<Entity[]>();
    const {logged} = useContext(VideoContext);


    console.log("logged", logged)
    useEffect(() => {
        fetch("https://thebetter.bsgroup.eu/Media/GetMediaList", {
            method: "POST",
            headers: {"Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}`},
            body: JSON.stringify({
                    "MediaListId": 3,
                    "IncludeCategories": false,
                    "IncludeImages": true,
                    "IncludeMedia": false,
                    "PageNumber": 1,
                    "PageSize": 15
                }
            )
        })
            .then(res => res.json())
            .then(res => setMovies(res.Entities))
            .catch(err => console.error(err))
    }, [])

    const getImageTypedFrame = (images: Image[]): string => {
        const imageFrame = images.find(image => image.ImageTypeCode === "FRAME")
        if (imageFrame === undefined) {
            return popcorn
        }
        return imageFrame.Url;
    }
    if (!movies) {
        return <Spinner/>
    }
    // console.log(movies)
    // console.log("logged", logged)


    return (
        <div className="container">Tutaj bedzie lista filmow
            <Swiper
                spaceBetween={10}
                slidesPerView={4}
                navigation
                modules={[Navigation]}
            >
                {movies.map((el) =>
                    <SwiperSlide>
                        <Link to={"/player/" + el.Id} key={el.Id} className={classNames(styles.linkJeden, styles.link)}>
                            <Card variant="outlined" className={styles.movieContainer}>
                                {el.Title}
                                <img src={getImageTypedFrame(el.Images)} style={{width: "120px", height: "80px"}}/>
                            </Card>
                        </Link>
                    </SwiperSlide>
                )}
            </Swiper>
        </div>
    );
}

export default MoviesList;