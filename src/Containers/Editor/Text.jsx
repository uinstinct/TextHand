import { useRef } from 'react';

export default function Text({ text, setText, }) {
    const handleChange = (event) => {
        setText(event.target.value);
    };

    const textareaRef = useRef(null);

    const handleKeyPress = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            const textarea = textareaRef.current;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;

            textarea.value = textarea.value.substring(0, start) + '\t' + textarea.value.substring(end);
            textarea.selectionStart = start + 1;
            textarea.selectionEnd = start + 1;
        }
    };

    return (
        <div className="text-area container">
            <textarea
                placedholder="type your text here"
                className="text-area core"
                value={text}
                onChange={handleChange}
                onKeyDown={(event) => handleKeyPress(event)}
                ref={textareaRef}
            />
        </div>
    );
}