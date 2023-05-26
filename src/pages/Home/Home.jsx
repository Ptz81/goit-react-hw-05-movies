import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getTrendMovies } from '../../Service/Api';

function Home() {
  const location = useLocation();
  const [filmList, setFilmList] = useState([]);

  useEffect(() => {
    getTrendMovies().then(setFilmList);
  }, []);

  return (
    <div>
      <h1>Trending of the week</h1>
      {filmList.length > 0 && (
        <ul>
          {filmList.map(movie => (
            <li key={movie.id}>
              <Link
                to={{ pathname: `movies/${movie.id}`, state: { from: location, label: 'Go to Home' } }}
              >
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
