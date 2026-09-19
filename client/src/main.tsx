import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.js' // .tsx files can be imported with .js in Vite
import './index.css'
import 'sonner/dist/styles.css'
import axios from 'axios'
import { API_URL } from './config/api'

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

axios.defaults.baseURL = API_URL;

// Setup axios interceptor to attach token to all requests
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token; // The backend authenticate.js uses exactly req.headers.authorization
  }
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const code = error?.response?.data?.code;
    if (status === 403 && (code === 'TOKEN_EXPIRED' || code === 'TOKEN_INVALID')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (!window.location.pathname.includes('/admin/login')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
