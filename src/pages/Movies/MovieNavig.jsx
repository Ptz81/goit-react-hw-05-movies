// import { useState } from "react"
import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { getRequestedMovie } from '../../Service/Api';

import spareIMG from '../../components/img/spareIMG.png'
const IMAGEERR = 'https://image.tmdb.org/t/p/w500/';

const MoviesDetails = () => {
  const [isLoad, setIsLoad] = useState(false);
  const [film, setFilm] = useState('');
  const { movieId } = useParams();
  const movies = JSON.parse(localStorage.getItem('movie'));
  const movie = movies && movies.find(elem => elem.id === movieId);
  const locationDetails = useLocation();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(locationDetails.state.from);
  };
   useEffect(() => {
    const fetchFilmData = async () => {
      setIsLoad(true);
      try {
        const movieData = await getRequestedMovie(movieId);
        setFilm(movieData);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoad(false);
      }
    };
    fetchFilmData();
  }, [movieId]);

   const { genres, title, release_date, overview, vote_average, poster_path } =
    movie;
  const image = poster_path ? IMAGEERR + poster_path : spareIMG;
  const userScore = Math.round((Number(vote_average) * 100) / 10);
  const movieGenres = genres.map(genre => genre.name).join(' ');
  const releaseDate = release_date.slice(0, 4);

  return (
    <>
        {movie && (
        <>
          <button className="btn btn-success m2" onClick={handleClick}>
            {location?.state?.label ?? 'Go Back'}
          </button>
          <div className={css.box}>
            <img src={`${image}}`} alt={title} />

            <div className={css.description}>
              <h2>{title}</h2>
              <p>User Score: {vote_average * 10}%</p>
              <h3>Overview</h3>
              <p>{overview}</p>
              <h4>Genres</h4>
              <p>{genres.map(genre => genre.name + ' ')}</p>
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

          <Suspense fallback={<Loading timeout={3000} />}>
            <Routes>
              <Route path="/cast" element={<Cast />} />
              <Route path="/reviews" element={<Reviews />} />
            </Routes>
          </Suspense>
        </>
      )}
    </>
  );
};
export default MoviesDetails;
