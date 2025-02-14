export class WishlistService {
    constructor() {
      this.wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    }
  
    addToWishlist(movie) {
      if (!this.isInWishlist(movie.id)) {
        this.wishlist.push(movie);
        this.saveWishlist();
        return true;
      }
      return false;
    }
  
    removeFromWishlist(movieId) {
      this.wishlist = this.wishlist.filter(movie => movie.id !== movieId);
      this.saveWishlist();
    }
  
    isInWishlist(movieId) {
      return this.wishlist.some(movie => movie.id === movieId);
    }
  
    getWishlist() {
      return this.wishlist;
    }
  
    saveWishlist() {
      localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    }
  }