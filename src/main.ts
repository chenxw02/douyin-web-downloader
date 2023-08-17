import './assets/main.css';
import 'element-plus/dist/index.css';
import { createApp } from 'vue';
import App from './App.vue';
import { AxiosClientPlugin, SilentAxiosClientPlugin } from './plugins/axiosClientPlugin';
import { onHttpError } from '@/service/client';

const app = createApp(App);
app.use(AxiosClientPlugin, {
  baseURL: 'http://39.107.136.222:8089',
  onHttpError,
}).use(SilentAxiosClientPlugin, {
  baseURL: 'http://39.107.136.222:8089',
  onHttpError,
});

app.mount('#app');
