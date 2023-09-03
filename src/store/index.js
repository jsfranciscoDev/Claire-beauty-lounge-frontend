import user from "../api/component/user.js";
import { defineStore } from 'pinia';

export const store = defineStore({
  id: 'store',
  state: () => ({
    user: [],
    services: [],
    products: [],
    staff: [],
  }),
  actions: {
    async login(payload) {
      try {
        const response = await user.login(payload);
        if (response.data.message == 'success') {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem('authenticated', true)
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});
