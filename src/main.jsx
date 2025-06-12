import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router'
import router from './Routes/Route.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import 'react-tooltip/dist/react-tooltip.css';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <StrictMode>
        <RouterProvider router={router} />
        <ToastContainer theme="dark" />
    </StrictMode>
  </AuthProvider>
);
