import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk para buscar produtos da API
export const fetchProducts = createAsyncThunk(
    'products/FETCH_PRODUCTS',
    async () => {
      const response = await axios.get('http://localhost:9000/products');
      return response.data;
    }
  );