// import { useParams } from "react-router-dom";
// import MovieForm from './MovieForm';
// import Moviesearch from './MovieSearch';

// const Movie = () => {
//   // const [searchParams, setSearchParams] = useParams();
//   // const search = searchParams.get('search');
//   const { search } = useParams();


//   return (
//     <>
//       <Moviesearch formSubmit={search => setSearchParams({ search })} search={search} />
//       <MovieForm search={search}/>
//     </>

//   )
// }

// export default Movie;
import { useParams } from "react-router-dom";
import { useState } from "react";
import MovieForm from './MovieForm';
import Moviesearch from './MovieSearch';

const Movie = () => {
  const { search } = useParams();
  const [searchParams, setSearchParams] = useState(search);

  const handleFormSubmit = (value) => {
    setSearchParams(value);
  };
  
  return (
    <>
      <Moviesearch search={searchParams} />
      <MovieForm formSubmit={handleFormSubmit} />
            {/* <Moviesearch formSubmit={search => setSearchParams(search)} search={searchParams} />
      <MovieForm search={searchParams}/> */}
    </>

  )
}

export default Movie;
