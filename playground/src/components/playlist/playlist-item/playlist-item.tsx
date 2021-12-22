import * as React from 'react';
import './playlist-item.scss';
import classnames from 'classnames';
import { toHHMMSS } from 'utils/seconds';
import { leadingZero } from 'utils/numbers';
import { ReactComponent as ProgressBar } from './progress-bar.svg';
import { useEffectDebugger } from 'hooks/use-effect-debugger';
import { useKeyPressed } from 'hooks/use-key-pressed';

const CONSIDER_AS_IN_PROGRESS_TRESHOLD = 20;
const CONSIDER_AS_FINISHED_TRESHOLD = 20;

enum FocusElements {
    PLAY_BUTTON,
    INFO_BUTTON,
}

const durationWithTwoUnits = (seconds: number) => {
    const { hh, mm, ss } = toHHMMSS(seconds);
    if (hh > 0) {
        return `${leadingZero(hh)} hr ${leadingZero(mm)} min`;
    }
    return `${leadingZero(mm)} min ${leadingZero(ss)} seg`;
};

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
    style?: React.CSSProperties;
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
    style,
}: PlayListItemProps) => {
    const [isShowingInfo, setIsShowingInfo] = React.useState(false);
    const [focusedElement, setFocusedElement] = React.useState<FocusElements>(FocusElements.PLAY_BUTTON);

    React.useEffect(() => {
        if (!isFocused) {
            setIsShowingInfo(false);
        }
    }, [isFocused]);

    const isPlayButtonFocused = React.useCallback(
        () => isFocused && focusedElement == FocusElements.PLAY_BUTTON,
        [focusedElement, isFocused]
    );

    const isInfoButtonFocused = React.useCallback(
        () => isFocused && focusedElement == FocusElements.INFO_BUTTON,
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
                        setFocusedElement(FocusElements.PLAY_BUTTON);
                    }
                } else if (evt.detail === window.SDK.keys.KEY_RIGHT) {
                    if (isPlayButtonFocused()) {
                        setFocusedElement(FocusElements.INFO_BUTTON);
                    } else if (isInfoButtonFocused()) {
                        rightPressed && rightPressed();
                    }
                }
            }
        },
        [isFocused, isPlaying, isPlayButtonFocused, isInfoButtonFocused, onPause, onPlay, leftPressed, rightPressed]
    );

    useKeyPressed(inputCallback);

    const progressStatus = () => {
        const isAlreadyFinished = progressInSeconds + CONSIDER_AS_FINISHED_TRESHOLD >= durationInSeconds;
        const isAlreadyStarted = progressInSeconds > CONSIDER_AS_IN_PROGRESS_TRESHOLD;
        const totalTime = durationWithTwoUnits(durationInSeconds);
        const timeLeft = durationWithTwoUnits(durationInSeconds - progressInSeconds);

        if (isAlreadyFinished) {
            return (
                <div className='SDK__playlist-item__header__info__progress__status'>
                    <div className='SDK__playlist-item__header__info__progress__status__check-icon' />
                    <p>Reproducido</p>
                </div>
            );
        }
        if (isAlreadyStarted) {
            return <div className='SDK__playlist-item__header__info__progress__status'>{`Quedan ${timeLeft}`}</div>;
        }
        return <div className='SDK__playlist-item__header__info__progress__status'>{totalTime}</div>;
    };

    return (
        <div
            id={id}
            className={classnames('SDK__playlist-item', {
                ['SDK__playlist-item--focused']: isFocused,
                ['SDK__playlist-item--showing-info']: isShowingInfo,
            })}
            style={style}
            data-test-id={`playlist-item-${id}`}
        >
            <div className='SDK__playlist-item__header'>
                <div className='SDK__playlist-item__header__thumbnail'>
                    <div className='SDK__playlist-item__header__thumbnail__placeholder' />
                    <div
                        className='SDK__playlist-item__header__thumbnail__img'
                        style={{ backgroundImage: `url(${thumbnail})` }}
                    />
                    <div
                        className={classnames('SDK__playlist-item__header__thumbnail__wave', {
                            ['SDK__playlist-item__header__thumbnail__wave--hidden']: !isPlaying,
                        })}
                    />
                </div>
                <div className='SDK__playlist-item__header__info'>
                    <h3>{title}</h3>
                    <div className='SDK__playlist-item__header__info__progress'>{progressStatus()}</div>
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
                            />
                        </>
                    ) : (
                        // play
                        <>
                            <div
                                className={classnames('SDK__playlist-item__header__actions__play', {
                                    ['SDK__playlist-item__header__actions__play--focused']: isPlayButtonFocused(),
                                })}
                                role='button'
                            />
                        </>
                    )}
                    {isShowingInfo ? (
                        // close
                        <div
                            className={classnames('SDK__playlist-item__header__actions__close', {
                                ['SDK__playlist-item__header__actions__close--focused']: isInfoButtonFocused(),
                            })}
                            role='button'
                        />
                    ) : (
                        // info
                        <div
                            className={classnames('SDK__playlist-item__header__actions__info', {
                                ['SDK__playlist-item__header__actions__info--focused']: isInfoButtonFocused(),
                            })}
                            role='button'
                        />
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
