import React from 'react';
import ReactDOM from 'react-dom';
import {AuthContextProvider} from './contexts/AuthContext'
import './index.css'
import App from './App';
import {ContextProvider} from './contexts/ContextProvider';
// import { registerLicense } from '@syncfusion/ej2-base';

// registerLicense('ORg4AjUWIQA/Gnt2VFhhQlJBfVpdX2RWfFN0RnNbdVxwflZHcC0sT3RfQF5jTXxUdkdhXX9adHdQQg==');

ReactDOM.render(
    <AuthContextProvider>
        <ContextProvider>
            <App />
        </ContextProvider>
    </AuthContextProvider>
    ,document.getElementById('root'))
    