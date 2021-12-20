import React from 'react';
import './App.css';
import Playlist from 'components/playlist';
import './style/index.scss';

declare global {
    interface Window {
        SDK: any;
    }
}

function App() {
    return (
        <div className='App'>
            <header className='App-header'>
                <Playlist />
            </header>
        </div>
    );
}

export default App;
