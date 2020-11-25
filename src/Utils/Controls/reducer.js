function applyReset() {
    // eslint-disable-next-line global-require
    const { initialState, } = require('./init');
    return { ...initialState, };
}

export default function reducer(state, action) {
    switch (action.type) {
    // FONTS
    case 'CHANGE_FONT_FAMILY':
        return { ...state, fontFamily: action.payload.fontFamily, };
    case 'CHANGE_FONT_SIZE':
        return { ...state, fontSize: action.payload.fontSize + 'px', };
    case 'CHANGE_FONT_COLOUR':
        return { ...state, color: action.payload.fontColour, };
    case 'CHANGE_FONT_WEIGHT':
        return { ...state, fontWeight: action.payload.fontWeight, };

        // RANDOMS
    case 'CHANGE_FONT_SIZE_RANDOM':
        return { ...state, fontSizeRandom: action.payload.fontSizeRandom, };
    case 'CHANGE_WORD_ROTATION':
        return { ...state, wordRotation: action.payload.wordRotation, };

        // MARGINS
    case 'CHANGE_MARGIN_LEFT':
        return { ...state, marginLeft: action.payload.marginLeft + 'px', };
    case 'CHANGE_MARGIN_RIGHT':
        return { ...state, marginRight: action.payload.marginRight + 'px', };
    case 'CHANGE_MARGIN_TOP':
        return { ...state, marginTop: action.payload.marginTop + 'px', };
    case 'CHANGE_MARGIN_BOTTOM':
        return { ...state, marginBottom: action.payload.marginBottom + 'px', };

        // PAGES
    case 'CHANGE_CLIENT_HEIGHT':
        return { ...state, clientHeight: action.payload.clientHeight, };
    case 'APPLY_PAPER_LINES':
        return { ...state, paperLines: action.payload.paperLines, };

        // BACKGROUND PAPER
    case 'CHANGE_PAPER':
        return { ...state, pageBG: action.payload.pageBG, };

        // SPACING
    case 'CHANGE_WORD_SPACING':
        return { ...state, wordSpacing: action.payload.wordSpacing + 'px', };
    case 'CHANGE_LETTER_SPACING':
        return { ...state, letterSpacing: action.payload.letterSpacing + 'px', };
    case 'CHANGE_LINE_HEIGHT':
        return { ...state, lineHeight: action.payload.lineHeight, };
    case 'CHANGE_STRIKE_FREQUENCY':
        return { ...state, strikeFreq: action.payload.strikeFreq, };

        // SIGNS
    case 'CHANGE_SIGNATURE_VALUE':
        return { ...state, signValue: action.payload.signValue, };
    case 'CHANGE_SIGNATURE_POSITION':
        return { ...state, signPosition: action.payload.signPosition, };

        // EXTRAS
    case 'CHANGE_RESOLUTION_SCALE':
        return { ...state, resolutionScale: action.payload.resolutionScale, };
    case 'APPLY_SHADOW_EFFECT':
        return { ...state, shadowEffect: action.payload.shadowEffect, };
    case 'APPLY_PRESERVE_INDENTATION':
        return { ...state, preserveIndentation: action.payload.preserveIndentation, };
    case 'APPLY_RESET':
        return applyReset();

    default:
        return state;
    }
}