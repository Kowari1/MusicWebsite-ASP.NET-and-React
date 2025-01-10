import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { PlayerProvider } from './components/PlayerContext';

const baseUrl = document.getElementsByTagName('base')[0]?.getAttribute('href') || '/';
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <PlayerProvider>
        <BrowserRouter basename={baseUrl}>
            <App />
        </BrowserRouter>
    </PlayerProvider>
);

// Для работы офлайн можно изменить unregister() на register()
serviceWorkerRegistration.unregister();

// Для измерения производительности передайте функцию в reportWebVitals
reportWebVitals();