import './style.css';
import { MovieApi } from './services/movieApi';
import { WishlistService } from './services/wishlist';
import { renderNavigation } from './components/navigation';
import { Router } from './utils/router';
import { homeView } from './views/home';
import { movieDetailView } from './views/movie-detail';

const wishlistService = new WishlistService();
let movies = [];

// routes for moving to other page
const routes = [
  {
    path: '/',
    view: () => homeView(movies)
  },
  {
    path: '/wishlist',
    view: () => homeView(wishlistService.getWishlist())
  },
  {
    path: '/movie/:id',
    view: (params) => {
      const movie = movies.find(m => m.id === parseInt(params.id));
      const isInWishlist = wishlistService.isInWishlist(movie.id);
      return movieDetailView(movie, isInWishlist);
    }
  }
];

const router = new Router(routes);

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
  router.handleLocation();
}

function setupNavigationListeners() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = e.target.dataset.page;
      if (page === 'home') {
        router.navigate('/');
      } else if (page === 'wishlist') {
        router.navigate('/wishlist');
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('wishlist-btn')) {
      e.stopPropagation();
      const movieId = parseInt(e.target.dataset.id);
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

    const movieCard = e.target.closest('.movie-card');
    if (movieCard && !e.target.classList.contains('wishlist-btn')) {
      const movieId = movieCard.dataset.id;
      router.navigate(`/movie/${movieId}`);
    }
  });
}

export function renderMovieCard(movie) {
  const isInWishlist = wishlistService.isInWishlist(movie.id);
  return `
    <div class="movie-card" data-id="${movie.id}">
      <img src="${movie.image}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>${movie.year} • ⭐ ${movie.rating}</p>
      <button class="wishlist-btn ${isInWishlist ? 'added' : ''}" data-id="${movie.id}">
        ${isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
      </button>
    </div>
  `;
}

initializeApp();