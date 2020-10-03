import React, { useReducer, createContext, useContext, useEffect } from 'react';

const initialState = {
    fontFamily: 'Homemade Apple, cursive',
    fontWeight: 'normal',
    fontSize: 20,
    resolutionScale: 1,
}

let copyControls = {
    ...initialState
};


function reducer(state, action) {
    switch (action.type) {
        // FONTS
        case 'CHANGE_FONT_FAMILY':
            return { ...state, fontFamily: action.payload.fontFamily };
        case 'CHANGE_FONT_SIZE':
            return { ...state, fontSize: action.payload.fontSize };
        case 'CHANGE_FONT_COLOUR':
            return { ...state, color: action.payload.fontColour };
        case 'CHANGE_FONT_WEIGHT':
            return { ...state, fontWeight: action.payload.fontWeight }

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
            return { ...state, letterSpacing: action.payload.letterSpacing }
        case 'CHANGE_LINE_HEIGHT':
            return { ...state, lineHeight: action.payload.lineHeight }
        case 'CHANGE_WORD_SPACING':
            return { ...state, wordSpacing: action.payload.wordSpacing }

        // EXTRAS
        case 'CHANGE_RESOLUTION_SCALE':
            return { ...state, resolutionScale: action.payload.resolutionScale };

        default:
            return state;
    }
    
}

const ControlContext = createContext();

export function ControlProvider({ children }) {
    const contextValue = useReducer(reducer, initialState);

    useEffect(() => {
        copyControls = { ...contextValue[0] };
    }, [contextValue[0]]);

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

export { copyControls };