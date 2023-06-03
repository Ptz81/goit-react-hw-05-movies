import { useSearchParams } from "react-router-dom";
import MovieForm from './MovieForm';
import Moviesearch from './MovieSearch';

const Movie = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search');

  const handleFormSubmit = (search) => {
    setSearchParams({ search });
  };
  return (
    <>
      <MovieForm formSubmit={handleFormSubmit} search={search} />
      <Moviesearch search={search} />
    </>
  );
}
export default Movie;

