/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import './playlist-item.css';

export interface PlayListItemProps {
    key: string;
    thumbnail: string;
    title: string;
    description: string;
    durationInSeconds: number;
    progressInSeconds: number;
    isPlaying: boolean;
    onPlay: () => void;
    onPause: () => void;
}

const PlaylistItem = ({
    key,
    thumbnail,
    title,
    description,
    durationInSeconds,
    progressInSeconds,
    isPlaying,
    onPlay,
    onPause,
}: PlayListItemProps) => {
    return (
        <div key={key} className='SDK-playlist-item' data-test-id={`playlist-item-${key}`}>
            <img src={thumbnail} />
            <h3>{title}</h3>
            <p>{description}</p>
            <p>{durationInSeconds}</p>
            <p>{progressInSeconds}</p>
            <p>{isPlaying}</p>
            <button onClick={onPlay}>Play</button>
            <button onClick={onPause}>Pause</button>
        </div>
    );
};

export default PlaylistItem;
