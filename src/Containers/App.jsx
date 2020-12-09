import { useState, useEffect, } from 'react';

import 'semantic-ui-css/semantic.min.css';
import { DarkTheme, } from 'Themes/index';

import Navbar from 'Containers/Navbar';
import Main from 'Containers/Main';

export default function App() {
    const storedMode = localStorage.getItem('darkmode');
    const initialMode = storedMode ? (storedMode === 'true') : true;
    const [darkmode, setDarkmode] = useState(initialMode);

    useEffect(() => {
        window.addEventListener('load', () => {
            if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
                navigator.serviceWorker
                    .register(process.env.PUBLIC_URL + '/sw.js',
                        { scope: '/' })
                    .then(() => {
                        console.log('ServiceWorker Registered');
                    })
                    .catch(() => {
                        console.log('Error while registering service workers');
                    });
            }
        });
    }, []);

    useEffect(() => {
        localStorage.setItem('darkmode', darkmode);
        if (darkmode) {
            document.body.setAttribute('data-theme', 'dark');
        } else {
            document.body.removeAttribute('data-theme', 'dark');
        }
    }, [darkmode]);

    return (
        <DarkTheme.Provider value={{ isActive: darkmode, setDarkmode }}>
            <Navbar />
            <Main />
        </DarkTheme.Provider>
    );
}