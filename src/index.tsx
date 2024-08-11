import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PhotoProvider } from './contexts/PhotoContext';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <PhotoProvider>
    <App />
    </PhotoProvider>
  </React.StrictMode>
);
