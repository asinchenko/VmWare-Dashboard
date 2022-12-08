import React from 'react';
import ReactDOM from 'react-dom';
import {AuthContextProvider} from './contexts/AuthContext'
import './index.css'
import App from './App';
import {ContextProvider} from './contexts/ContextProvider';


ReactDOM.render(
    <AuthContextProvider>
        <ContextProvider>
            <App />
        </ContextProvider>
    </AuthContextProvider>
    ,document.getElementById('root'))
    