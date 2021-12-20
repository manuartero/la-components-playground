/* eslint-disable no-undef */
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

SDK.setListener('APP', onAppMessage);

function stop() {
    SDK.sendMessage({
        type: 'APP',
        action: 'STOPPED',
        params: { setAppToReload: true },
    });
}

function sendEvent(eventName, data) {
    data = data ? { detail: data } : {};
    var newEvt = new CustomEvent(eventName, data);
    window.dispatchEvent(newEvt);
}

function onKeys(ev) {
    if (ev.event === 'KEY_DOWN') {
        sendEvent(ev.event, ev.data.keyCode);
    }
}

function onBrowserKeys(event) {
    onKeys({
        event: 'KEY_DOWN',
        data: {
            keyCode: event.keyCode,
        },
    });
}

window.addEventListener('keydown', onBrowserKeys);

function onAppMessage(ev) {
    switch (ev.event) {
        case 'START':
            window.removeEventListener('keydown', onBrowserKeys);
            SDK.sendMessage({ type: 'APP', action: 'STARTED' });
            SDK.setListener('KEYS', onKeys);
            SDK.sendMessage({
                type: 'KEYS',
                action: 'SUBSCRIBE',
                params: { keys: 'ALL' },
            });
            break;
        case 'STOP':
            stop();
            break;
        default:
            break;
    }
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
