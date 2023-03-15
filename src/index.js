import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css'
axios.defaults.baseURL='http://68.183.127.52:3000/'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
