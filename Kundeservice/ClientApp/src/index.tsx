import 'bootstrap/dist/css/bootstrap.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createBrowserHistory} from "history";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') as string;
const history = createBrowserHistory({ basename: baseUrl });

// Get the application-wide store instance, prepopulating with state from the server where available.

ReactDOM.render(
        <Router history={history}>
            <App />
        </Router>
    ,
    document.getElementById('root'));

registerServiceWorker();