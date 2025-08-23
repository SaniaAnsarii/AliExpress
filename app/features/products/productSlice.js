import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ query = '', category = '' }, { rejectWithValue }) => {
    try {
             const options = {
         method: 'GET',
         url: 'https://ali-express1.p.rapidapi.com/search',
         params: {
           query: query || 'iphone',
           page: '1',
           limit: '10'
         },
        headers: {
          'X-RapidAPI-Key': '6fd8e09abfmsh37c08bb90bd4f6ep1ba638jsn1475824bdd57',
          'X-RapidAPI-Host': 'ali-express1.p.rapidapi.com'
        }
      };

      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching product details
export const fetchProductDetails = createAsyncThunk(
  'products/fetchProductDetails',
  async (productId, { rejectWithValue }) => {
    try {
      const options = {
        method: 'GET',
        url: 'https://ali-express1.p.rapidapi.com/product',
        params: { id: productId },
        headers: {
          'X-RapidAPI-Key': '6fd8e09abfmsh37c08bb90bd4f6ep1ba638jsn1475824bdd57',
          'X-RapidAPI-Host': 'ali-express1.p.rapidapi.com'
        }
      };

      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  products: [],
  productDetails: null,
  loading: false,
  error: null,
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
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        // Handle different possible response structures
        state.products = action.payload?.data || action.payload?.results || action.payload || [];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Product Details
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
