export class Router {
    constructor(routes) {
      this.routes = routes;
      this.handleLocation = this.handleLocation.bind(this);
      window.addEventListener('popstate', this.handleLocation);
      window.addEventListener('DOMContentLoaded', this.handleLocation);
    }
  
    navigate(path) {
      window.history.pushState({}, '', path);
      this.handleLocation();
    }
  
    async handleLocation() {
      const path = window.location.pathname;
      const route = this.routes.find(route => {
        if (route.path.includes(':')) {
          const pathPattern = new RegExp('^' + route.path.replace(/:id/, '([^/]+)') + '$');
          return pathPattern.test(path);
        }
        return route.path === path;
      });
  
      if (!route) {
        this.navigate('/');
        return;
      }
  
      const params = {};
      if (route.path.includes(':')) {
        const pathParts = route.path.split('/');
        const currentParts = path.split('/');
        pathParts.forEach((part, i) => {
          if (part.startsWith(':')) {
            params[part.slice(1)] = currentParts[i];
          }
        });
      }
  
      const view = await route.view(params);
      document.querySelector('#content').innerHTML = view;
    }
  }