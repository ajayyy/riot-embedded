import {config} from './config.js';
import React from 'react';
import ReactDOM from 'react-dom';
import Client from './components/client.jsx';
require('./styles/main.scss');

ReactDOM.render(
    <Client {...{...config, ...getConfigFromURL()}} />,
    document.getElementById('root')
);

function getConfigFromURL() {
    if (!config.urlParameters) return {};

    const hash = window.location.hash.substr(1);
    const params = hash.split('&').reduce((acc, param) => {
        const [key, value] = param.split('=');
        acc[key] = parseValue(value);
        return acc;
    }, {});
    
    if (hash.startsWith("filler")) {
        params.roomId = "!wtebjlmNhTNYYsZJxU:ajay.app";
    }

    return params;
}

function parseValue(value) {
    if (value === 'true') {
        return true;
    } else if (value === 'false') {
        return false;
    } else if (Number.isFinite(value)) {
        return Number(value);
    }
    return decodeURIComponent(value);
}
