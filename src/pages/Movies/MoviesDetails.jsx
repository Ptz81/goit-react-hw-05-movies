// import { useEffect, useState, Suspense } from "react";
// import { Link, useLocation, useNavigate, useParams, Routes, Route } from "react-router-dom";
// import { getMovieDetails } from '../../Service/Api';

// import Cast from '../../components/Cast/Cast';
// import Reviews from '../../components/Reviews/Reviews';
// import css from '../../components/App.module.css';
// import spareIMG from '../../components/img/spareIMG.png';

// const IMAGEERR = 'https://image.tmdb.org/t/p/w500/';

// const MoviesDetails = () => {
//   const [film, setFilm] = useState(null);
//   const { movieId } = useParams();
//   const movies = JSON.parse(localStorage.getItem('movie'));
//   const movie = movies && movies.find(elem => elem.id === movieId);
//   const locationDetails = useLocation();
//   const navigate = useNavigate();
//   const handleClick = () => {
//     navigate(locationDetails?.state?.from || '/');
//   };

//   useEffect(() => {
//     const fetchFilmData = async () => {
//       try {
//         const movieData = await getMovieDetails(movieId);
//         setFilm(movieData);
//       } catch (e) {
//         console.log(e);
//       }
//     };
//     fetchFilmData();
//   }, [movieId]);

//   const { genres, title, overview, vote_average, poster_path } = movie || {};

//   const image = poster_path ? IMAGEERR + poster_path : spareIMG;
//   const userScore = Math.round((Number(vote_average) * 100) / 10);
//   const movieGenres = genres && genres.map(genre => genre.name).join('');

//   return (
//     <>
//       {film && (
//         <>
//           <button className="btn btn-success m2" onClick={handleClick}>
//             {locationDetails?.state?.label || 'Go Back'}
//           </button>
//           <div className={css.box}>
//             <img src={image} alt={title} />

//             <div className={css.description}>
//               <h2>{title}</h2>
//               <p>User Score: {userScore}%</p>
//               <h3>Overview</h3>
//               <p>{overview}</p>
//               <h4>Genres</h4>
//               <p>{movieGenres}</p>
//             </div>
//           </div>

//           <div className={css.additional}>
//             <h5>Additional information</h5>
//             <ul>
//               <li>
//                 <Link
//                   to={`/movies/${movieId}/cast`}
//                   state={{
//                     from: locationDetails.state?.from || '/',
//                     label: locationDetails.state?.label,
//                   }}
//                 >
//                   Cast
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   to={`/movies/${movieId}/reviews`}
//                   state={{
//                     from: locationDetails.state?.from || '/',
//                     label: locationDetails.state?.label,
//                   }}
//                 >
//                   Reviews
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           <Suspense fallback={<p>Loading...</p>}>
//             <Routes>
//               <Route path="/movies/:movieId/cast" element={<Cast />} />
//               <Route path="/movies/:movieId/reviews" element={<Reviews />} />
//             </Routes>
//           </Suspense>
//         </>
//       )}
//     </>
//   );
// };

// export default MoviesDetails;


import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams, Routes, Route } from "react-router-dom";
import { getMovieDetails } from '../../Service/Api';

import Cast from '../../components/Cast/Cast';
import Reviews from '../../components/Reviews/Reviews';
import css from '../../components/App.module.css';
import spareIMG from '../../components/img/spareIMG.png';

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500/';

const MoviesDetails = () => {
  const [film, setFilm] = useState(null);
  const { movieId } = useParams();
  const locationDetails = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(locationDetails?.state?.from || '/');
  };

  useEffect(() => {
    const fetchFilmData = async () => {
      try {
        const movieData = await getMovieDetails(movieId);
        setFilm(movieData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFilmData();
  }, [movieId]);

  if (!film) {
    return <p>Loading...</p>;
  }

  const { title, overview, vote_average, poster_path, genres } = film;

  const image = poster_path ? IMAGE_URL + poster_path : spareIMG;
  const userScore = Math.round((Number(vote_average) * 100) / 10);
  const movieGenres = genres && genres.map(genre => genre.name).join(', ');

  return (
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
          <Routes>
            <Route path="/movies/:movieId/cast" element={<Cast />} />
            <Route path="/movies/:movieId/reviews" element={<Reviews />} />
          </Routes>
          <Link to={`/movies/${movieId}/cast`}>Cast</Link>
          <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
        </div>
      </div>
    </>
  );
};

export default MoviesDetails;
