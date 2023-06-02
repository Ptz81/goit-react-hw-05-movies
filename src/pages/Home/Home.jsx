import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getTrendMovies } from '../../Service/Api';
import css from './Home.module.css'

function Home () {
  const location = useLocation();
  // const [movies, setMovies] = useState([]);
    const [movies, setMovies] = useState(null);
  useEffect(() => {
    getTrendMovies().then(setMovies);
  }, []);
  return (
    <>
      <h1 className={css.home_title}>Trending of the week</h1>
      {/* {movies.length > 0 && ( */}
            {movies && (
        <ul className='list-group list-group-flush'>
          {movies.map(movie => (
            <li className='list-group-item' key={movie.id}>
              <Link
                className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                to={`movies/${movie.id}`} state={{from: location, label: 'Go to Home Page'}}
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
