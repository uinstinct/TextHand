import React, { useMemo } from 'react';

import { useControl } from '../Controls';

function createHTML(text) {

    const theHTML = text
        .replace(/\n/g, '<br/>')
        //.replace(/ /g, "<span style='margin-left:100px'></span>")

    return theHTML;
}

function Generated(props) {
    // override the problems from the done github app

    const [state, dispatch] = useControl();

    const manipulatedStyles = useMemo(() => {
        return {
            background: '#fff', lineHeight: '1.54rem',

            fontFamily: state.fontFamily,
            fontSize: state.fontSize + 'px,20px',
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
        <div className="generated container">
            <div className="generated core" id="core-editor" style={manipulatedStyles} dangerouslySetInnerHTML={{ __html: madeHTML }}>
            </div>
        </div>
    )

}

export default Generated;