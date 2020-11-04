import React from 'react';
import { render as staticRender, shallow } from 'enzyme';
import { cleanup, render } from "@testing-library/react";

import Navbar from '../containers/Navbar/index';
import Guide from '../containers/Navbar/Rules';

const navBarTests = () => {
    afterEach(cleanup);

    describe("test the guide component and its functionalities", () => {

        it("renders using static render", () => {
            const guideModal = staticRender(<Guide />);
            expect(guideModal).toMatchSnapshot();
        });

        it("renders using rtl render", () => {
            const guideModal = render(<Guide />);
            expect(guideModal).toMatchSnapshot();
        })

        it("matches shallow render", () => {
            const guideModal = shallow(<Guide />)
            expect(guideModal.text).toMatchSnapshot();
        })

    });

    describe("test the navbar component", () => {

        let DarkTheme = null;
        let withDarkThemeProvider = null;
        beforeEach(() => {
            const Theme = require('../Themes');
            DarkTheme = Theme.DarkTheme;
            withDarkThemeProvider = children =>
                <DarkTheme.Provider value={{ isActive: true, setDarkmode: 'function' }}>
                    {children}
                </DarkTheme.Provider>
        })

        it("renders using rtl render", () => {
            const navbar = render(withDarkThemeProvider(<Navbar />));
            expect(navbar).toMatchSnapshot();
        });

    });

}

describe("test the navbar container and its components", navBarTests);