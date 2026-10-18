export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  category: string;
  rating: number;
  reviewCount: number;
  image: string;
  secondaryImage?: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
  inStock: boolean;
  isFeatured?: boolean;
  stockCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface FilterState {
  category: string;
  searchQuery: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating';
  inStockOnly: boolean;
}

export interface OrderConfirmation {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  customer: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    paymentMethod: string;
  };
}
