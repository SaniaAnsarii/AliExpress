import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Will store full wishlist items from backend
  isOpen: false, 
  loading: false,
  error: null
};

export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token');
      }

      const response = await fetch('https://aliexpress-1.onrender.com/api/wishlist', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch wishlist');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addToWishlistAPI = createAsyncThunk(
  'wishlist/addToWishlistAPI',
  async ({ productId, productData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token');
      }

      const response = await fetch('https://aliexpress-1.onrender.com/api/wishlist/add', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId, productData })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add to wishlist');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeFromWishlistAPI = createAsyncThunk(
  'wishlist/removeFromWishlistAPI',
  async (productId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token');
      }

      const response = await fetch(`https://aliexpress-1.onrender.com/api/wishlist/remove/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to remove from wishlist');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleWishlistAPI = createAsyncThunk(
  'wishlist/toggleWishlistAPI',
  async ({ productId, productData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token');
      }

      const response = await fetch('https://aliexpress-1.onrender.com/api/wishlist/toggle', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId, productData })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to toggle wishlist');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const clearWishlistAPI = createAsyncThunk(
  'wishlist/clearWishlistAPI',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token');
      }

      const response = await fetch('https://aliexpress-1.onrender.com/api/wishlist/clear', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to clear wishlist');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    // Local actions for immediate UI updates
    addToWishlist: (state, action) => {
      const { productId, productData } = action.payload;
      if (!state.items.some(item => item.productId === productId)) {
        // Create wishlist item with the structure expected by the backend
        const wishlistItem = {
          id: Date.now().toString(), // Temporary ID for UI
          productId: productId,
          title: productData.title,
          price: productData.price,
          imageUrl: productData.imageUrl || productData.image,
          stockQuantity: productData.stockQuantity,
          category: productData.category,
          addedAt: new Date().toISOString()
        };
        state.items.push(wishlistItem);
      }
    },
    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.productId !== productId);
    },
    toggleWishlist: (state, action) => {
      const { productId, productData } = action.payload;
      const index = state.items.findIndex(item => item.productId === productId);
      if (index > -1) {
        state.items.splice(index, 1);
      } else {
        // Add to wishlist
        const wishlistItem = {
          id: Date.now().toString(),
          productId: productId,
          title: productData.title,
          price: productData.price,
          imageUrl: productData.imageUrl || productData.image,
          stockQuantity: productData.stockQuantity,
          category: productData.category,
          addedAt: new Date().toISOString()
        };
        state.items.push(wishlistItem);
      }
    },
    clearWishlist: (state) => {
      state.items = [];
    },
    setWishlistModal: (state, action) => {
      state.isOpen = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Fetch wishlist
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        // Store the full items array from backend
        state.items = action.payload.items || [];
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Add to wishlist
      .addCase(addToWishlistAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToWishlistAPI.fulfilled, (state) => {
        state.loading = false;
        // Fetch updated wishlist after adding
        // The fetchWishlist will be called separately to update the state
      })
      .addCase(addToWishlistAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Remove from wishlist
      .addCase(removeFromWishlistAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromWishlistAPI.fulfilled, (state) => {
        state.loading = false;
        // Fetch updated wishlist after removing
        // The fetchWishlist will be called separately to update the state
      })
      .addCase(removeFromWishlistAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Toggle wishlist
      .addCase(toggleWishlistAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleWishlistAPI.fulfilled, (state, action) => {
        state.loading = false;
        // Fetch updated wishlist after toggling
        // The fetchWishlist will be called separately to update the state
      })
      .addCase(toggleWishlistAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Clear wishlist
      .addCase(clearWishlistAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearWishlistAPI.fulfilled, (state) => {
        state.loading = false;
        state.items = [];
      })
      .addCase(clearWishlistAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { 
  addToWishlist, 
  removeFromWishlist, 
  toggleWishlist, 
  clearWishlist,
  setWishlistModal,
  clearError
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
