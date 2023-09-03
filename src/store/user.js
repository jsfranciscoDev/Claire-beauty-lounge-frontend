// pinia/store.js
import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    isAuthenticated: true, // Set to true when the user is logged in
  }),
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
  },
  // ... other mutations and actions for authentication
});
