// Mock data for testing when API doesn't return results
export const mockProducts = [
  {
    id: 1,
    title: "iPhone 15 Pro Max 256GB - Natural Titanium",
    price: "1199.99",
    originalPrice: "1299.99",
    discount: "8%",
    rating: 4.8,
    reviews: 2847,
    image: "https://via.placeholder.com/300x300/1f2937/ffffff?text=iPhone+15",
    shipping: "Free shipping",
    delivery: "Fast delivery: 3-7 days"
  },
  {
    id: 2,
    title: "Samsung Galaxy S24 Ultra 512GB - Phantom Black",
    price: "1099.99",
    originalPrice: "1199.99",
    discount: "8%",
    rating: 4.7,
    reviews: 1923,
    image: "https://via.placeholder.com/300x300/1f2937/ffffff?text=Galaxy+S24",
    shipping: "Free shipping",
    delivery: "Fast delivery: 3-7 days"
  },
  {
    id: 3,
    title: "MacBook Air M3 13-inch 256GB - Midnight",
    price: "999.99",
    originalPrice: "1099.99",
    discount: "9%",
    rating: 4.9,
    reviews: 3421,
    image: "https://via.placeholder.com/300x300/1f2937/ffffff?text=MacBook+Air",
    shipping: "Free shipping",
    delivery: "Fast delivery: 5-10 days"
  },
  {
    id: 4,
    title: "Sony WH-1000XM5 Noise Canceling Headphones",
    price: "349.99",
    originalPrice: "399.99",
    discount: "13%",
    rating: 4.6,
    reviews: 5672,
    image: "https://via.placeholder.com/300x300/1f2937/ffffff?text=Sony+Headphones",
    shipping: "Free shipping",
    delivery: "Fast delivery: 2-5 days"
  },
  {
    id: 5,
    title: "iPad Pro 12.9-inch M2 128GB - Space Gray",
    price: "899.99",
    originalPrice: "999.99",
    discount: "10%",
    rating: 4.8,
    reviews: 2156,
    image: "https://via.placeholder.com/300x300/1f2937/ffffff?text=iPad+Pro",
    shipping: "Free shipping",
    delivery: "Fast delivery: 3-7 days"
  },
  {
    id: 6,
    title: "Apple Watch Series 9 45mm GPS - Midnight Aluminum",
    price: "429.99",
    originalPrice: "459.99",
    discount: "7%",
    rating: 4.7,
    reviews: 4234,
    image: "https://via.placeholder.com/300x300/1f2937/ffffff?text=Apple+Watch",
    shipping: "Free shipping",
    delivery: "Fast delivery: 2-5 days"
  }
];

export const getRandomProducts = (count = 6) => {
  const shuffled = [...mockProducts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
