/**
 * Created by ivan on 03.06.18.
 */

import React from 'react';
import ReactDom from 'react-dom';
import App from './App.jsx';
import createStore from './store/store';

const store = createStore();

ReactDom.render(
            <App />,
    document.getElementById('app'));