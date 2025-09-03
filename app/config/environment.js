// Environment configuration for different deployment environments
const getEnvironmentConfig = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  const isRender = process.env.RENDER === 'true';
  
  if (isProduction && isRender) {
    return {
      apiUrl: 'https://aliexpress-backend.onrender.com',
      corsOrigin: 'https://aliexpress-frontend.onrender.com'
    };
  }
  
  if (isProduction) {
    return {
      apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
      corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000'
    };
  }
  
  // Development
  return {
    apiUrl: 'http://localhost:5000',
    corsOrigin: 'http://localhost:3000'
  };
};

export const config = getEnvironmentConfig();
