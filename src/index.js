import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css'

axios.defaults.baseURL='https://walrus-app-ovpy2.ondigitalocean.app/'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
