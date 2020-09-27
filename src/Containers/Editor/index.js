import React, { useMemo } from 'react';

import "./index.css";
import { useControl } from '../Controls';



function EditorIndex() {
    // override the problems from the done github app

    const [state, dispatch] = useControl();

    console.log(state.color);
    const manipulatedStyles = useMemo(() => {
        return { background: '#fff', lineHeight: '1.54rem', fontFamily: state.fontFamily, fontSize: state.fontSize+'px,20px', color:state.color }
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