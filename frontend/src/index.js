import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import HomePage from './pages/HomePage';
import HistoryPage from './pages/HistoryPage'
import FaqPage from './pages/FaqPage'
import NewsPage from './pages/NewsPage'
import { UserProvider } from './pages/auth/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([{
  path: '/',
  element: <App/>,
},
{
  path: '/login',
  element: <LoginPage/>,
},
{
  path: '/register',
  element: <RegisterPage/>,
},
{
  path: '/home',
  element: <HomePage/>,
},
{
  path: '/news',
  element: <NewsPage/>,
},
{
  path: '/faq',
  element: <FaqPage/>,
},
{
  path: '/history/:email',
  element: <HistoryPage/>,
},
])

root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);