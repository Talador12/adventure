import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home';
import './styles.css';

// Dev secrets are fetched in Home.tsx for local development only

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);
