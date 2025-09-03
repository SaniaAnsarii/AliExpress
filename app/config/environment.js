// Environment configuration for different deployment environments
const getEnvironmentConfig = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  const isRender = process.env.RENDER === 'true';
  
  // Debug logging
  console.log('🔧 Environment Debug:', {
    NODE_ENV: process.env.NODE_ENV,
    RENDER: process.env.RENDER,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
  });
  
  if (isProduction && isRender) {
    console.log('🚀 Production + Render detected');
    return {
      apiUrl: 'https://aliexpress-1.onrender.com',
      corsOrigin: 'https://aliexpress-1.onrender.com'
    };
  }
  
  if (isProduction) {
    console.log('🏭 Production detected');
    return {
      apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
      corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000'
    };
  }
  
  // Development
  console.log('💻 Development detected');
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://aliexpress-1.onrender.com';
  console.log('🔗 Using API URL:', apiUrl);
  
  return {
    apiUrl: apiUrl,
    corsOrigin: 'http://localhost:3000'
  };
};

export const config = getEnvironmentConfig();
