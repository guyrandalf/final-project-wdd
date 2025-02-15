export function renderNavigation() {
    return `
      <nav class="navigation">
        <div class="nav-brand">Randalf MovieHub</div>
        <small>api by: themoviesdb.org</small>
        <div class="nav-links">
          <a href="#" class="nav-link" data-page="home">Home</a>
          <a href="#" class="nav-link" data-page="wishlist">Wishlist</a>
        </div>
      </nav>
    `;
  }