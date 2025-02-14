import './style.css';
import { movies } from './modules/movies';
import { WishlistService } from './services/wishlist';

const wishlistService = new WishlistService();

function renderMovies() {
  document.querySelector('#app').innerHTML = `
    <div class="header">
      <h1>Movie Collection</h1>
      <p>Discover and save your favorite movies</p>
    </div>
    <div class="movie-grid">
      ${movies.map(movie => `
        <div class="movie-card" data-id="${movie.id}">
          <img src="${movie.image}" alt="${movie.title}">
          <h3>${movie.title}</h3>
          <p>${movie.year} • ⭐ ${movie.rating}</p>
          <p class="description">${movie.description}</p>
          <button class="wishlist-btn ${wishlistService.isInWishlist(movie.id) ? 'added' : ''}">
            ${wishlistService.isInWishlist(movie.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
          </button>
        </div>
      `).join('')}
    </div>
  `;

  // Add event listeners
  document.querySelectorAll('.wishlist-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const movieCard = e.target.closest('.movie-card');
      const movieId = parseInt(movieCard.dataset.id);
      const movie = movies.find(m => m.id === movieId);

      if (wishlistService.isInWishlist(movieId)) {
        wishlistService.removeFromWishlist(movieId);
        button.textContent = 'Add to Wishlist';
        button.classList.remove('added');
      } else {
        wishlistService.addToWishlist(movie);
        button.textContent = 'Remove from Wishlist';
        button.classList.add('added');
      }
    });
  });
}

// Initial render
renderMovies();