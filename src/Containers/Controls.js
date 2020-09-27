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
        case 'CHANGE_FONT_COLOUR':
            return { ...state, color: action.payload.fontColour };

        // MARGINS
        case 'CHANGE_MARGIN_LEFT':
            return { ...state, marginLeft: action.payload.marginLeft }
        case 'CHANGE_MARGIN_RIGHT':
            return { ...state, marginRight: action.payload.marginRight }
        case 'CHANGE_MARGIN_TOP':
            return { ...state, marginTop: action.payload.marginTop }
        case 'CHANGE_MARGIN_BOTTOM':
            return { ...state, marginBottom: action.payload.marginBottom }

        // SPACING
        case 'CHANGE_LETTER_SPACING':
            return { ...state, letterSpacing: action.payload.letterSpacing };

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