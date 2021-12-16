import React from 'react';

export const usePrevious = (value, initialValue) => {
    const ref = React.useRef(initialValue);
    React.useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};
