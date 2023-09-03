import user from "../api/component/user.js";
import { defineStore } from 'pinia';

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
    async login() {
      try {
        await user.login().then((response) => {
          console.log(response);
        });
      } catch (error) {}
    },
  },
});
