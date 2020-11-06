import React from 'react';

const Theme = require('../Themes');
const { DarkTheme } = Theme;

export const withDarkThemeProvider = children =>
    <DarkTheme.Provider value={{ isActive: true, setDarkmode: 'function' }}>
        {children}
    </DarkTheme.Provider>;


export const dummyText = `Jest is a delightful JavaScript Testing Framework with a focus on simplicity.

It works with projects using: Babel, TypeScript, Node, React, Angular, Vue and more!

Jest is a JavaScript testing framework designed to ensure correctness of any JavaScript codebase. It allows you to write tests with an approachable, familiar and feature-rich API that gives you results quickly.

Jest is well-documented, requires little configuration and can be extended to match your requirements.

Jest makes testing delightful.
`;


export const dummyShortText = "React Testing Library builds on top of DOM Testing Library by adding APIs for working with React components.";


export const text1 = "1 formerly before change it was this text";
export const text2 = "2 now it has changed to that writing";


export const mockUseControl = jest.fn(() => {
    return [{
        fontFamily: 'san-serif',
        fontWeight: 12,
        fontSize: 10,
        color: '#000',
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        wordSpacing: 2,
        letterSpacing: 1,
        lineHeight: 1.1,
        paperLines: true,
    },]
});