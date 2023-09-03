import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia'; // Import createPinia

const app = createApp(App);

app.use(router);

const pinia = createPinia();
app.use(pinia);



app.mount('#app');
