import React, { useReducer, createContext, useContext } from 'react';

const initialState = {
    fontFamily: 'cursive'
}

function init() {
    return { ...initialState };
}

function reducer(action, state) {
            console.log(action, 'was the action');
    switch (action.type) {
        case 'CHANGE_FONT_FAMILY':
            return { fontFamily: action.payload.fontFamily }
        default:
            return state;
    }
}

const ControlContext = createContext();

export function ControlProvider({ children }) {
    const contextValue = useReducer(reducer, initialState, init);
    return (
        <ControlContext.Provider value={contextValue}>
            {children}
        </ControlContext.Provider>
        )
}

export function useControl() {
    const contextValue = useContext(ControlContext);
    return contextValue;
}