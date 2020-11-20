import React, { useReducer, createContext, useContext, useEffect } from 'react';

const initialState = {

    // fonts
    fontFamily: 'Homemade Apple, cursive',
    fontWeight: 400,
    fontSize: '10px',
    fontSizeRandom: 0,
    color: 'rgb(0, 15, 85)',
    wordRotation: 0,

    // margins
    marginLeft: '16px',
    marginRight: '16px',
    marginTop: '10px',
    clientHeight: 550,
    paperLines: false,

    // spacing
    wordSpacing: '4px',
    letterSpacing: '1px',
    lineHeight: 1.1,
    strikeFreq: 0,
    signValue: "",
    signPosition: "top-right",

    // extras
    resolutionScale: 2,
    shadowEffect: true,
    preserveIndentation: true,
}

let copyControls = {
    ...initialState
};

function init() {
    const storedState = { ...initialState };
    for (const [key, value] of Object.entries(localStorage)) {
        storedState[key] = value;
    }
    return storedState;
}


function reducer(state, action) {
    switch (action.type) {
        // FONTS
        case 'CHANGE_FONT_FAMILY':
            return { ...state, fontFamily: action.payload.fontFamily };
        case 'CHANGE_FONT_SIZE':
            return { ...state, fontSize: action.payload.fontSize + 'px' };
        case 'CHANGE_FONT_SIZE_RANDOM':
            return { ...state, fontSizeRandom: action.payload.fontSizeRandom };
        case 'CHANGE_FONT_COLOUR':
            return { ...state, color: action.payload.fontColour };
        case 'CHANGE_FONT_WEIGHT':
            return { ...state, fontWeight: action.payload.fontWeight };
        case 'CHANGE_WORD_ROTATION':
            return { ...state, wordRotation: action.payload.wordRotation };

        // MARGINS
        case 'CHANGE_MARGIN_LEFT':
            return { ...state, marginLeft: action.payload.marginLeft + 'px' };
        case 'CHANGE_MARGIN_RIGHT':
            return { ...state, marginRight: action.payload.marginRight + 'px' };
        case 'CHANGE_MARGIN_TOP':
            return { ...state, marginTop: action.payload.marginTop + 'px' };
        case 'CHANGE_MARGIN_BOTTOM':
            return { ...state, marginBottom: action.payload.marginBottom + 'px' };
        case 'APPLY_PAPER_LINES':
            return { ...state, paperLines: action.payload.paperLines };
        

        // SPACING
        case 'CHANGE_WORD_SPACING':
            return { ...state, wordSpacing: action.payload.wordSpacing + 'px' };
        case 'CHANGE_LETTER_SPACING':
            return { ...state, letterSpacing: action.payload.letterSpacing + 'px' };
        case 'CHANGE_LINE_HEIGHT':
            return { ...state, lineHeight: action.payload.lineHeight };
        case 'CHANGE_STRIKE_FREQUENCY':
            return { ...state, strikeFreq: action.payload.strikeFreq };
        case 'CHANGE_SIGNATURE_VALUE':
            return { ...state, signValue: action.payload.signValue };
        case 'CHANGE_SIGNATURE_POSITION':
            return { ...state, signPosition: action.payload.signPosition };

        // EXTRAS
        case 'CHANGE_RESOLUTION_SCALE':
            return { ...state, resolutionScale: action.payload.resolutionScale };
        case 'APPLY_SHADOW_EFFECT':
            return { ...state, shadowEffect: action.payload.shadowEffect };
        case 'APPLY_RESET':
            return { ...initialState };
        case 'CHANGE_CLIENT_HEIGHT':
            return { ...state, clientHeight: action.payload.clientHeight };
        case 'APPLY_PRESERVE_INDENTATION':
            return { ...state, preserveIndentation: action.payload.preserveIndentation };

        default:
            return state;
    }
    
}

const ControlContext = createContext();

let timer;
export function ControlProvider({ children }) {
    const contextValue = useReducer(reducer, initialState, init);

    useEffect(() => {
        copyControls = { ...contextValue[0] };
        clearTimeout(timer);
        timer = setTimeout(() => {
            for (const [key, value] of Object.entries(copyControls)) {
                localStorage.setItem(key, value);
            }
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