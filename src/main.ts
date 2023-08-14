import './assets/main.css';
import 'element-plus/dist/index.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { AxiosClientPlugin } from './plugins/axiosClientPlugin';
import { onHttpError } from '@/service/client';

const app = createApp(App);
app.use(router).use(AxiosClientPlugin, {
  baseURL: 'http://localhost:8088',
  onHttpError,
});

app.mount('#app');
