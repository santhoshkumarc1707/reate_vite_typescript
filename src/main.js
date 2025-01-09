import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { store } from "./Store/Store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { GoogleOAuthProvider } from "react-oauth-google";
const persistor = persistStore(store);
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(React.StrictMode, null,
    React.createElement(Provider, { store: store },
        React.createElement(PersistGate, { persistor: persistor },
            React.createElement(GoogleOAuthProvider, { clientId: '204216990208-docmh45et1fa715bjgdpiqmcaa2lj72o.apps.googleusercontent.com' },
                React.createElement(App, null))))));
