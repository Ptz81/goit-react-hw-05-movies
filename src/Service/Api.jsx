import axios from 'axios';

export const instance = axios.create({
  method: 'GET',
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: 'c91e59fa560fc5d9b1a82432410ac72e',
    language: 'en-US',
    SEARCH: 'search',
    PATH: 'movie',
  },
});

export async function getTrendMovies() {
  const routeWay = '/trending/movie/week';
  try {
    const { data } = await instance.get(routeWay);
    return data.results;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// export async function searchMovie(request) {
//   try {
//     const { data } = await axios(`${instance.params.PATH}/${instance.params.SEARCH}`, {
//       params: {
//         language: 'en-US',
//         query: request,
//         include_adult: false,
//       },
//     });

//     return data.results;
//   } catch (e) {
//     console.error(e);
//   }
// }
// export async function searchMovie(request) {
//   try {
//     const { data } = await axios(`${instance.defaults.baseURL}/search/movie`, {
//       params: {
//         api_key: instance.defaults.params.api_key,
//         language: instance.defaults.params.language,
//         query: request,
//         include_adult: false,
//       },
//     });

//     return data.results;
//   } catch (e) {
//     console.error(e);
//     throw e;
//   }
// }
export async function searchMovie(request) {
  try {
    const { data } = await instance.get("/search/movie", {
      params: {
        query: request,
        include_adult: false,
      },
    });

    return data.results;
  } catch (e) {
    console.error(e);
    throw e;
  }
}


export async function getRequestedMovie(request, movieId) {
  const routeWay = `/movie/${movieId}${request}`;
  try {
    const { data } = await instance.get(routeWay);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getMovieDetails(movieId) {
  const routeWay = `/movie/${movieId}`;
  try {
    const { data } = await instance.get(routeWay);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getMovieCredits(movieId) {
  const routeWay = `/movie/${movieId}/credits`;
  try {
    const { data } = await instance.get(routeWay);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


export async function getMovieReview(movieId) {
  const routeWay = `/movie/${movieId}/reviews`;
  try {
    const { data } = await instance.get(routeWay);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
