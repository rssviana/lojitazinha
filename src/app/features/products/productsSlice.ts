// src/features/products/productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Product {
    id: string;
    index: number;
    guid: string;
    isActive: boolean;
    isFavorited: boolean;
    price_in_cents: number;
    picture: string;
    name: string;
    description: string;
    created_at: string;
    tags: string[];
}

interface PaginationResponse {
    current: number;
    per_page: number;
    totalItems: number,
    totalpages: number
    data: Product[];
    status: string;
    error: string;
}

// Define the initial state using that type
const initialState: PaginationResponse = {
    current: 1,
    per_page: 10,
    data: [],
    status: 'idle',
    error: '',
    totalItems: 0,
    totalpages: 0
}


export const fetchProducts = createAsyncThunk(
    'products/FETCH_PRODUCTS',
    async ({ page = 1, per_page = 10 }: { page?: number, per_page?: number }) => {
      const response: PaginationResponse = await axios.get(`http://localhost:9000/products?_page=${page}&_per_page=${per_page}`);
      return response;
    }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.data.data;
        state.current = action.meta?.arg?.page ? action.meta?.arg?.page : 1; 
        state.per_page = action.meta.arg.per_page ? action.meta.arg.per_page : 10;
        state.totalItems = action.payload.data.items;
        state.totalpages = action.payload.data.pages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || '';
      });
  },
});

export default productsSlice.reducer;