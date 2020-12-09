import {
    useCallback, useEffect, useRef, useState,
} from 'react';
import timeRemaining from 'Utils/calcuateTimeRemaining';
import { useControl, } from 'Utils/Controls';

export default function Text({ text, setText }) {
    const handleChange = (event) => {
        setText(event.target.value);
    };

    const [tr, setTr] = useState('');

    const textareaRef = useRef(null);
    const timer = useRef(null);

    const state = useControl()[0];

    useEffect(() => {
        if (!text.length) {
            setTr('type something here 👆🏾');
            return;
        }
        clearTimeout(timer.current);
        setTr('calculating ...');
        timer.current = setTimeout(() => {
            const t = timeRemaining(text, state).toPrecision(4);
            setTr('Will complete generating images in <em>' + t + ' seconds</em> (approx)');
        }, 500);
    }, [text, state]);

    const handleKeyPress = useCallback((event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            const textarea = textareaRef.current;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;

            textarea.value = textarea.value.substring(0, start) + '\t' + textarea.value.substring(end);
            textarea.selectionStart = start + 1;
            textarea.selectionEnd = start + 1;
        } else if (
            (event.ctrlKey || event.metaKey)
            && (event.keyCode === 13 || event.keyCode === 10)
        ) {
            const generateButton = document.getElementById('generate-button');
            generateButton.click();
        }
    }, []);

    return (
        <>
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
            <div dangerouslySetInnerHTML={{ __html: tr }} style={{ fontWeight: 'bolder' }} />
        </>
    );
}