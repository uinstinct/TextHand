import React, { useMemo } from 'react';

import { useControl } from '../Controls';

function createHTML(text) {

    const newText = text
        .replace(/</g, '&lt')
        .replace(/>/g, '&gt');
    return newText;

}

function Generated(props) {

    const state = useControl()[0];

    const manipulatedStyles = useMemo(() => {

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
        }

    }, [state]);

    const madeHTML = useMemo(() => createHTML(props.text), [props.text]);

    return (
        <div className="generated container" id="page-container" >
            <div className="generated core" id="page-content" style={manipulatedStyles} dangerouslySetInnerHTML={{ __html: madeHTML }} >
            </div>
            <div id="overlay" className="generated overlay"></div>
        </div>
    )

}

export default Generated;