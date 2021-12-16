import * as React from 'react';
import './playlist-item.css';

export interface PlayListItemProps {
    id: string;
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
    id,
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
        <div key={id} className='SDK-playlist-item' data-test-id={`playlist-item-${id}`}>
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
