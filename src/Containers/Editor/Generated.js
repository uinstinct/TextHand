import React, { useMemo } from 'react';

import { useControl } from '../Controls';

function createHTML(text) {

    const newText = text
        .replace(/</g, '&lt')
        .replace(/>/g, '&gt');
    return newText;

}

const originalStyles = state => {
    return {
        fontFamily: state.fontFamily,
        fontWeight: state.fontWeight,
        fontSize: state.fontSize,
        color: state.color,

        marginLeft: state.marginLeft,
        marginRight: state.marginRight,
        marginTop: state.marginTop,

        wordSpacing: state.wordSpacing,
        letterSpacing: state.letterSpacing,
        lineHeight: state.lineHeight,
    };
}

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

function Generated(props) {

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

    const madeHTML = useMemo(() => createHTML(props.text), [props.text]);

    return (
        <div className="generated container" id="page-container" >
            <div className="generated core" id="page-content" style={manipulatedStyles} dangerouslySetInnerHTML={{ __html: madeHTML }} >
            </div>
            <div id="overlay" className="generated overlay"></div>
        </div>
    );

}

export default Generated;