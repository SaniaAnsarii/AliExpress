export const testAPI = async () => {
  console.log('Starting API test...');
  
  try {
    console.log('Testing Categories API...');
    const categoriesResponse = await fetch('https://ali-express1.p.rapidapi.com/categories', {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '6fd8e09abfmsh37c08bb90bd4f6ep1ba638jsn1475824bdd57',
        'X-RapidAPI-Host': 'ali-express1.p.rapidapi.com'
      }
    });
    
    console.log('Categories Status:', categoriesResponse.status);
    const categoriesData = await categoriesResponse.json();
    console.log('Categories Data:', categoriesData);
    
    console.log('Testing Search API...');
    const searchResponse = await fetch('https://ali-express1.p.rapidapi.com/search?query=phone&page=1&limit=5', {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '6fd8e09abfmsh37c08bb90bd4f6ep1ba638jsn1475824bdd57',
        'X-RapidAPI-Host': 'ali-express1.p.rapidapi.com'
      }
    });
    
    console.log('Search Status:', searchResponse.status);
    const searchData = await searchResponse.json();
    console.log('Search Data:', searchData);
    
    return {
      categories: { status: categoriesResponse.status, data: categoriesData },
      search: { status: searchResponse.status, data: searchData }
    };
  } catch (error) {
    console.error('API Test failed:', error);
    return { error: error.message };
  }
};
