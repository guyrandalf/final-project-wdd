const API_KEY = 'b293ab0c9df5cc48150881177e4c3dfa'; // Sign up at https://www.themoviedb.org/
const BASE_URL = 'https://api.themoviedb.org/3';

export class MovieApi {
  static async getPopularMovies() {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      );
      const data = await response.json();

      return data.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        year: new Date(movie.release_date).getFullYear(),
        image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        description: movie.overview,
        rating: movie.vote_average
      }));
    } catch (error) {
      console.error('Error fetching movies:', error);
      return [];
    }
  }
}