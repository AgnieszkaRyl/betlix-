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

    const containerRef = useRef<any>(null);
    const sliderRef = useRef<any>(null);
    const elementRef = useRef<any>(null);

    const rootRef = useRef<HTMLDivElement>(null);

    const {width} = useWindowSize();
    const [containerWidth, setContainerWidth] = useState(0);
    const [cardItemsSliderWidth, setCardItemsSliderWidth] = useState(0);
    const [cardItemsNumber, setCardItemsNumber] = useState(0);
    const [cardItemWidth, setCardItemWidth] = useState(0);
    const [sliderIndex, setSliderIndex] = useState(0);
    const [carouselOffset, setCarouselOffset] = useState(0);

    console.log("width", cardItemWidth)
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

    useEffect(() => {
        if (movies){
            const cardItemsContainerWidth = containerRef.current.offsetWidth;
            const cardItemsSliderWidth = sliderRef.current.offsetWidth;
            const cardItemsNumber = sliderRef.current.childNodes.length;
            const cardItemWidth = elementRef.current.offsetWidth;

            setContainerWidth(cardItemsContainerWidth);
            setCardItemsSliderWidth(cardItemsSliderWidth);
            setCardItemsNumber(cardItemsNumber);
            setCardItemWidth(cardItemWidth);
        }
    }, [width]);

    useEffect(() => {
        const carouselOffset = cardItemWidth * sliderIndex - cardItemsSliderWidth + containerWidth;
        console.log("carouselOffset", carouselOffset);
        setCarouselOffset(carouselOffset);
    }, [cardItemWidth, sliderIndex, cardItemsSliderWidth, containerWidth, width]);

    const handleSlideLeft = () => {
        if (sliderIndex === 0) return;
        setSliderIndex(sliderIndex - 1);
    };

    const handleSlideRight = () => {
        if (sliderIndex === cardItemsNumber) return;
        setSliderIndex(sliderIndex + 1);
    };
    const getImageTypedFrame = (images: Image[]): string => {
        const imageFrame = images.find(image => image.ImageTypeCode === "FRAME")
        if (imageFrame === undefined) {
            return popcorn
        }
        return imageFrame.Url;
    }
    if (!movies) {
        return <Spinner />
    }
    // console.log(movies)
    // console.log("logged", logged)


    return (
        <div className="container">Tutaj bedzie lista filmow
            <div className={styles.wrapper}>
                <div className={styles.innerTrack} ref={containerRef}>
                    <div className={styles.track} ref={sliderRef}
                         style={{
                             transform: `translateX(-${cardItemWidth * sliderIndex}px)`,
                         }}>
                        {movies.map((el) =>
                            <Link to={"/player/" + el.Id} key={el.Id} >
                                <Card variant="outlined" className={styles.movieContainer} ref={elementRef}>
                                    {el.Title}
                                    <img src={getImageTypedFrame(el.Images)} style={{width: "120px", height: "80px"}}/>
                                </Card>
                            </Link>
                        )}
                    </div>
                    <div className="house-teaser-card__nav">
                        {sliderIndex !== 0 && (
                            <button className={styles.button} onClick={() => handleSlideLeft()}>
                                <img src={arrowLeft}/>
                            </button>
                        )}

                        {sliderIndex !== cardItemsNumber && (
                            <button className={styles.button} onClick={() => handleSlideRight()}>
                                <img src={arrowRight}/>
                            </button>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default MoviesList;