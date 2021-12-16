import React from 'react';
import './App.css';
import PlaylistItem from 'components/playlist-item';

declare global {
    interface Window {
        SDK: any;
    }
}

function App() {
    return (
        <div className='App'>
            <header className='App-header'>
                <PlaylistItem />
            </header>
        </div>
    );
}

export default App;
