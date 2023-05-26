import { useSearchParams } from "react-router-dom";



const Movies = () => {

    const [searchParams, setSearchParams] = useSearchParams();
  const movieName = searchParams.get('query');
  // return (

    // <div>
    //   <MoviesForm
    //     formSubmit={search => setSearchParams({ search })}
    //     search={search}
    //   />
    //   <MoviesSearchList search={search} />
    // </div>
  // )
}



export default Movies
