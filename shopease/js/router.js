/**
 * ShopEase - Client-Side Hash Router
 * Listens to location.hash changes to navigate without reloading the page.
 */

window.ShopEaseRouter = {
  routes: {},

  register: (pattern, handler) => {
    window.ShopEaseRouter.routes[pattern] = handler;
  },

  navigate: (hash) => {
    window.location.hash = hash;
  },

  handleRoute: () => {
    let hash = window.location.hash || '#/';
    if (hash === '#') hash = '#/';

    // Update active nav links
    document.querySelectorAll('.nav-link').forEach((link) => {
      const href = link.getAttribute('href');
      if (href === hash || (href === '#/' && (hash === '#/' || hash === ''))) {
        link.classList.add('active');
      } else if (href !== '#/' && hash.startsWith(href)) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 1. Direct route match (e.g. "#/", "#/products", "#/cart", "#/architecture")
    if (window.ShopEaseRouter.routes[hash]) {
      window.ShopEaseRouter.routes[hash]();
      return;
    }

    // 2. Dynamic route match: "#/products/:id"
    const productMatch = hash.match(/^#\/products\/([^/?]+)/);
    if (productMatch && window.ShopEaseRouter.routes['#/products/:id']) {
      const productId = productMatch[1];
      window.ShopEaseRouter.routes['#/products/:id'](productId);
      return;
    }

    // 3. Fallback to home
    if (window.ShopEaseRouter.routes['#/']) {
      window.ShopEaseRouter.routes['#/']();
    }
  },

  init: () => {
    window.addEventListener('hashchange', window.ShopEaseRouter.handleRoute);
    window.ShopEaseRouter.handleRoute();
  }
};
