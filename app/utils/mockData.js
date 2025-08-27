// Product catalog data

export const mockProducts = [
  // Electronics
  {
    id: 1,
    title: "iPhone 15 Pro Max 256GB Titanium",
    price: 1199.99,
    originalPrice: 1399.99,
    discount: 14,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 1247,
    shipping: "Free Shipping",
    sold: 8923,
    category: "electronics",
    description: "Latest iPhone with advanced camera system and A17 Pro chip"
  },
  {
    id: 2,
    title: "MacBook Air M3 13-inch 8GB RAM 256GB SSD",
    price: 999.99,
    originalPrice: 1199.99,
    discount: 17,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 2156,
    shipping: "Free Shipping",
    sold: 5678,
    category: "electronics",
    description: "Ultra-thin laptop with M3 chip for incredible performance"
  },
  {
    id: 3,
    title: "Samsung Galaxy S24 Ultra 256GB Titanium",
    price: 1299.99,
    originalPrice: 1499.99,
    discount: 13,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 1893,
    shipping: "Free Shipping",
    sold: 4321,
    category: "electronics",
    description: "Premium Android flagship with S Pen and advanced AI features"
  },
  {
    id: 4,
    title: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
    price: 349.99,
    originalPrice: 399.99,
    discount: 12,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 3421,
    shipping: "Free Shipping",
    sold: 15678,
    category: "electronics",
    description: "Industry-leading noise cancellation with premium sound quality"
  },
  {
    id: 5,
    title: "DJI Mini 3 Pro Drone with 4K Camera",
    price: 759.99,
    originalPrice: 899.99,
    discount: 16,
    image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 892,
    shipping: "Free Shipping",
    sold: 2345,
    category: "electronics",
    description: "Professional drone with 4K camera and obstacle avoidance"
  },
  {
    id: 6,
    title: "Apple Watch Series 9 GPS 45mm Aluminum",
    price: 399.99,
    originalPrice: 449.99,
    discount: 11,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 1876,
    shipping: "Free Shipping",
    sold: 7890,
    category: "electronics",
    description: "Advanced health monitoring with S9 chip and new features"
  },
  {
    id: 7,
    title: "iPad Pro 12.9-inch M2 128GB WiFi",
    price: 1099.99,
    originalPrice: 1299.99,
    discount: 15,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 2341,
    shipping: "Free Shipping",
    sold: 3456,
    category: "electronics",
    description: "Most powerful iPad with M2 chip and Liquid Retina XDR display"
  },
  {
    id: 8,
    title: "Nintendo Switch OLED Model with White Joy-Con",
    price: 349.99,
    originalPrice: 399.99,
    discount: 12,
    image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 3456,
    shipping: "Free Shipping",
    sold: 12345,
    category: "electronics",
    description: "Enhanced gaming console with vibrant OLED screen"
  },
  {
    id: 9,
    title: "Canon EOS R6 Mark II Mirrorless Camera",
    price: 2499.99,
    originalPrice: 2799.99,
    discount: 11,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 567,
    shipping: "Free Shipping",
    sold: 890,
    category: "electronics",
    description: "Professional mirrorless camera with advanced autofocus"
  },
  {
    id: 10,
    title: "LG C3 65-inch 4K OLED Smart TV",
    price: 2499.99,
    originalPrice: 2999.99,
    discount: 17,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 1234,
    shipping: "Free Shipping",
    sold: 2345,
    category: "electronics",
    description: "Premium OLED TV with perfect blacks and stunning colors"
  },
  {
    id: 11,
    title: "Bose QuietComfort 45 Wireless Headphones",
    price: 279.99,
    originalPrice: 329.99,
    discount: 15,
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 2987,
    shipping: "Free Shipping",
    sold: 8765,
    category: "electronics",
    description: "Premium noise-cancelling headphones with 24-hour battery"
  },
  {
    id: 12,
    title: "Microsoft Surface Laptop 5 13.5-inch Intel i7",
    price: 1299.99,
    originalPrice: 1499.99,
    discount: 13,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 1456,
    shipping: "Free Shipping",
    sold: 2345,
    category: "electronics",
    description: "Premium ultrabook with stunning display and performance"
  },
  // Fashion
  {
    id: 13,
    title: "Nike Air Max 270 Running Shoes",
    price: 129.99,
    originalPrice: 149.99,
    discount: 13,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 1892,
    shipping: "Free Shipping",
    sold: 5678,
    category: "fashion",
    description: "Comfortable running shoes with Air Max technology"
  },
  {
    id: 14,
    title: "Adidas Ultraboost 22 Running Shoes",
    price: 179.99,
    originalPrice: 199.99,
    discount: 10,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 1456,
    shipping: "Free Shipping",
    sold: 3456,
    category: "fashion",
    description: "Premium running shoes with responsive Boost midsole"
  },
  {
    id: 15,
    title: "Levi's 501 Original Jeans",
    price: 89.99,
    originalPrice: 99.99,
    discount: 10,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
    rating: 4.4,
    reviews: 892,
    shipping: "Free Shipping",
    sold: 1234,
    category: "fashion",
    description: "Classic straight-leg jeans with timeless style"
  },
  {
    id: 16,
    title: "Ray-Ban Aviator Classic Sunglasses",
    price: 159.99,
    originalPrice: 179.99,
    discount: 11,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 567,
    shipping: "Free Shipping",
    sold: 890,
    category: "fashion",
    description: "Iconic aviator sunglasses with premium lenses"
  },
  // Home & Garden
  {
    id: 17,
    title: "Dyson V15 Detect Cordless Vacuum",
    price: 699.99,
    originalPrice: 799.99,
    discount: 13,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 1234,
    shipping: "Free Shipping",
    sold: 2345,
    category: "home",
    description: "Cordless vacuum with laser dust detection"
  },
  {
    id: 18,
    title: "Instant Pot Duo 7-in-1 Pressure Cooker",
    price: 89.99,
    originalPrice: 109.99,
    discount: 18,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 2341,
    shipping: "Free Shipping",
    sold: 5678,
    category: "home",
    description: "Multi-functional pressure cooker for quick meals"
  },
  {
    id: 19,
    title: "Philips Hue Smart Bulb Set",
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 892,
    shipping: "Free Shipping",
    sold: 3456,
    category: "home",
    description: "Smart LED bulbs with voice control and automation"
  },
  // Sports & Outdoors
  {
    id: 20,
    title: "GoPro Hero 11 Black Action Camera",
    price: 399.99,
    originalPrice: 449.99,
    discount: 11,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 756,
    shipping: "Free Shipping",
    sold: 1234,
    category: "sports",
    description: "Action camera with 5.3K video and HyperSmooth 5.0"
  },
  {
    id: 21,
    title: "Yeti Rambler 20oz Water Bottle",
    price: 34.99,
    originalPrice: 39.99,
    discount: 13,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 1234,
    shipping: "Free Shipping",
    sold: 5678,
    category: "sports",
    description: "Premium insulated water bottle for outdoor adventures"
  },
  {
    id: 22,
    title: "Patagonia Down Jacket",
    price: 199.99,
    originalPrice: 229.99,
    discount: 13,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 567,
    shipping: "Free Shipping",
    sold: 890,
    category: "sports",
    description: "Lightweight down jacket perfect for cold weather"
  },
  // Books & Media
  {
    id: 23,
    title: "Kindle Paperwhite E-reader",
    price: 139.99,
    originalPrice: 159.99,
    discount: 13,
    image: "https://images.unsplash.com/photo-1544716278-c5e3f4abd8c?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 892,
    shipping: "Free Shipping",
    sold: 3456,
    category: "books",
    description: "Waterproof e-reader with adjustable warm light"
  },
  // Jewelry
  {
    id: 24,
    title: "Diamond Stud Earrings 14K White Gold",
    price: 299.99,
    originalPrice: 399.99,
    discount: 25,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 456,
    shipping: "Free Shipping",
    sold: 234,
    category: "jewelry",
    description: "Classic diamond stud earrings with 14k white gold setting"
  },
  {
    id: 25,
    title: "Gold Chain Necklace 18K",
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 234,
    shipping: "Free Shipping",
    sold: 567,
    category: "jewelry",
    description: "Elegant 18k gold chain necklace with adjustable length"
  }
];

export const categories = [
  { id: 'electronics', name: 'Electronics', icon: '📱' },
  { id: 'fashion', name: 'Fashion', icon: '👕' },
  { id: 'home', name: 'Home & Garden', icon: '🏠' },
  { id: 'sports', name: 'Sports & Outdoors', icon: '⚽' },
  { id: 'books', name: 'Books & Media', icon: '📚' },
  { id: 'jewelry', name: 'Jewelry', icon: '💍' }
];

export const popularSearches = [
  "iPhone 15",
  "MacBook Air",
  "Samsung Galaxy",
  "Wireless Headphones",
  "Gaming Console",
  "Smart Watch",
  "Drone",
  "4K Camera"
];

export const getRandomProducts = (count = 6) => {
  const shuffled = [...mockProducts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const filterProducts = (products, query = '', category = '') => {
  let filtered = products;
  
  if (category && category !== 'all') {
    filtered = filtered.filter(product => product.category === category);
  }
  
  if (query) {
    const searchTerm = query.toLowerCase();
    filtered = filtered.filter(product => 
      product.title.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
  }
  
  return filtered;
};

export const getCategoryIcon = (category) => {
  const iconMap = {
    'electronics': '📱',
    'jewelry': '💍',
    'fashion': '👕',
    'home': '🏠',
    'sports': '⚽',
    'books': '📚',
    'default': '📦'
  };
  return iconMap[category.toLowerCase()] || iconMap.default;
};
