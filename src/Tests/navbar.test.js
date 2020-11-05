import React from 'react';
import { shallow } from 'enzyme';
import { cleanup, render, fireEvent, waitFor, screen, } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import Navbar from '../containers/Navbar/index';
import Guide from '../containers/Navbar/Rules';


const navBarTests = () => {
    

    describe("test the guide component and its functionalities | ", () => {

        afterEach(cleanup);

        const mockFetch = jest.spyOn(global, 'fetch');

        it("renders using rtl render", () => {
            const guideModal = render(<Guide showRules={true}/>);
            expect(guideModal).toMatchSnapshot();
        });

        it("matches shallow render", () => {
            const guideModal = shallow(<Guide showRules={true}/>)
            expect(guideModal.text).toMatchSnapshot();
        });

        it("the markdown file is fetched and rendered", async () => {
            const setShowRules = jest.fn();

            const mockTextContent = "mock text content written";
            const mockTextFetchResponse = Promise.resolve({
                text: () => Promise.resolve(mockTextContent)
            });

            await act(async () => {
                mockFetch.mockImplementation(() => mockTextFetchResponse);
                render(
                    <Guide showRules={true} setShowRules={setShowRules} />
                );
                await waitFor(() => {
                    expect(mockFetch).toHaveBeenCalled();
                    expect(setShowRules).not.toHaveBeenCalled();
                    screen.getByText(mockTextContent);
                    screen.debug();
                });
            });  
            
        });

    });

    describe("test the navbar component", () => {

        afterEach(cleanup);

        let DarkTheme = null;
        let withDarkThemeProvider = null;
        beforeEach(() => {
            const Theme = require('../Themes');
            DarkTheme = Theme.DarkTheme;
            withDarkThemeProvider = children =>
                <DarkTheme.Provider value={{ isActive: true, setDarkmode: 'function' }}>
                    {children}
                </DarkTheme.Provider>
        });

        it("renders using rtl render", async () => {
            let navbar = null;
            navbar = render(withDarkThemeProvider(<Navbar />));
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

describe("test the navbar container and its components | ", navBarTests);