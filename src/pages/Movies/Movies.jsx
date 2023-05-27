import React, { useEffect, useState, lazy, Suspense } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import MoviesForm from '../Movies/MovieForm';
import MoviesDetails from './MovieNavig';

import { instance } from '../../Service/Api';
import css from '../../components/App.module.css';

const Cast = lazy(() => import('../../components/Cast/Cast'));
const Reviews = lazy(() => import('../../components/Reviews/Reviews'));

const Movies = () => {
  const [filmList, setFilmList] = useState('');
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const movieName = searchParams.get('query');
  const { movieId } = useParams();

  // useEffect(() => {
  //   getRequestedMovie(null, movieId).then(setFilmList);
  // }, [movieId]);

  return (
    <>
      {filmList && (
        <>
          <MoviesDetails />
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
        </>
      )}
    </>
  );
}

export default Movies;
