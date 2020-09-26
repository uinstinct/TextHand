import React, { useReducer, createContext, useContext } from 'react';

const initialState = {
    fontFamily: 'cursive',
    fontSize: '10'
}


function reducer(state, action) {
    switch (action.type) {
        // FONTS
        case 'CHANGE_FONT_FAMILY':
            return { ...state, fontFamily: action.payload.fontFamily };
        case 'CHANGE_FONT_SIZE':
            return { ...state, fontSize: action.payload.fontSize };

        default:
            return state;
    }
    
}

const ControlContext = createContext();

export function ControlProvider({ children }) {
    const contextValue = useReducer(reducer, initialState);
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