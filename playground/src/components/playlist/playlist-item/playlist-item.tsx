import * as React from 'react';
import './playlist-item.scss';
import classnames from 'classnames';
import { toHHMMSS } from '../../../utils/seconds';
import { leadingZero } from '../../../utils/numbers';

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
}: PlayListItemProps) => {
    const [isShowingInfo, setIsShowingInfo] = React.useState(false);
    const [focusedElement, setFocusedElement] = React.useState<FocusedElement>(FocusedElement.PLAY_BUTTON);

    React.useEffect(() => {
        if (!isFocused) {
            setIsShowingInfo(false);
        }
    }, [isFocused]);

    const alreadyStarted = progressInSeconds > 0;

    const isPlayButtonFocused = isFocused && focusedElement == FocusedElement.PLAY_BUTTON;

    const isInfoButtonFocused = isFocused && focusedElement == FocusedElement.INFO_BUTTON;

    const duration = () => {
        const { hh, mm, ss } = toHHMMSS(durationInSeconds);
        if (hh > 0) {
            return `${leadingZero(hh)} hr ${leadingZero(mm)} mins`;
        }
        return `${leadingZero(mm)} mins ${leadingZero(ss)} segs`;
    };

    const handleInfo = () => {
        setIsShowingInfo(!isShowingInfo);
    };

    return (
        <div key={id} className='SDK__playlist-item' data-test-id={`playlist-item-${id}`}>
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
                        <div
                            className={classnames('SDK__playlist-item__header__actions__pause', {
                                ['SDK__playlist-item__header__actions__pause--focused']: isPlayButtonFocused,
                            })}
                            role='button'
                            onClick={onPause}
                        ></div>
                    ) : (
                        <div
                            className={classnames('SDK__playlist-item__header__actions__play', {
                                ['SDK__playlist-item__header__actions__play--focused']: isPlayButtonFocused,
                            })}
                            role='button'
                            onClick={onPlay}
                        ></div>
                    )}
                    {isShowingInfo ? (
                        <div
                            className={classnames('SDK__playlist-item__header__actions__close', {
                                ['SDK__playlist-item__header__actions__close--focused']: isInfoButtonFocused,
                            })}
                            role='button'
                            onClick={handleInfo}
                        ></div>
                    ) : (
                        <div
                            className={classnames('SDK__playlist-item__header__actions__info', {
                                ['SDK__playlist-item__header__actions__info--focused']: isInfoButtonFocused,
                            })}
                            role='button'
                            onClick={handleInfo}
                        ></div>
                    )}
                </div>
            </div>
            {isShowingInfo && (
                <div className='SDK__playlist-item__description'>
                    <div>{description}</div>
                </div>
            )}
        </div>
    );
};

export default PlaylistItem;
