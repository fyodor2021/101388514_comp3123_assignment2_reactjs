import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App.js'
import { BrowserRouter } from 'react-router-dom'
import { EmployeeProvider } from './context/EmployeeContext.js';
import { UserProvider } from './context/UserContext.js';
const el = document.getElementById('root')
const root = ReactDOM.createRoot(el)

root.render(
    <React.StrictMode>
        <EmployeeProvider>
            <UserProvider>
                    <App />
            </UserProvider>
        </EmployeeProvider>
    </React.StrictMode>
)