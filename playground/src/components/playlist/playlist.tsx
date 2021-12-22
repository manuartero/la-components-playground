import React from 'react';
import classnames from 'classnames';
import './playlist.scss';
import { useKeyPressed } from '../../hooks/use-key-pressed';
import { useEffectDebugger } from 'hooks/use-effect-debugger';

export type PlaylistProps = {
    id: string;
    children: React.ReactElement[];
    focused: boolean;
    defaultFocus?: number;
    className?: string;
    visibleRows?: number;
    rowSeparation?: number;
    onFocusedRowChangedEnd?: () => void;
};

interface Size {
    width: number;
    height: number;
}

function Playlist({
    children,
    focused,
    className,
    defaultFocus = 0,
    visibleRows = 5,
    rowSeparation = 51,
    onFocusedRowChangedEnd,
}: PlaylistProps): JSX.Element {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [isTransitionActive, setTransitionActive] = React.useState(false);
    const [focusedRow, setFocusedRow] = React.useState(defaultFocus);
    const [rowsSizingRect, setRowsSizingRect] = React.useState<Size>({
        width: 0,
        height: 0,
    });

    /* useLayoutEffect(): wait for children to be render */
    React.useLayoutEffect(() => {
        if (containerRef.current && (rowsSizingRect.width === 0 || rowsSizingRect.height === 0)) {
            requestAnimationFrame(() => {
                const element = containerRef.current?.childNodes[0] as HTMLDivElement;
                element &&
                    setRowsSizingRect({
                        width: element?.getBoundingClientRect()?.width || 0,
                        height: element?.getBoundingClientRect()?.height || 0,
                    });
            });
        }
    }, [rowsSizingRect]);

    const transitionEndHandler = React.useCallback(() => {
        onFocusedRowChangedEnd && onFocusedRowChangedEnd();
        setTransitionActive(false);
    }, [onFocusedRowChangedEnd]);

    const translateRows = React.useCallback(
        (nextRow: number) => {
            if (rowsSizingRect.height > 0) {
                setTransitionActive(true);
                const scroll = (rowsSizingRect.height + rowSeparation) * (nextRow > 1 ? nextRow - 1 : 0);

                const defineOpacity = (row: number) => {
                    if (nextRow === 0) {
                        if (row >= nextRow && row < nextRow + visibleRows - 2) {
                            return 1;
                        } else if (row < nextRow + visibleRows - 1) {
                            return 0.8;
                        } else if (row < nextRow + visibleRows) {
                            return 0.6;
                        }
                        return 0;
                    } else {
                        if (row >= nextRow - 1 && row < nextRow + visibleRows - 3) {
                            return 1;
                        } else if (row < nextRow + visibleRows - 2) {
                            return 0.8;
                        } else if (row < nextRow + visibleRows - 1) {
                            return 0.6;
                        }
                        return 0;
                    }
                };

                containerRef.current?.childNodes.forEach((child: ChildNode, index: number) => {
                    const element = child as HTMLDivElement;
                    const opacity = defineOpacity(index);
                    element.style.opacity = `${opacity}`;
                    element.style.top = `${-scroll}px`;
                });
                scroll <= 0 && transitionEndHandler();
            }
            setFocusedRow(nextRow);
        },
        [visibleRows, rowsSizingRect, rowSeparation, transitionEndHandler]
    );

    useEffectDebugger(() => {
        translateRows(+defaultFocus); // secure defaultFocus is a number
    }, [defaultFocus, visibleRows, rowsSizingRect, rowSeparation, transitionEndHandler]);

    const inputCallback = React.useCallback(
        (evt) => {
            if (focused) {
                let newIndex = focusedRow;
                switch (evt.detail) {
                    // eslint-disable-next-line no-undef
                    case window.SDK.keys.KEY_DOWN:
                        if (++newIndex >= children.length) {
                            newIndex = children.length - 1;
                        }
                        break;
                    // eslint-disable-next-line no-undef
                    case window.SDK.keys.KEY_UP:
                        if (--newIndex < 0) {
                            newIndex = 0;
                        }
                        break;
                    default:
                        break;
                }
                if (newIndex !== focusedRow) {
                    translateRows(newIndex);
                }
            }
        },
        [focused, translateRows, children.length, focusedRow]
    );

    useKeyPressed(inputCallback);

    const onTransitionEndHandler = (event: React.TransitionEvent<HTMLDivElement>) => {
        if (event.target === containerRef?.current?.childNodes.item(0)) {
            transitionEndHandler();
        }
    };

    return (
        <div
            className={classnames('SDK__playlist', className)}
            ref={containerRef}
            onTransitionEnd={onTransitionEndHandler}
        >
            {children.map((child, index) =>
                React.cloneElement(child, {
                    isFocused: focused && !isTransitionActive && index === focusedRow,
                    className: `SDK__playlist__row ${child.props?.className ? child.props?.className : ''}${
                        index < focusedRow ? ' hidden' : ''
                    }${index > focusedRow + visibleRows ? ' hidden' : ''}${index === focusedRow ? ' focus' : ''}`,
                    key: `${child.props?.id}-${index}`,
                    // onTransitionEnd: onTransitionEndHandler,
                    style: {
                        ...child.props?.style,
                        marginBottom: rowSeparation,
                    },
                })
            )}
        </div>
    );
}

export default Playlist;
