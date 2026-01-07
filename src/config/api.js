// src/config/api.js
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
  ENDPOINTS: {
    RESTAURANT: '/api/restaurant/',
    CATEGORIES: '/api/categories/',
    ITEMS: '/api/items/',
    UPLOAD_IMAGE: '/api/upload/',
  },
  TIMEOUT: 10000,
};

// Helper para construir URLs completas
export const buildUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};