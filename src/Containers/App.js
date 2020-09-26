import React, { useState, useEffect, useMemo } from 'react';

import { DarkTheme } from '../Themes'

import Navbar from './Navbar'

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
            </div>
        </DarkTheme.Provider>
    );
}

export default App;
