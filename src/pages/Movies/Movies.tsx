import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner/Spinner";
import styles from "./Movies.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { Entity } from "../../api/apiInterfaces";
import { fetchMovies } from "../../api/apiFunctions";
import { MovieTile } from "../../components/MovieTile/MovieTile";

const MoviesList = () => {
  const [movies, setMovies] = useState<Entity[]>();
  const [moviesSecondList, setMoviesSecondList] = useState<Entity[]>();
  const [moviesThirdList, setMoviesThirdList] = useState<Entity[]>();

  useEffect(() => {
    fetchMovies(3)
      .then((res) => setMovies(res.Entities))
      .catch((err) => console.error(err));
    fetchMovies(6)
      .then((res) => setMoviesSecondList(res.Entities))
      .catch((err) => console.log(err));
    fetchMovies(13)
      .then((res) => setMoviesThirdList(res.Entities))
      .catch((err) => console.log(err));
  }, []);

  if (!movies || !moviesSecondList || !moviesThirdList) {
    return <Spinner />;
  }

  const allMoviesList = [
    { list: movies, title: "Na lepszy dzień", id: 0 },
    { list: moviesSecondList, title: "Chwila rozrywki", id: 1 },
    { list: moviesThirdList, title: "Światowe sensacje", id: 2 },
  ];

  return (
    <div className="container">
      {allMoviesList.map((moviesList) => (
        <div key={moviesList.id}>
          <p className={styles.listTitle}>{moviesList.title}</p>
          <Swiper
            spaceBetween={30}
            slidesPerView={3}
            navigation
            modules={[Navigation]}
          >
            {moviesList.list.map((movie: Entity) => (
              <SwiperSlide>
                <MovieTile movie={movie} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ))}
    </div>
  );
};

export default MoviesList;
