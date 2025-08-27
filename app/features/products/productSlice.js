import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { searchProducts, getCategories } from '../../services/apiService';
import { mockProducts, filterProducts, categories } from '../../utils/mockData';



export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Fetching categories...');
      const result = await getCategories();
      
      console.log('Categories result:', result);
      return { data: result.data, source: result.source };
    } catch (error) {
      console.log('Categories API failed:', error.message);
      return { data: categories };
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async ({ categoryId = '', query = '' }, { rejectWithValue }) => {
    try {
      console.log('Fetching products...');
      const result = await searchProducts(query, categoryId);
      
      console.log('Products result:', result);
      console.log('Products result.data:', result.data);
      console.log('Products result.source:', result.source);
      
      if (result.rateLimited) {
        console.log('Returning rate-limited response');
        return { 
          data: result.data, 
          rateLimited: true,
          source: 'mock'
        };
      }
      
      console.log('Returning normal response with source:', result.source);
      return { 
        data: result.data, 
        source: result.source 
      };
    } catch (error) {
      console.log('Products API failed:', error.message);
      const filteredProducts = filterProducts(mockProducts, query, categoryId);
      console.log('Returning mock data from catch block:', filteredProducts.length, 'products');
      return { 
        data: filteredProducts, 
        source: 'mock' 
      };
    }
  }
);

export const fetchProductDetails = createAsyncThunk(
  'products/fetchProductDetails',
  async (productId, { rejectWithValue }) => {
    try {
      const options = {
        method: 'GET',
        url: `https://ali-express1.p.rapidapi.com/product/${productId}`,
        headers: {
          'X-RapidAPI-Key': '6fd8e09abfmsh37c08bb90bd4f6ep1ba638jsn1475824bdd57',
          'X-RapidAPI-Host': 'ali-express1.p.rapidapi.com'
        }
      };

      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.log('Product details API failed:', error.message);
      const mockProduct = mockProducts.find(p => p.id === parseInt(productId));
      return mockProduct || null;
    }
  }
);

export const fetchProductFeedback = createAsyncThunk(
  'products/fetchProductFeedback',
  async (productId, { rejectWithValue }) => {
    try {
      const options = {
        method: 'GET',
        url: `https://ali-express1.p.rapidapi.com/product/${productId}/feedback/`,
        headers: {
          'X-RapidAPI-Key': '6fd8e09abfmsh37c08bb90bd4f6ep1ba638jsn1475824bdd57',
          'X-RapidAPI-Host': 'ali-express1.p.rapidapi.com'
        }
      };

      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.log('Product feedback API failed:', error.message);
      return { data: [] };
    }
  }
);

export const fetchShippingInfo = createAsyncThunk(
  'products/fetchShippingInfo',
  async (productId, { rejectWithValue }) => {
    try {
      const options = {
        method: 'GET',
        url: `https://ali-express1.p.rapidapi.com/shipping/${productId}`,
        headers: {
          'X-RapidAPI-Key': '6fd8e09abfmsh37c08bb90bd4f6ep1ba638jsn1475824bdd57',
          'X-RapidAPI-Host': 'ali-express1.p.rapidapi.com'
        }
      };

      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.log('Shipping info API failed:', error.message);
      return { data: { shipping: 'Free shipping', delivery: '7-14 days' } };
    }
  }
);



const initialState = {
  products: [],
  categories: [],
  productDetails: null,
  productFeedback: [],
  shippingInfo: null,
  loading: false,
  error: null,
  apiStatus: 'idle', // 'idle', 'loading', 'success', 'rate_limited', 'error'
  searchQuery: '',
  filters: {
    category: '',
    priceRange: { min: 0, max: 1000 },
    sortBy: 'relevance'
  }
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: '',
        priceRange: { min: 0, max: 1000 },
        sortBy: 'relevance'
      };
    },
    clearProductDetails: (state) => {
      state.productDetails = null;
    },
    setApiStatus: (state, action) => {
      state.apiStatus = action.payload;
    },
    setRateLimited: (state) => {
      state.apiStatus = 'rate_limited';
      state.error = 'API rate limit exceeded. Using mock data.';
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.apiStatus = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload?.data || action.payload || [];
        state.apiStatus = action.payload?.source === 'mock' ? 'rate_limited' : 'success';
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.apiStatus = 'error';
      })

      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.apiStatus = 'loading';
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        
        console.log('Processing fulfilled action:', action.payload);
        
        const productsData = action.payload?.data || action.payload?.results || action.payload || [];
        state.products = productsData;
        
        console.log('Set products to:', productsData.length, 'items');
        console.log('Products source:', action.payload?.source);
        
        if (action.payload?.source === 'mock' || action.payload?.rateLimited) {
          state.apiStatus = 'rate_limited';
          state.error = 'API rate limit exceeded. Showing mock data.';
          console.log('Set status to rate_limited');
        } else if (action.payload?.source === 'fakestore') {
          state.apiStatus = 'success';
          state.error = null;
          console.log('Set status to success (fakestore)');
        } else if (action.payload?.source === 'rapidapi') {
          state.apiStatus = 'success';
          state.error = null;
          console.log('Set status to success (rapidapi)');
        } else {
          state.apiStatus = 'success';
          state.error = null;
          console.log('Set status to success (default)');
        }
        
        console.log('Final state - products:', state.products.length, 'error:', state.error, 'apiStatus:', state.apiStatus);
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.apiStatus = 'error';
      })

      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchProductFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.productFeedback = action.payload?.data || action.payload || [];
      })
      .addCase(fetchProductFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchShippingInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShippingInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.shippingInfo = action.payload?.data || action.payload;
      })
      .addCase(fetchShippingInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  setSearchQuery, 
  setFilters, 
  clearFilters, 
  clearProductDetails 
} = productSlice.actions;

export default productSlice.reducer;
