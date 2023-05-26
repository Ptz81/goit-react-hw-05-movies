// import { useState } from "react"
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";

const MoviesDetails = () => {
  const { movieId } = useParams();
  const movies = JSON.parse(localStorage.getItem('movie'));
  const movie = movies && movies.find(elem => elem.id === movieId);
  const locationDetails = useLocation();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(locationDetails.state ? locationDetails.state : '/movies');
  };

  return movie ? (
    <>
      <button className="btn btn-success m2" onClick={handleClick}>Back</button>
      <h2>{movie.title}</h2>
    </>
  ) : (
    <>
      <Navigate to='/' />
      <h3>Error 404</h3>
    </>
  );
};

export default MoviesDetails;
