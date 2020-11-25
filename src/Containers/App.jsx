import { useState, useEffect } from 'react';

import 'semantic-ui-css/semantic.min.css';
import { DarkTheme } from 'Themes/index';

import Navbar from 'Containers/Navbar';
import TextAndImage from './Main';

export default function App() {
    const storedMode = JSON.parse(localStorage.getItem('darkmode')) || true;
    const [darkmode, setDarkmode] = useState(storedMode);

    useEffect(() => {
        localStorage.setItem('darkmode', darkmode);
        if (darkmode) {
            document.body.setAttribute('data-theme', 'dark');
        } else {
            document.body.removeAttribute('data-theme', 'dark');
        }
    }, [darkmode, setDarkmode]);

    return (
        <DarkTheme.Provider value={{ isActive: darkmode, setDarkmode, }}>
            <div>
                <Navbar />
                <TextAndImage />
            </div>
        </DarkTheme.Provider>
    );
}