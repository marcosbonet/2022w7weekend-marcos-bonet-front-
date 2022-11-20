import React from 'react';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { appStore } from './store/store';
import ReactDOM from 'react-dom/client';
import { RobotList } from './component/robots.list';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={appStore}>
            <RobotList />
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
