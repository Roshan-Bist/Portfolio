import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.js' // .tsx files can be imported with .js in Vite
import './index.css'
import 'sonner/dist/styles.css'
import axios from 'axios'

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Setup axios interceptor to attach token to all requests
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token; // The backend authenticate.js uses exactly req.headers.authorization
  }
  return config;
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
