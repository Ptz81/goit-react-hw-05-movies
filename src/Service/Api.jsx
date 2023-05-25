import axios from 'axios';

const instance = axios.create({
    method: 'GET',
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

export async function getRequestedMovie() {
    const routeWay = `/search/search-movies`;
  try {
    const { data } = await instance.get(routeWay);
    return data.results;
  } catch (error) {
    throw console.error(error);
  }
}

export async function getMovieDetails() {
    const routeWay = `/movies/get-movie-details`;
  try {
    const { data } = await instance.get(routeWay);
    return data.results;
  } catch (error) {
    throw console.error(error);
  }
}

export async function getMovieCredits() {
    const routeWay = `/movies/get-movie-credits`;
  try {
    const { data } = await instance.get(routeWay);
    return data.results;
  } catch (error) {
    throw console.error(error);
  }
}

export async function getMovieReview() {
    const routeWay = `/movies/get-movie-reviews`;
  try {
    const { data } = await instance.get(routeWay);
    return data.results;
  } catch (error) {
    throw console.error(error);
  }
}

