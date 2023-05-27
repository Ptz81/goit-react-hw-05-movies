import axios from 'axios';

export const instance = axios.create({
    method: 'GET',
    IMG: 'https://image.tmdb.org/t/p/w342',
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: 'c91e59fa560fc5d9b1a82432410ac72e',
        language: 'en-US',
    },
});


export async function getTrendMovies() {
  const routeWay = `/trending/movie/week`;
  try {
    const { data } = await instance.get(routeWay);
    return data.results;
  } catch (error) {
    throw console.error(error);
  }
}

export async function getRequestedMovie(movieId) {
    const routeWay = `/search/${movieId}`;
  try {
    const { data } = await instance.get(routeWay);
    return data.results;
  } catch (error) {
    throw console.error(error);
  }
}

export async function getMovieDetails(movieId) {
    const routeWay = `/movie/${movieId}`;
  try {
    const { data } = await instance.get(routeWay);
    return data.results;
  } catch (error) {
    throw console.error(error);
  }
}

export async function getMovieCredits(movieId) {
    const routeWay = `/movie/${movieId}/credits`;
  try {
    const { data } = await instance.get(routeWay);
    return data.results;
  } catch (error) {
    throw console.error(error);
  }
}

export async function getMovieReview(movieId) {
    const routeWay = `/movie/${movieId}/reviews`;
  try {
    const { data } = await instance.get(routeWay);
    return data.results;
  } catch (error) {
    throw console.error(error);
  }
}

