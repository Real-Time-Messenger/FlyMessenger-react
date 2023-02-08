import React, {Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import '../i18n'
import {Provider} from "react-redux";
import {store} from './stores/store';
import {WebSocketProvider} from "./hoc/WebSocketProvider";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Suspense fallback={<div>Loading...</div>}>
            <Provider store={store}>
                <WebSocketProvider>
                    <App/>
                </WebSocketProvider>
            </Provider>
        </Suspense>
    </React.StrictMode>
)
