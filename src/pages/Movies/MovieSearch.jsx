import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { searchMovie } from '../../Service/Api';

const MovieSearch = ({ search }) => {  const [movies, setMovies] = useState(null);
  const location = useLocation();
  useEffect(() => {
    async function getSearchData() {
      try {
        if (!search) {
          return;
        }
        const data = await searchMovie(search);
        setMovies(data);
      } catch (e) {
        console.error(e);
      }
    }
    getSearchData();
  }, [search]);
  return (
    <ul>
      {movies &&
        movies.map(movie => (
          <li key={movie.id}>
            <Link
              to={`${movie.id}`}
              state={{ from: location, label: 'Go to Search' }}
            >
              {movie.title}
            </Link>
          </li>
        ))}
    </ul>
  );
};
export default MovieSearch;
