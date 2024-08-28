import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import App from './App.jsx'
import './index.css'
import Login from './pages/userPages/Login.jsx';
import Home from './pages/Home.jsx';
import Signup from './pages/userPages/Signup.jsx';
import NewList from './pages/listPages/NewList.jsx';
import AllLists from './pages/listPages/AllLists.jsx';
import List from './pages/listPages/List.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/signup', element: <Signup /> },
            { path: '/login', element: <Login /> },
            { path: '/:username/new-list', element: <NewList />},
            { path: '/:username/lists', element: <AllLists />},
            { path: '/:username/lists/:listId', element: <List />},
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>
);