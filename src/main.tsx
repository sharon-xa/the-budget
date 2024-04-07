import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import axios from 'axios'
import { getAuthToken } from './utils/auth.ts'

axios.defaults.baseURL = "http://localhost:8080";
// axios.defaults.baseURL = "https://the-budget-backend.onrender.com";
axios.defaults.headers.common['Authorization'] = getAuthToken();
axios.defaults.headers.post['Content-Type'] = 'application/json';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
