import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getProductDetails, 
  getProductFeedback, 
  getShippingInfo, 
  searchProducts, 
  getCategories 
} from '../../services/apiService';

const initialState = {
  products: [],
  categories: [],
  loading: false,
  error: null,
  apiStatus: 'idle'
};

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async ({ categoryId, query = '' }) => {
    try {
      console.log('🔄 Fetching products for category:', categoryId, 'query:', query);
      const response = await searchProducts(query, categoryId);
      console.log('✅ Products fetched successfully:', response.data.length, 'products');
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching products:', error);
      throw error;
    }
  }
);

export const fetchProductDetails = createAsyncThunk(
  'products/fetchProductDetails',
  async (productId) => {
    try {
      console.log('🔄 Fetching product details for:', productId);
      const response = await getProductDetails(productId);
      console.log('✅ Product details fetched successfully');
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching product details:', error);
      throw error;
    }
  }
);

export const fetchProductFeedback = createAsyncThunk(
  'products/fetchProductFeedback',
  async (productId) => {
    try {
      console.log('🔄 Fetching product feedback for:', productId);
      const response = await getProductFeedback(productId);
      console.log('✅ Product feedback fetched successfully');
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching product feedback:', error);
      throw error;
    }
  }
);

export const fetchShippingInfo = createAsyncThunk(
  'products/fetchShippingInfo',
  async (productId) => {
    try {
      console.log('🔄 Fetching shipping info for:', productId);
      const response = await getShippingInfo(productId);
      console.log('✅ Shipping info fetched successfully');
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching shipping info:', error);
      throw error;
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    try {
      console.log('🔄 Fetching categories...');
      const response = await getCategories();
      console.log('✅ Categories fetched successfully:', response.data.length, 'categories');
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching categories:', error);
      throw error;
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.products = [];
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setApiStatus: (state, action) => {
      state.apiStatus = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch products by category
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.apiStatus = 'loading';
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
        state.apiStatus = 'success';
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.apiStatus = 'error';
      })
      
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      .addCase(fetchProductFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProductFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Fetch shipping info
      .addCase(fetchShippingInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShippingInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchShippingInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Fetch categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { clearProducts, clearError, setApiStatus } = productSlice.actions;
export default productSlice.reducer;
