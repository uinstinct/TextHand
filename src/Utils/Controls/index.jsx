import {
    useReducer, createContext, useContext, useEffect,
} from 'react';

import { initialState, lazyInit } from './init';
import reducer from './reducer';

// eslint-disable-next-line import/no-mutable-exports
let copyControls = {
    ...initialState,
};

const ControlContext = createContext();

let controlTimer;
export function ControlProvider({ children }) {
    const contextValue = useReducer(reducer, initialState, lazyInit);

    useEffect(() => {
        copyControls = { ...contextValue[0] };
        clearTimeout(controlTimer);
        controlTimer = setTimeout(() => {
            const copyControlsArray = Object.entries(copyControls);

            copyControlsArray.forEach(([key, value]) => {
                localStorage.setItem(key, value);
            });
            localStorage.removeItem('fontFamily');
        }, 650);
    }, [contextValue]);

    return (
        <ControlContext.Provider value={contextValue}>
            {children}
        </ControlContext.Provider>
    );
}

export function useControl() {
    const contextValue = useContext(ControlContext);
    return contextValue;
}

export { copyControls };