import { useMemo } from 'react';

import { useControl } from 'Utils/Controls';

function createHTML(text) {

    const newText = text
        .replace(/</g, '&lt')
        .replace(/>/g, '&gt');
    return newText;

}

const makeSignStyles = (fontFamily, color, position) =>
    (
        {
            fontFamily,
            color,
            top: position === "top-right" ? "15px" : "auto",
            right: "20px",
            bottom: position === "bottom-right" ? "15px" : "auto"
        }
    );

const originalStyles = state =>
    (
        {
        fontFamily: state.fontFamily,
        fontWeight: state.fontWeight,
        fontSize: state.fontSize,
        color: state.color,

        marginLeft: state.marginLeft,
        marginRight: state.marginRight,
        marginTop: state.marginTop,

        wordSpacing: state.wordSpacing,
        letterSpacing: state.letterSpacing,
        lineHeight: state.lineHeight
        }
    );


const paperLines = state => {
    const spaceInBetween = `${(parseInt(state.fontSize) + 1) * state.lineHeight}px`;
    return {
        backgroundImage: "linear-gradient(#999 0.05em, transparent 0.1em)",
        backgroundColor: "unset !important",
        backgroundSize: `100% ${spaceInBetween}`,
        backgroundPosition: "top",
        height: state.clientHeight + 'px',
    };
}

export default function Generated(props) {

    const state = useControl()[0];

    const manipulatedStyles = useMemo(() => {

        if (JSON.parse(state.paperLines) === true) {
            return {
                ...originalStyles(state),
                ...paperLines(state)
            };
        } else {
            return { ...originalStyles(state) };
        }

    }, [state]);

    const signStyles = useMemo(() => makeSignStyles(state.fontFamily, state.color, state.signPosition), [state.fontFamily, state.color, state.signPosition]);

    const madeHTML = useMemo(() => createHTML(props.text), [props.text]);

    return (
        <div className="generated container" id="page-container" >
            <div className="generated core" id="page-content"
                style={manipulatedStyles}
                dangerouslySetInnerHTML={{ __html: madeHTML }}
            />
            <div id="overlay" className="generated overlay" />
            <div id="signature" className="generated signature"
                style={signStyles}
            >{state.signValue}</div>
        </div>
    );

}