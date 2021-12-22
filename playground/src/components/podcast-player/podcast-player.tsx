import React from 'react';
import classnames from 'classnames';
import { ReactComponent as InProgressBar } from '../../assets/icons/playlist-progress-bar-in-progress.svg';
import './podcast-player.scss';

export type PodcastPlayerProps = {
    id: string;
    isFocused?: boolean;
    className?: string;
    title: string;
    isPlaying?: boolean;
};

function PodcastPlayer({ className, title, isPlaying = false, isFocused = false }: PodcastPlayerProps): JSX.Element {
    return (
        <div className={classnames('SDK__podcast-player', className)}>
            <div className={classnames('SDK__podcast-player__cover')}></div>
            <div className={classnames('SDK__podcast-player__title')}>{title}</div>
            <div className={classnames('SDK__podcast-player__progress')}>
                <InProgressBar />
            </div>
            <div className={classnames('SDK__podcast-player__controls')}>
                <span className={classnames('SDK__podcast-player__controls__time')}></span>
                {isPlaying ? (
                    // pause
                    <>
                        <div
                            className={classnames('SDK__podcast-player__controls__pause', {
                                ['SDK__podcast-player__controls__pause--focused']: isFocused,
                            })}
                            role='button'
                        />
                    </>
                ) : (
                    // play
                    <>
                        <div
                            className={classnames('SDK__podcast-player__controls__play', {
                                ['SDK__podcast-player__controls--focused']: isFocused,
                            })}
                            role='button'
                        />
                    </>
                )}
                <span className={classnames('SDK__podcast-player__controls__time-elapsed')}></span>
            </div>
        </div>
    );
}

export default PodcastPlayer;
