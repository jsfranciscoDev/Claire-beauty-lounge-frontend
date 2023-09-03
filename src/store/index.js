import user from "../api/component/user.js";
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router'; // Import route-related functions

export const store = defineStore({
  id: 'store',
  state: () => ({
    user: [],
    services: [],
    products: [],
    staff: [],
    isAuthenticated: false,
  }),
  actions: {
    async login(payload) {
      try {
        const response = await user.login(payload);
        this.isAuthenticated = true;
        if (response.data.message == 'success') {
          this.isAuthenticated = true;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});
