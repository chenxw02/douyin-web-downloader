import './assets/base.css';
import 'element-plus/dist/index.css';
import { createApp } from 'vue';
import App from './App.vue';
import {
  AxiosClientPlugin,
  SilentAxiosClientPlugin,
} from './plugins/axiosClientPlugin';
import { onHttpError } from '@/service/client';

const isProduction = import.meta.env.PROD;

const baseURL = isProduction
  ? 'https://39.107.136.222:8089' // 使用生产环境的 baseURL
  : 'http://localhost:8089'; // 使用开发环境的 baseURL

const app = createApp(App);
app
  .use(AxiosClientPlugin, {
    baseURL: '',
    onHttpError,
  })
  .use(SilentAxiosClientPlugin, {
    baseURL: '',
    onHttpError,
  });

app.mount('#app');
