import {
    useReducer, createContext, useContext, useEffect
} from 'react';

import { writeControls } from 'Utils/db/controls';
import { initialState, onMount } from './init';
import reducer from './reducer';

// eslint-disable-next-line import/no-mutable-exports
let copyControls = {
    ...initialState,
};

const ControlContext = createContext();

let controlTimer;
export function ControlProvider({ children, }) {
    const contextValue = useReducer(reducer, initialState);

    const [state, dispatch] = contextValue;

    useEffect(() => {
        onMount(dispatch);
    }, []);

    useEffect(() => {
        clearTimeout(controlTimer);
        copyControls = { ...state, };
        controlTimer = setTimeout(() => {
            writeControls({ ...copyControls, });
        }, 5000);
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