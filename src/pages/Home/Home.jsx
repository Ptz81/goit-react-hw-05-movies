import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getTrendMovies } from '../../Service/Api';

function Home () {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getTrendMovies('week').then(setMovies);
  }, []);
  return (
    <>
      <h1>Trending of the week</h1>
      {movies.length > 0 && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link
                to={`/movies/${movie.id}`} state={{from: location, label: 'Go to Home Page'}}
              >
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Home;
