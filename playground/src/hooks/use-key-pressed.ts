import React from 'react';

export const useKeyPressed = (eventHandler: React.EventHandler<any>) => {
    React.useEffect(() => {
        window.addEventListener('KEY_DOWN', eventHandler);
        const cleanup = () => {
            window.removeEventListener('KEY_DOWN', eventHandler);
        };
        return cleanup;
    }, [eventHandler]);
};
