import axios from 'axios';
import type { AxiosResponse, AxiosRequestConfig } from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // 替换为实际的 API 地址

// 定义请求结果的数据类型，可以根据需要进行修改
interface ApiResponse<T> {
  data: T;
}

// 封装 GET 请求
async function get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await axios.get(`${API_BASE_URL}${url}`, config);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    // 在这里添加你的错误处理逻辑，可以抛出异常或者返回默认值
    throw error; // 抛出异常，让调用方处理
    // 或者返回一个默认值
    // return defaultValue;
  }
}

// 封装 POST 请求
async function post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await axios.post(`${API_BASE_URL}${url}`, data, config);
    return response.data.data;
  } catch (error) {
    console.error("Error making POST request:", error);
    // 在这里添加你的错误处理逻辑，可以抛出异常或者返回默认值
    throw error; // 抛出异常，让调用方处理
    // 或者返回一个默认值
    // return defaultValue;
  }
}

export const api = {
  get,
  post,
};
