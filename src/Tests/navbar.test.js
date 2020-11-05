import React from 'react';
import { render as staticRender, shallow } from 'enzyme';
import { cleanup, render, fireEvent, waitFor, screen } from "@testing-library/react";

import Navbar from '../containers/Navbar/index';
import Guide from '../containers/Navbar/Rules';


jest.mock("../assets/rules.md", () => {
    const mockTextContent = "mock text content written";
    return mockTextContent;
});

//jest.mock("semantic-ui-react", () => {
//    const semanticCompons = require('semantic-ui-react');
//    return {
//        __esModule: true,
//        ...semanticCompons,
//    };
//})

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
        });

        it("matches shallow render", () => {
            const guideModal = shallow(<Guide />)
            expect(guideModal.text).toMatchSnapshot();
        });

        //it("the markdown file is fetched and rendered", async () => {
        //    const { container, findByText } = render(<Guide />);
        //    const mockTextContent = "mock text content written";
        //    await waitFor(() => {
        //    });
        //});

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

        it("has the same content as guide modal", () => {
            const { container: gContainer, unmount: gUnmount } = render(<Guide />);
            gUnmount();

            const { container: nContainer } = render(withDarkThemeProvider(< Navbar />));
            const showGuideButton = nContainer.querySelector('#guide-modal');

            fireEvent.click(showGuideButton);
            expect(gContainer).toBeInTheDocument();

            expect(gContainer.innerHTML).toMatchSnapshot();
        });

    });

}

describe("test the navbar container and its components", navBarTests);