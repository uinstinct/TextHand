import React, { useRef } from 'react';

function Text(props) {
    const changeInput = (event) => {
        props.setText(event.target.value);
    }

    const textareaRef = useRef(null);

    const handleKeyPress = event => {
        if (event.key === 'Tab') {
            event.preventDefault();
            const textarea = textareaRef.current;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            textarea.value = textarea.value.substring(0, start) + "\t" + textarea.value.substring(end);
            textarea.selectionStart = textarea.selectionEnd
                = start + 1;
        }
    }

    return (
        <div className="text-area container">
            <textarea
                placedholder="type your text here"
                className='text-area core'
                value={props.text}
                onInput={changeInput}
                onKeyDown={event => handleKeyPress(event)}
                ref={textareaRef}
            />
        </div>
    );
}

export default Text;