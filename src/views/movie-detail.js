export function movieDetailView(movie, isInWishlist) {
  return `
    <div class="movie-detail-page">
      <button class="back-btn" onclick="window.history.back()">← Back</button>
      <div class="movie-detail-content">
        <img src="${movie.image}" alt="${movie.title}">
        <div class="movie-info">
          <h1>${movie.title}</h1>
          <p class="year-rating">${movie.year} • ⭐ ${movie.rating}</p>
          <p class="description">${movie.description}</p>
          <button class="wishlist-btn ${isInWishlist ? 'added' : ''}" data-id="${movie.id}">
            ${isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          </button>
        </div>
      </div>
    </div>
  `;
}