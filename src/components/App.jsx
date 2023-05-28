import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from 'react';
import css from './App.module.css';
import Layout from './Layout/Layout';

const Home = lazy(() => import('../pages/Home/Home.jsx'));
const Movies = lazy(() => import('../pages/Movies/Movies'));
const MovieDetails = lazy(() => import('../pages/Movies/MoviesDetails'));
const Cast = lazy(() => import('./Cast/Cast'));
const Reviews = lazy(() => import('./Reviews/Reviews'));

export const App = () => {
  return (
    <div className={css.container}>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home />} />
            <Route path="movies" element={<Movies />} />
            <Route path="movies/:movieId" element={<MovieDetails />}>
              <Route path="cast" element={ <Cast/>} />
              <Route path="reviews" element={ <Reviews/>} />
            </Route>
            <Route path="*" element={<h1>Error 404</h1>} />
          </Route>
          </Routes>
      </Suspense>
      </div>
  );
};
