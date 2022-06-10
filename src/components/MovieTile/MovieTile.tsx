import styles from "./MovieTile.module.scss";
import { Link } from "react-router-dom";
import { Entity, Image } from "../../api/apiInterfaces";
import popcorn from "../../assets/popcorn.png";

interface MovieTileProps {
  movie: Entity;
}

export const MovieTile = ({ movie }: MovieTileProps) => {
  return (
    <Link to={"/player/" + movie.Id} key={movie.Id} className={styles.link}>
      <div className={styles.movieContainer}>
        <img src={getImageTypedFrame(movie.Images)} className={styles.image} />
        <p className={styles.title}>{movie.Title}</p>
      </div>
    </Link>
  );
};

const getImageTypedFrame = (images: Image[]): string => {
  const imageFrame = images.find((image) => image.ImageTypeCode === "FRAME");
  if (imageFrame === undefined) {
    return popcorn;
  }
  return imageFrame.Url;
};
