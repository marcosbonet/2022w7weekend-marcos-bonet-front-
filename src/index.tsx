import React from 'react';

import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';

import './index.css';
import { appStore } from './store/store.js';
import { App } from './component/robots';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={appStore}>
            <App />
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
