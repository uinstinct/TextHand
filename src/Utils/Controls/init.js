import { fetchControls } from 'Utils/db/controls';

export const initialState = {

    // fonts
    fontFamily: 'Homemade Apple, cursive',
    fontWeight: 400,
    fontSize: '16px',
    color: 'rgb(0, 15, 85)',
    // randomizers
    fontSizeRandom: 0,
    wordRotation: 0,

    // margins
    marginLeft: '16px',
    marginRight: '16px',
    marginTop: '10px',

    // page
    clientHeight: 550,
    paperLines: false,

    // background-paper
    pageBG: 'white',

    // spacing
    wordSpacing: '4px',
    letterSpacing: '1px',
    lineHeight: 1.1,

    // signs
    signValue: '',
    signPosition: 'top-right',

    // extras
    resolutionScale: 2,
    shadowEffect: true,
    preserveIndentation: true,
};

export async function onMount(dispatch) {
    const storedState = { ...initialState, };
    const controlsArray = await fetchControls();

    if (controlsArray && controlsArray.length) {
        controlsArray.forEach((doc) => {
            storedState[doc.name] = doc.curVal;
        });

        dispatch({
            type: 'APPLY_DB_CONTROLS',
            payload: { value: storedState, },
        });
    }
}