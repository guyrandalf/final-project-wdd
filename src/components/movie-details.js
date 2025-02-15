export function showMovieDetails(movie) {
    const modal = document.createElement('div');
    modal.innerHTML = `
      <div class="modal-overlay">
        <div class="movie-details-modal">
          <img src="${movie.image}" alt="${movie.title}" style="width: 100%; border-radius: 8px;">
          <h2>${movie.title} (${movie.year})</h2>
          <p>Rating: ⭐ ${movie.rating}</p>
          <p>${movie.description}</p>
          <button class="close-modal">Close</button>
        </div>
      </div>
    `;
  
    document.body.appendChild(modal);
    
    modal.querySelector('.close-modal').addEventListener('click', () => {
      document.body.removeChild(modal);
    });
  }