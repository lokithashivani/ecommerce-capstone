import { useState, useEffect, useCallback } from 'react';

export interface RouteState {
  path: string;
  productId: string | null;
  queryParams: Record<string, string>;
  fullHash: string;
}

function parseHash(hash: string): RouteState {
  // Normalize hash, e.g. "" or "#" -> "#/"
  let clean = hash.trim();
  if (!clean || clean === '#') {
    clean = '#/';
  }

  // Separate path from query string if present (e.g. "#/products?category=Audio")
  const [hashAndPath, queryString] = clean.split('?');
  const queryParams: Record<string, string> = {};
  if (queryString) {
    const params = new URLSearchParams(queryString);
    params.forEach((val, key) => {
      queryParams[key] = val;
    });
  }

  // Extract route path e.g. "#/products/1" -> "/products/1"
  const rawPath = hashAndPath.startsWith('#') ? hashAndPath.slice(1) : hashAndPath;
  const path = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;

  // Check for product detail route: "/products/:id"
  let productId: string | null = null;
  const productMatch = path.match(/^\/products\/([^/]+)$/);
  if (productMatch) {
    productId = decodeURIComponent(productMatch[1]);
  }

  return {
    path,
    productId,
    queryParams,
    fullHash: clean
  };
}

export function useHashRouter() {
  const [route, setRoute] = useState<RouteState>(() => {
    if (typeof window !== 'undefined') {
      return parseHash(window.location.hash);
    }
    return { path: '/', productId: null, queryParams: {}, fullHash: '#/' };
  });

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(parseHash(window.location.hash));
      // Scroll to top upon navigating to a new route
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    // Ensure initial hash exists
    if (!window.location.hash) {
      window.location.hash = '#/';
    }

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const navigate = useCallback((target: string) => {
    // If target doesn't start with #, prefix it
    const formatted = target.startsWith('#') ? target : `#${target.startsWith('/') ? target : `/${target}`}`;
    if (window.location.hash === formatted) {
      // Force scroll to top if already on target hash
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.hash = formatted;
    }
  }, []);

  return {
    route,
    navigate,
    isHome: route.path === '/' || route.path === '',
    isProducts: route.path === '/products',
    isProductDetail: Boolean(route.productId),
    isCart: route.path === '/cart',
    isCheckout: route.path === '/checkout'
  };
}
