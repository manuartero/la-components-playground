import * as React from 'react';
import './playlist-item.scss';
import classnames from 'classnames';
import { toHHMMSS } from '../../../utils/seconds';
import { leadingZero } from '../../../utils/numbers';
import { ReactComponent as ProgressBar } from './progress-bar.svg';

enum FocusedElement {
    PLAY_BUTTON,
    INFO_BUTTON,
}

export interface PlayListItemProps {
    id: string;
    thumbnail?: string;
    type: 'with-thumbnail' | 'no-thumbnail';
    title: string;
    description: string;
    durationInSeconds: number;
    progressInSeconds: number;
    isPlaying: boolean;
    isFocused: boolean;
    onPlay: () => void;
    onPause: () => void;
    leftPressed?: () => void;
    rightPressed?: () => void;
}

const PlaylistItem = ({
    id,
    thumbnail,
    title,
    description,
    durationInSeconds,
    progressInSeconds,
    isPlaying,
    isFocused,
    onPlay,
    onPause,
    leftPressed,
    rightPressed,
}: PlayListItemProps) => {
    const [isShowingInfo, setIsShowingInfo] = React.useState(false);
    const [focusedElement, setFocusedElement] = React.useState<FocusedElement>(FocusedElement.PLAY_BUTTON);

    React.useEffect(() => {
        if (!isFocused) {
            setIsShowingInfo(false);
        }
    }, [isFocused]);

    const isPlayButtonFocused = React.useCallback(
        () => isFocused && focusedElement == FocusedElement.PLAY_BUTTON,
        [focusedElement, isFocused]
    );

    const isInfoButtonFocused = React.useCallback(
        () => isFocused && focusedElement == FocusedElement.INFO_BUTTON,
        [focusedElement, isFocused]
    );

    const inputCallback = React.useCallback(
        (evt: any): void => {
            if (isFocused) {
                if (evt.detail === window.SDK.keys.KEY_OK) {
                    if (isPlaying && isPlayButtonFocused()) {
                        onPause();
                    } else if (!isPlaying && isPlayButtonFocused()) {
                        onPlay();
                    } else if (isInfoButtonFocused()) {
                        setIsShowingInfo((old) => !old);
                    }
                } else if (evt.detail === window.SDK.keys.KEY_LEFT) {
                    if (isPlayButtonFocused()) {
                        leftPressed && leftPressed();
                    } else if (isInfoButtonFocused()) {
                        setFocusedElement(FocusedElement.PLAY_BUTTON);
                    }
                } else if (evt.detail === window.SDK.keys.KEY_RIGHT) {
                    if (isPlayButtonFocused()) {
                        setFocusedElement(FocusedElement.INFO_BUTTON);
                    } else if (isInfoButtonFocused()) {
                        rightPressed && rightPressed();
                    }
                }
            }
        },
        [isFocused, isPlaying, isPlayButtonFocused, isInfoButtonFocused, onPause, onPlay, leftPressed, rightPressed]
    );

    React.useEffect(() => {
        window.addEventListener('KEY_DOWN', inputCallback);
        return () => {
            window.removeEventListener('KEY_DOWN', inputCallback);
        };
    }, [inputCallback]);

    const alreadyStarted = progressInSeconds > 0;

    const duration = () => {
        const { hh, mm, ss } = toHHMMSS(durationInSeconds);
        if (hh > 0) {
            return `${leadingZero(hh)} hr ${leadingZero(mm)} mins`;
        }
        return `${leadingZero(mm)} mins ${leadingZero(ss)} segs`;
    };

    return (
        <div
            key={id}
            className={classnames('SDK__playlist-item', {
                ['SDK__playlist-item--focused']: isFocused,
                ['SDK__playlist-item--showing-info']: isShowingInfo,
            })}
            data-test-id={`playlist-item-${id}`}
        >
            <div className='SDK__playlist-item__header'>
                <div className='SDK__playlist-item__header__thumbnail'>
                    <div
                        className='SDK__playlist-item__header__thumbnail__img'
                        style={{ backgroundImage: `url(${thumbnail})` }}
                    ></div>
                    <div
                        className={classnames('SDK__playlist-item__header__thumbnail__wave', {
                            ['SDK__playlist-item__header__thumbnail__wave--hidden']: !isPlaying,
                        })}
                    ></div>
                </div>
                <div className='SDK__playlist-item__header__info'>
                    <h3>{title}</h3>
                    <p>{duration()}</p>
                    <p>{progressInSeconds}</p>
                </div>
                <div className='SDK__playlist-item__header__actions'>
                    {isPlaying ? (
                        // pause
                        <>
                            <div
                                className={classnames('SDK__playlist-item__header__actions__pause', {
                                    ['SDK__playlist-item__header__actions__pause--focused']: isPlayButtonFocused(),
                                })}
                                role='button'
                            ></div>
                        </>
                    ) : (
                        // play
                        <>
                            <div
                                className={classnames('SDK__playlist-item__header__actions__play', {
                                    ['SDK__playlist-item__header__actions__play--focused']: isPlayButtonFocused(),
                                })}
                                role='button'
                            ></div>
                        </>
                    )}
                    {isShowingInfo ? (
                        // close
                        <div
                            className={classnames('SDK__playlist-item__header__actions__close', {
                                ['SDK__playlist-item__header__actions__close--focused']: isInfoButtonFocused(),
                            })}
                            role='button'
                        ></div>
                    ) : (
                        // info
                        <div
                            className={classnames('SDK__playlist-item__header__actions__info', {
                                ['SDK__playlist-item__header__actions__info--focused']: isInfoButtonFocused(),
                            })}
                            role='button'
                        ></div>
                    )}
                </div>
            </div>
            <div
                className={classnames('SDK__playlist-item__description', {
                    ['SDK__playlist-item__description--showing-info']: isShowingInfo,
                })}
            >
                <div>{description}</div>
            </div>
        </div>
    );
};

export default PlaylistItem;
