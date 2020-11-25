export const initialState = {

    // fonts
    fontFamily: 'Homemade Apple, cursive',
    fontWeight: 400,
    fontSize: '10px',
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
    strikeFreq: 0,

    // signs
    signValue: '',
    signPosition: 'top-right',

    // extras
    resolutionScale: 2,
    shadowEffect: true,
    preserveIndentation: true,
};

export function lazyInit() {
    const storedState = { ...initialState, };
    const localStorageArray = Object.entries(localStorage);

    localStorageArray.forEach(([key, value]) => {
        storedState[key] = value;
    });
    return storedState;
}