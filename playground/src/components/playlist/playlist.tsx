import React from 'react';
import classnames from 'classnames';
import './playlist.scss';
import { useKeyPressed } from '../../hooks/use-key-pressed';

export type PlaylistProps = {
    id: string;
    children: React.ReactElement[];
    focused: boolean;
    defaultFocus?: number;
    className?: string;
    visibleRows?: number;
    rowSeparation?: number;
    onFocusedLaneChangedEnd?: (i: number) => void;
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
    visibleRows = 3,
    rowSeparation = 51,
    onFocusedLaneChangedEnd,
}: PlaylistProps): JSX.Element {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const scrollOffset = React.useRef(0);
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
        onFocusedLaneChangedEnd && onFocusedLaneChangedEnd(focusedRow);
    }, [focusedRow, onFocusedLaneChangedEnd]);

    const translateRows = React.useCallback(
        (rowIndex: number) => {
            if (focused && rowsSizingRect.height > 0) {
                const scroll = (rowsSizingRect.height + rowSeparation) * rowIndex;
                const shouldScroll = scroll !== scrollOffset.current;
                scrollOffset.current = scroll;

                containerRef.current?.childNodes.forEach((child: ChildNode, index: number) => {
                    const element = child as HTMLDivElement;
                    const opacity =
                        index === rowIndex ? 1 : index > rowIndex && index < rowIndex + visibleRows ? 0.4 : 0;
                    element.style.opacity = `${opacity}`;
                    const scroll = (rowsSizingRect.height + rowSeparation) * index;
                    element.style.top = `${scroll - scrollOffset.current}px`;
                });
                !shouldScroll && transitionEndHandler();
            }
            setFocusedRow(rowIndex);
        },
        [focused, visibleRows, rowsSizingRect, rowSeparation, transitionEndHandler]
    );

    React.useEffect(() => {
        translateRows(defaultFocus);
    }, [defaultFocus, translateRows]);

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
        <div className={classnames('SDK__playlist', className)} ref={containerRef}>
            {children.map((child, index) =>
                React.cloneElement(child, {
                    isFocused: focused && index === focusedRow,
                    className: `SDK__playlist__row ${child.props?.className ? child.props?.className : ''}${
                        index < focusedRow ? ' hidden' : ''
                    }${index > focusedRow + visibleRows ? ' hidden' : ''}${index === focusedRow ? ' focus' : ''}`,
                    key: `${child.props?.id}-${index}`,
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
