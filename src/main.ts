import './assets/main.css';
import 'element-plus/dist/index.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { AxiosClientPlugin, SilentAxiosClientPlugin } from './plugins/axiosClientPlugin';
import { onHttpError } from '@/service/client';

const app = createApp(App);
app.use(router).use(AxiosClientPlugin, {
  baseURL: 'http://localhost:8089',
  onHttpError,
}).use(SilentAxiosClientPlugin, {
  baseURL: 'http://localhost:8089',
  onHttpError,
});

app.mount('#app');
