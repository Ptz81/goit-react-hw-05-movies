import React, { useEffect, useState, lazy, Suspense } from "react";
import { Link, Route, Routes, useLocation, useParams, useSearchParams } from 'react-router-dom';
import MoviesForm from '../Movies/MovieForm';
import MoviesDetails from './MoviesDetails';

import { instance } from '../../Service/Api';
import css from '../../components/App.module.css';

const Cast = lazy(() => import('../../components/Cast/Cast'));
const Reviews = lazy(() => import('../../components/Reviews/Reviews'));

const Movies = () => {
  const [filmList, setFilmList] = useState(null);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const movieName = searchParams.get('query');
  const { movieId } = useParams();

  const getRequestedMovie = async (search, movieId) => {
    const routeWay = search
      ? `/search/movie?query=${search}`
      : `/movie/${movieId}`;

    try {
      const response = await instance.get(routeWay);
      const data = response.data;
      return data;
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    if (movieId) {
      getRequestedMovie(null, movieId).then(setFilmList);
    }
  }, [movieId]);

  return (
    <>
      {filmList && (
        <>
          <MoviesDetails movieId={movieId} />
          <MoviesForm
            formSubmit={search => setSearchParams({ search })}
            search={movieName}
          />
          <div className={css.box}>
            <img src={`${instance.IMG}/${filmList.poster_path}`} alt={filmList.title} />

            <div className={css.section_description}>
              <h2>{filmList.title}</h2>
              <p>User Score: {filmList.vote_average * 10}%</p>
              <h3>Overview</h3>
              <p>{filmList.overview}</p>
              <h4>Genres</h4>
              <p>{filmList.genres.map(genre => genre.name + ' ')}</p>
            </div>
          </div>
          <div className={css.additional}>
            <h5>Additional information</h5>
            <ul>
              <li>
                <Link
                  to={`/movies/${movieId}/cast`}
                  state={{
                    from: location.state.from,
                    label: location.state.label,
                  }}
                >
                  Cast
                </Link>
              </li>

              <li>
                <Link
                  to={`/movies/${movieId}/reviews`}
                  state={{
                    from: location.state.from,
                    label: location.state.label,
                  }}
                >
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          <Suspense fallback={<p>Loading ...</p>}>
            <Routes>
              <Route path="/movies/:movieId/cast" element={<Cast />} />
              <Route path="/movies/:movieId/reviews" element={<Reviews />} />
            </Routes>
          </Suspense>
        </>
      )}
    </>
  );
}

export default Movies;
