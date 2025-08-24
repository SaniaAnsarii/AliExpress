// Mock data for testing when API doesn't return results
export const mockProducts = [
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
    sold: 8923
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
    sold: 5678
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
    sold: 4321
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
    sold: 15678
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
    sold: 2345
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
    sold: 7890
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
    sold: 3456
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
    sold: 12345
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
    sold: 890
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
    sold: 2345
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
    sold: 8765
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
    sold: 2345
  }
];

export const categories = [
  "Electronics",
  "Smartphones",
  "Laptops",
  "Cameras",
  "Gaming",
  "Audio",
  "Wearables",
  "TV & Video"
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
