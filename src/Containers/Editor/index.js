import React, { useMemo } from 'react';

import "./index.css";
import { useControl } from '../Controls';



function EditorIndex() {
    // override the problems from the done github app

    const [state, dispatch] = useControl();

    const manipulatedStyles = useMemo(() => {
        return { background: '#f26', lineHeight: '1.54rem', fontFamily: state.fontFamily, fontSize: state.fontSize+'px' }
    }, [state]);

    return (
        <div className="editor container">
            <div className="editor core" contentEditable style={manipulatedStyles}>
                something is written
            </div>
        </div>
        )

}

export default EditorIndex;