import React, { useState, useEffect } from 'react';

import { DarkTheme } from '../Themes'

import Navbar from './Navbar'
import TextAndImage from './Main'

function App() {
    const storedMode = JSON.parse(localStorage.getItem('darkmode')) || false;
    const [darkmode, setDarkmode] = useState(storedMode);

    useEffect(() => {
        localStorage.setItem('darkmode', darkmode);
    }, [darkmode, setDarkmode]);

    return (
        <DarkTheme.Provider value={{ isActive: darkmode, setDarkmode }}>
            <div className="App">
                <Navbar />
                <TextAndImage />
            </div>
        </DarkTheme.Provider>
    );
}

export default App;
