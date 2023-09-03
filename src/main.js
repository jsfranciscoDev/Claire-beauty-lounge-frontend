import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
// import store from './store'; // Your Vuex store (if you have one)
import { createPinia } from 'pinia'; // Import createPinia

const app = createApp(App);

app.use(router);

// Create and use the Pinia store
const pinia = createPinia();
app.use(pinia);

// // If you still want to use Vuex alongside Pinia, you can also use this line:
// app.use(store);

app.mount('#app');
