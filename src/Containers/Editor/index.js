import React, { useMemo } from 'react';

import { useControl } from '../Controls';

import "./index.css";


function EditorIndex() {
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
        }
    }, [state]);

    return (
        <div className="editor container">
            <div className="editor core" contentEditable style={manipulatedStyles}>
                something is written<br/>
                there is something here
            </div>
        </div>
        )

}

export default EditorIndex;