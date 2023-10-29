import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia'; // Import createPinia  
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App);

app.use(router);

const pinia = createPinia();
app.use(pinia);
app.use(VueSweetalert2);
app.mount('#app');

