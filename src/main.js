import './style.css';
import { MovieApi } from './services/movieApi';
import { WishlistService } from './services/wishlist';
import { renderNavigation } from './components/navigation';
import { showMovieDetails } from './components/movie-details';

const wishlistService = new WishlistService();
let movies = [];

async function initializeApp() {
  try {
    movies = await MovieApi.getPopularMovies();
    renderApp();
  } catch (error) {
    console.error('Failed to initialize app:', error);
    document.querySelector('#app').innerHTML = `
      <div class="error">
        <h2>Failed to load movies</h2>
        <p>Please try again later</p>
      </div>
    `;
  }
}

function renderApp() {
  const app = document.querySelector('#app');
  app.innerHTML = `
    ${renderNavigation()}
    <div id="content"></div>
  `;

  setupNavigationListeners();
  renderMovieGrid(movies);
}

function setupNavigationListeners() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = e.target.dataset.page;
      if (page === 'home') {
        renderMovieGrid(movies);
      } else if (page === 'wishlist') {
        renderMovieGrid(wishlistService.getWishlist());
      }
    });
  });
}

function renderMovieGrid(moviesToShow) {
  const content = document.querySelector('#content');
  content.innerHTML = `
    <div class="movie-grid">
      ${moviesToShow.map(movie => renderMovieCard(movie)).join('')}
    </div>
  `;

  setupMovieCardListeners();
}

function renderMovieCard(movie) {
  const isInWishlist = wishlistService.isInWishlist(movie.id);
  return `
    <div class="movie-card" data-id="${movie.id}">
      <img src="${movie.image}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>${movie.year} • ⭐ ${movie.rating}</p>
      <button class="view-details-btn">View Details</button>
      <button class="wishlist-btn ${isInWishlist ? 'added' : ''}">
        ${isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
      </button>
    </div>
  `;
}

function setupMovieCardListeners() {
  // View Details listeners
  document.querySelectorAll('.view-details-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const movieId = parseInt(e.target.closest('.movie-card').dataset.id);
      const movie = movies.find(m => m.id === movieId);
      showMovieDetails(movie);
    });
  });

  // Wishlist button listeners
  document.querySelectorAll('.wishlist-btn').forEach(button => {
    button.addEventListener('click', handleWishlistClick);
  });
}

function handleWishlistClick(e) {
  const movieCard = e.target.closest('.movie-card');
  const movieId = parseInt(movieCard.dataset.id);
  const movie = movies.find(m => m.id === movieId);

  if (wishlistService.isInWishlist(movieId)) {
    wishlistService.removeFromWishlist(movieId);
    e.target.textContent = 'Add to Wishlist';
    e.target.classList.remove('added');
  } else {
    wishlistService.addToWishlist(movie);
    e.target.textContent = 'Remove from Wishlist';
    e.target.classList.add('added');
  }
}

initializeApp();