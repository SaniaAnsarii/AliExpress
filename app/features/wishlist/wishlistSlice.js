import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  items: [], 
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
    // Keep local actions for immediate UI updates
    addToWishlist: (state, action) => {
      const productId = action.payload;
      if (!state.items.some(item => item.id === productId)) {
        state.items.push({ id: productId });
      }
    },
    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.id !== productId);
    },
    toggleWishlist: (state, action) => {
      const productId = action.payload;
      const index = state.items.findIndex(item => item.id === productId);
      if (index > -1) {
        state.items.splice(index, 1);
      } else {
        state.items.push({ id: productId });
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
        state.items = action.payload.items;
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
