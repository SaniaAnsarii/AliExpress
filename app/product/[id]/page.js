'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, addToCartAPI } from '../../features/cart/cartSlice';
import { toggleWishlist, toggleWishlistAPI } from '../../features/wishlist/wishlistSlice';
import { Star, ShoppingCart, Heart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Hardcoded product data from MongoDB Atlas - Updated to match actual IDs
const HARDCODED_PRODUCTS = {
  '68b8983c4f5014ad41a018a6': {
    id: '68b8983c4f5014ad41a018a6',
    title: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality',
    price: 99.99,
    originalPrice: 129.99,
    discount: 23,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    category: 'electronics',
    brand: 'TechBrand',
    stock: 50,
    rating: 4.5,
    reviews: 128,
    shipping: 'Free Shipping',
    tags: ['wireless', 'bluetooth', 'noise-cancellation', 'premium'],
    specifications: {
      batteryLife: '20 hours',
      connectivity: 'Bluetooth 5.0',
      weight: '250g'
    }
  },
  '68b8983c4f5014ad41a018a7': {
    id: '68b8983c4f5014ad41a018a7',
    title: 'Smartphone Case',
    description: 'Protective case for latest smartphone models with shock absorption',
    price: 24.99,
    originalPrice: 34.99,
    discount: 29,
    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500',
    category: 'electronics',
    brand: 'ProtectPro',
    stock: 75,
    rating: 4.3,
    reviews: 89,
    shipping: 'Free Shipping',
    tags: ['protective', 'shock-absorbing', 'smartphone', 'case'],
    specifications: {
      material: 'TPU + Polycarbonate',
      compatibility: 'Universal',
      protection: 'Military Grade'
    }
  },
  '68b8983c4f5014ad41a018a8': {
    id: '68b8983c4f5014ad41a018a8',
    title: 'Cotton T-Shirt',
    description: 'Comfortable cotton t-shirt in various colors, perfect for everyday wear',
    price: 19.99,
    originalPrice: 24.99,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    category: 'clothing',
    brand: 'FashionCo',
    stock: 100,
    rating: 4.6,
    reviews: 156,
    shipping: 'Free Shipping',
    tags: ['cotton', 'comfortable', 'everyday', 'fashion'],
    specifications: {
      material: '100% Cotton',
      fit: 'Regular Fit',
      care: 'Machine Washable'
    }
  },
  '68b8983c4f5014ad41a018a9': {
    id: '68b8983c4f5014ad41a018a9',
    title: 'Garden Tools Set',
    description: 'Complete set of gardening tools for all your gardening needs',
    price: 49.99,
    originalPrice: 64.99,
    discount: 23,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500',
    category: 'home-garden',
    brand: 'GardenMaster',
    stock: 25,
    rating: 4.7,
    reviews: 67,
    shipping: 'Free Shipping',
    tags: ['gardening', 'tools', 'complete-set', 'outdoor'],
    specifications: {
      pieces: '8 pieces',
      material: 'Stainless Steel',
      handle: 'Ergonomic Grip'
    }
  },
  '68b8983c4f5014ad41a018aa': {
    id: '68b8983c4f5014ad41a018aa',
    title: 'Running Shoes',
    description: 'Comfortable running shoes for all terrains with advanced cushioning',
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    category: 'sports-outdoors',
    brand: 'SportMax',
    stock: 60,
    rating: 4.8,
    reviews: 234,
    shipping: 'Free Shipping',
    tags: ['running', 'comfortable', 'cushioning', 'all-terrain'],
    specifications: {
      sole: 'Rubber Outsole',
      cushioning: 'Air Technology',
      weight: '280g per shoe'
    }
  },
  '68b8983c4f5014ad41a018ab': {
    id: '68b8983c4f5014ad41a018ab',
    title: 'Yoga Mat',
    description: 'Non-slip yoga mat with carrying strap',
    price: 24.99,
    originalPrice: 29.99,
    discount: 17,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500',
    category: 'sports-outdoors',
    brand: 'YogaLife',
    stock: 70,
    rating: 4.4,
    reviews: 98,
    shipping: 'Free Shipping',
    tags: ['yoga', 'non-slip', 'carrying-strap', 'fitness'],
    specifications: {
      thickness: '6mm',
      material: 'TPE',
      size: '183 x 61 cm'
    }
  },
  '68b8983c4f5014ad41a018ac': {
    id: '68b8983c4f5014ad41a018ac',
    title: 'Dumbbell Set',
    description: 'Adjustable dumbbell set for home workouts',
    price: 149.99,
    originalPrice: 199.99,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500',
    category: 'sports-outdoors',
    brand: 'FitPro',
    stock: 15,
    rating: 4.9,
    reviews: 45,
    shipping: 'Free Shipping',
    tags: ['dumbbells', 'adjustable', 'home-workout', 'fitness'],
    specifications: {
      weight: '5-25kg',
      material: 'Cast iron',
      adjustment: 'Quick change'
    }
  },
  '68b8983c4f5014ad41a018ad': {
    id: '68b8983c4f5014ad41a018ad',
    title: 'Skiing Equipment',
    description: 'Professional skiing gear for winter sports',
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500',
    category: 'sports-outdoors',
    brand: 'WinterPro',
    stock: 25,
    rating: 4.6,
    reviews: 78,
    shipping: 'Free Shipping',
    tags: ['skiing', 'winter', 'sports', 'professional'],
    specifications: {
      weight: '2.5kg',
      material: 'Carbon fiber',
      season: 'Winter'
    }
  },
  '68b8983c4f5014ad41a018ae': {
    id: '68b8983c4f5014ad41a018ae',
    title: 'Programming Book',
    description: 'Comprehensive guide to modern web development with practical examples',
    price: 39.99,
    originalPrice: 49.99,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500',
    category: 'books',
    brand: 'TechBooks',
    stock: 30,
    rating: 4.7,
    reviews: 156,
    shipping: 'Free Shipping',
    tags: ['programming', 'web-development', 'guide', 'practical'],
    specifications: {
      pages: 450,
      format: 'Paperback',
      language: 'English'
    }
  },
  '68b8983c4f5014ad41a018af': {
    id: '68b8983c4f5014ad41a018af',
    title: 'Board Game Set',
    description: 'Classic board game collection for family entertainment',
    price: 34.99,
    originalPrice: 44.99,
    discount: 22,
    image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=500',
    category: 'toys-games',
    brand: 'GameMaster',
    stock: 40,
    rating: 4.5,
    reviews: 89,
    shipping: 'Free Shipping',
    tags: ['board-game', 'family', 'entertainment', 'classic'],
    specifications: {
      players: '2-6',
      age: '8+',
      duration: '30-60 minutes'
    }
  }
};
    originalPrice: 49.99,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500',
    category: 'books',
    brand: 'TechBooks',
    stock: 30,
    rating: 4.7,
    reviews: 156,
    shipping: 'Free Shipping',
    tags: ['programming', 'web-development', 'guide', 'practical'],
    specifications: {
      pages: 450,
      format: 'Paperback',
      language: 'English'
    }
  },
  '68b8881593ab3e84425f5cc0': {
    id: '68b8881593ab3e84425f5cc0',
    title: 'Board Game Set',
    description: 'Classic board game collection for family entertainment',
    price: 34.99,
    originalPrice: 44.99,
    discount: 22,
    image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=500',
    category: 'toys-games',
    brand: 'GameMaster',
    stock: 40,
    rating: 4.5,
    reviews: 89,
    shipping: 'Free Shipping',
    tags: ['board-game', 'family', 'entertainment', 'classic'],
    specifications: {
      players: '2-6',
      age: '8+',
      duration: '30-60 minutes'
    }
  }
};

export default function ProductDetailPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const [quantity, setQuantity] = useState(1);
  
  // Get product from hardcoded data
  const product = HARDCODED_PRODUCTS[params.id];
  
  const isWishlisted = wishlistItems.some(item => item.id === product?.id);

  useEffect(() => {
    if (params.id) {
      // No need to dispatch fetchProductDetails as product data is hardcoded
    }
  }, [params.id]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      // Redirect to login or show auth modal
      console.log('Authentication required');
      return;
    }

    if (!product) return;

    // Use API call for database persistence
    dispatch(addToCartAPI({
      productId: product.id,
      quantity: quantity,
      productData: {
        title: product.title,
        price: product.price,
        imageUrl: product.image,
        category: product.category || 'General',
        stockQuantity: product.stock || 100
      }
    }));

    // Also update local state for immediate UI feedback
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: quantity
    }));
  };

  const handleWishlist = () => {
    if (!isAuthenticated) {
      console.log('Authentication required');
      return;
    }
    
    if (!product) return;
    
    // Use API call for database persistence
    dispatch(toggleWishlistAPI({
      productId: product.id,
      productData: {
        title: product.title,
        price: product.price,
        imageUrl: product.image,
        category: product.category || 'General',
        stockQuantity: product.stock || 100
      }
    }));
    
    // Also update local state for immediate UI feedback
    dispatch(toggleWishlist(product.id));
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 bg-white min-h-screen">
        <div className="text-center">
          <div className="text-red-600 text-lg font-medium mb-2">Product not found</div>
          <div className="text-black mb-4">The product you are looking for does not exist.</div>
          <Link href="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-black hover:text-red-600 mb-6 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-96 object-cover rounded-lg"
            />
            
            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={handleWishlist}
                className={`p-2 rounded-full shadow-lg transition-colors ${
                  isWishlisted 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white text-black hover:text-red-500'
                }`}
              >
                <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>
            
            {/* Discount Badge */}
            {product.discount && (
              <div className="absolute top-4 left-4 bg-red-500 text-white text-sm px-3 py-1 rounded">
                {product.discount}% OFF
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-black">{product.title}</h1>
            
            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        i < Math.floor(product.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-black">
                  {product.rating} ({product.reviews || 0} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-4xl font-bold text-red-600">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-black line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Shipping */}
            {product.shipping && (
              <div className="text-green-600 font-medium">
                {product.shipping}
              </div>
            )}

            {/* Description */}
            {product.description && (
              <div>
                <h3 className="font-semibold text-black mb-2">Description</h3>
                <p className="text-black leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Specifications */}
            {product.specifications && (
              <div>
                <h3 className="font-semibold text-black mb-2">Specifications</h3>
                <div className="grid grid-cols-1 gap-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-200">
                      <span className="font-medium text-black capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="text-black">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div>
                <h3 className="font-semibold text-black mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-black px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="font-medium text-black">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-black hover:text-red-600 transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center border-none focus:ring-0 focus:outline-none text-black"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-black hover:text-red-600 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
