import React, {Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import '../i18n'
import {Provider} from "react-redux";
import {store} from './stores/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Suspense fallback={<div>Loading...</div>}>
            <Provider store={store}>
                <App/>
            </Provider>
        </Suspense>
    </React.StrictMode>
)
