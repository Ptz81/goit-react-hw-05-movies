import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from 'react';
import css from './App.module.css';
import Loading from "./Loading/Loading";
import Header from "./Header/Header";

const Home = lazy(() => import('../pages/Home/Home.jsx'));
const Movies = lazy(() => import('../pages/Movies/Movie.jsx'));
const MovieDetails = lazy(() => import('../pages/Movies/MoviesDetails'));

export const App = () => {
  return (
    <div className={css.container}>
      <Header/>
      <Suspense fallback={<Loading timeout={2000}/>}>
        <Routes>
          <Route path="/*" element={<Home/>} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId/*" element={<MovieDetails />}/>
        </Routes>
        </Suspense>
      </div>
  );
};
