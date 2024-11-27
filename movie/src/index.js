import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fortawesome/fontawesome-free/css/all.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from '~/components/GlobalStyle';
import { BrowserRouter } from 'react-router-dom';
import ShowtimeSelection from './ShowtimeSContext';
import Url from './UseContext';
import { store } from './redux/store'
import { Provider } from 'react-redux';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ShowtimeSelection>
            <Url>
            <Provider store = {store}>
                    <GlobalStyle>
                        <App />
                    </GlobalStyle>
            </Provider>
            </Url>
        </ShowtimeSelection>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
