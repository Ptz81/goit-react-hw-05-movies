import React, { Suspense, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, Route, useParams, Routes } from "react-router-dom";
import { getRequestedMovie } from '../../Service/Api';
import Loading from '../../components/Loading/Loading'

import Cast from '../../components/Cast/Cast';
import Reviews from '../../components/Reviews/Reviews';
import css from '../../components/App.module.css';
import spareIMG from '../../components/img/spareIMG.png';

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500/';

const MoviesDetails = () => {
//стан компоненту
  const [film, setFilm] = useState([]);
  //доступ до рядка та його властивостей
  const locationDetails = useLocation();
  //доступ до ід у рядку
  const { movieId } = useParams();
  //навігація по сайту
  const navigate = useNavigate();

  //виконання ефекту при зміні залежності movieId
  useEffect(() => {
    //Ця функція виконує запит на фільми, отримує дані
    //та встановлює їх в стан компонента за допомогою функції setFilm.
    const fetchFilmData = async () => {
      try {
        const movieData = await getRequestedMovie(null, movieId);
        setFilm(movieData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFilmData();
    //залежність ефекту від зміни значення movieId
  }, [movieId]);

//перевіряє наявність деяких властивостей в locationDetails та виконує навігацію на відповідний шлях.
  const handleClick = () => {
    navigate(locationDetails?.state?.from?.pathname ? `${locationDetails.state?.from?.pathname}${locationDetails.state?.from?.search}`
        : '/',);
  };

  const { title, overview, vote_average, poster_path, genres } = film;

  const image = poster_path ? `${IMAGE_URL}/${film.poster_path}` : spareIMG;
  const userScore = Math.round((Number(vote_average) * 100) / 10);
  const movieGenres = genres && genres.map(genre => genre.name).join(' ');

  return (
    <>
      {film && (
        <>
            <button className="btn btn-success m-2" onClick={handleClick}>
        {locationDetails?.state?.label || 'Go Back'}
      </button>
      <div className={css.box}>
        <img src={image} alt={title} />

        <div className={css.description}>
          <h2>{title}</h2>
          <p>User Score: {userScore}%</p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h4>Genres</h4>
              <p>{movieGenres}</p>


          <div className={css.addInfo}>
            <h5>Additional information</h5>
            <ul className={css.link}>
              <li>
                    <Link
                      to={`cast`}
                  state={{
                    from: locationDetails.state.from,
                    label: locationDetails.state.label,
                  }}
                  className={css.link_title}
                >
                  Cast
                </Link>
              </li>

              <li>
                <Link
                      to={`reviews`}
                  state={{
                    from: locationDetails.state.from,
                    label: locationDetails.state.label,
                  }}
                  className={css.link_title}
                >
                  Reviews
                </Link>
              </li>
            </ul>
          </div>
        </div>
          </div>

        <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/cast" element={<Cast/>} />
              <Route path="/reviews" element={<Reviews/>} />
            </Routes>
          </Suspense>
        </>
      )}
    </>
  );
};

export default MoviesDetails;
