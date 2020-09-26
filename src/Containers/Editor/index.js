import React from 'react';

import styles from './index.css';

function EditorIndex() {
    // override the problems from the done github app
    const manipulatedStyles = { background: '#f26', lineHeight: '1.54rem' };

    return (
        <div className="editor container">
            <div className="editor core" contentEditable>
                something is written
            </div>
        </div>
        )

}

export default EditorIndex;