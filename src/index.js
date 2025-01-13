import React from 'react'; // Optional in React 18+ (if using the new JSX transform)
import ReactDOM from 'react-dom/client';
import './index.css'; // Optional (if you're using global styles)
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode> {/* Optional but recommended */}
    <App />
  </React.StrictMode>
);