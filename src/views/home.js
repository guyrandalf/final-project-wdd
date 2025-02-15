import { renderMovieCard } from '../main.js';

export function homeView(movies) {
  return `
    <div class="movie-grid">
      ${movies.map(movie => renderMovieCard(movie)).join('')}
    </div>
  `;
}