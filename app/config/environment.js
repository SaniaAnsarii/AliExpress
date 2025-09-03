
const getEnvironmentConfig = () => {

  const apiUrl = 'https://aliexpress-1.onrender.com';
  
  console.log('🔗 Using hardcoded API URL:', apiUrl);
  
  return {
    apiUrl: apiUrl,
    corsOrigin: 'http://localhost:3000'
  };
};

export const config = getEnvironmentConfig();
