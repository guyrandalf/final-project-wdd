import './style.css'

// Initial movie data
const movies = [
  { id: 1, title: "Inception", year: 2010, image: "https://placehold.co/300x400" },
  { id: 2, title: "The Dark Knight", year: 2008, image: "https://placehold.co/300x400" },
  { id: 3, title: "Interstellar", year: 2014, image: "https://placehold.co/300x400" }
];

// Render movies to the page
document.querySelector('#app').innerHTML = `
  <div>
    <h1>My Movie Collection</h1>
    <div class="movie-grid">
      ${movies.map(movie => `
        <div class="movie-card" data-id="${movie.id}">
          <img src="${movie.image}" alt="${movie.title}">
          <h3>${movie.title}</h3>
          <p>${movie.year}</p>
          <button class="wishlist-btn">Add to Wishlist</button>
        </div>
      `).join('')}
    </div>
  </div>
`