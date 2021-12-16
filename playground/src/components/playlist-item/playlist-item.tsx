import * as React from 'react';
import './playlist-item.scss';

export interface PlayListItemProps {
    id: string;
    thumbnail?: string;
    type: 'with-thumbnail' | 'no-thumbnail';
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
        <div key={id} className='SDK__playlist-item' data-test-id={`playlist-item-${id}`}>
            <div className='SDK__playlist-item__header'>
                <img className='SDK__playlist-item__header__thumbnail' src={thumbnail} />
                <div className='SDK__playlist-item__header__info'>
                    <h3>{title}</h3>
                    <p>{durationInSeconds}</p>
                    <p>{progressInSeconds}</p>
                </div>
                <div className='SDK__playlist-item__header__actions'>
                    <p>{isPlaying}</p>
                    <button onClick={onPlay}>Play</button>
                    <button onClick={onPause}>Pause</button>
                </div>
            </div>
            <div className='SDK__playlist-item__description'>
                <div>{description}</div>
            </div>
        </div>
    );
};

export default PlaylistItem;
