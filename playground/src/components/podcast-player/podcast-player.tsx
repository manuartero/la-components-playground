import React from 'react';
import classnames from 'classnames';
import { ReactComponent as InProgressBar } from '../../assets/icons/playlist-progress-bar-in-progress.svg';
import './podcast-player.scss';
import { useKeyPressed } from 'hooks/use-key-pressed';

const GRAPH_LENGTH = 496;
const DELTA_PIXELS = (GRAPH_LENGTH / 100) * 3;

const addDeltaPixels = (element: HTMLElement, localStroke: number, animationLength: number): number => {
    localStroke += DELTA_PIXELS;
    if (element) {
        element.style.strokeDasharray = `${
            localStroke > animationLength ? animationLength : localStroke
        }px, ${GRAPH_LENGTH}px`;
    }
    return localStroke;
};

export type PodcastPlayerProps = {
    id: string;
    isFocused?: boolean;
    className?: string;
    title: string;
    isPlaying?: boolean;
    cover?: string;
    progressPercent?: number;
    onPause?: () => void;
    onPlay?: () => void;
    leftPressed?: () => void;
    rightPressed?: () => void;
};

function PodcastPlayer({
    className,
    title,
    isPlaying = false,
    isFocused = false,
    cover = '',
    progressPercent = 0,
    onPause,
    onPlay,
    leftPressed,
    rightPressed,
}: PodcastPlayerProps): JSX.Element {
    const podcastPlayerRef = React.useRef<HTMLDivElement>(null);
    const progressRef = React.useRef<number>(0);

    React.useEffect(() => {
        const mainPath = podcastPlayerRef.current?.getElementsByClassName('progress-bar')[0];
        const mainAnimationLength = (progressPercent * GRAPH_LENGTH) / 100;
        const animation = () => {
            progressRef.current = addDeltaPixels(mainPath as HTMLElement, progressRef.current, mainAnimationLength);

            if (progressRef.current < mainAnimationLength) {
                window.requestAnimationFrame(animation);
            }
        };

        window.requestAnimationFrame(animation);
    }, [progressPercent, podcastPlayerRef]);

    const inputCallback = React.useCallback(
        (evt: any): void => {
            if (isFocused) {
                if (evt.detail === window.SDK.keys.KEY_OK) {
                    if (isPlaying && onPause) {
                        onPause();
                    } else if (!isPlaying && onPlay) {
                        onPlay();
                    }
                } else if (evt.detail === window.SDK.keys.KEY_LEFT && leftPressed) {
                    leftPressed();
                } else if (evt.detail === window.SDK.keys.KEY_RIGHT && rightPressed) {
                    rightPressed();
                }
            }
        },
        [isFocused, isPlaying, onPause, onPlay, leftPressed, rightPressed]
    );

    useKeyPressed(inputCallback);

    return (
        <div className={classnames('SDK__podcast-player', className)} ref={podcastPlayerRef}>
            <div
                className={classnames('SDK__podcast-player__cover')}
                style={{ backgroundImage: `url(${cover})` }}
            ></div>
            <div className={classnames('SDK__podcast-player__title')}>{title}</div>
            <div className={classnames('SDK__podcast-player__progress')}>
                <InProgressBar />
            </div>
            <div className={classnames('SDK__podcast-player__controls')}>
                <span className={classnames('SDK__podcast-player__controls__time')}>00 : 00 : 22</span>
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
                                ['SDK__podcast-player__controls__play--focused']: isFocused,
                            })}
                            role='button'
                        />
                    </>
                )}
                <span className={classnames('SDK__podcast-player__controls__time-elapsed')}>01 : 09 : 11</span>
            </div>
        </div>
    );
}

export default PodcastPlayer;
