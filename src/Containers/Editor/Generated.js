import React, { useMemo } from 'react';

import { useControl } from '../Controls';

function createHTML(text) {

    const words = text
        .replace(/\n/g, '<br/>')
        //.split(/\s/g)
        //.replace(/ /g, "<span style='margin-left:100px'></span>")
    return words;

    // use this in generated image function
    let theHTML = "";

    words.forEach(word => {
        const space = parseInt(Math.random() * 10);
        const tempSpan = `<span style='margin-right:${space}px'>${word}</span>`;
        theHTML += tempSpan;
    })

    return theHTML;
}

function Generated(props) {
    // override the problems from the done github app

    const [state, dispatch] = useControl();

    const manipulatedStyles = useMemo(() => {

        return {
            lineHeight: '1.54rem',

            fontFamily: state.fontFamily,
            fontSize: state.fontSize + 'px',
            fontWeight: state.fontWeight,
            color: state.color,

            marginLeft: state.marginLeft + 'px',
            marginRight: state.marginRight + 'px',
            marginTop: state.marginTop + 'px',
            marginBottom: state.marginBottom + 'px',

            letterSpacing: state.letterSpacing+'px'
        }
    }, [state]);

    const madeHTML = useMemo(() => createHTML(props.text), [props.text]);


    return (
        <div className="generated container" id="page-container">
            <div className="generated core" id="page-content" style={manipulatedStyles} dangerouslySetInnerHTML={{ __html: madeHTML }} >
            </div>
        </div>
    )

}

export default Generated;