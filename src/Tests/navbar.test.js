import React from 'react';
import {
    cleanup, 
    fireEvent, waitFor,
    render, screen,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";

import { withDarkThemeProvider, dummyShortText } from './testUtils';
import Navbar from '../containers/Navbar/index';
import Guide from '../containers/Navbar/Rules';


const navBarTests = () => {
    
    describe("test the guide component and its functionalities |", () => {

        const mockFetch = jest.spyOn(global, 'fetch');

        beforeEach(() => {
            mockFetch.mockImplementation(() => Promise.reject("guide file is unavailable at test"));
        });

        afterEach(cleanup);


        it("renders and matches its snapshot", () => {
            const guideModal = render(<Guide showRules={true}/>);
            expect(guideModal).toMatchSnapshot();
        });

        it("the markdown file is fetched and rendered", async () => {
            const setShowRules = jest.fn();

            const mockTextFetchResponse = Promise.resolve({
                text: () => Promise.resolve(dummyShortText)
            });

            await act(async () => {
                mockFetch.mockImplementation(() => mockTextFetchResponse);
                render(
                    <Guide showRules={true} setShowRules={setShowRules} />
                );
                await waitFor(() => {
                    expect(mockFetch).toHaveBeenCalled();
                    expect(setShowRules).not.toHaveBeenCalled();
                    screen.getByText(dummyShortText);
                });
            });
        });

    });

    describe("test the navbar component", () => {

        afterEach(cleanup);

        it("renders and matches its snapshot", async () => {
            jest.spyOn(console, 'warn').mockImplementation(() => { });
            jest.spyOn(console, 'error').mockImplementation(() => { });
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

describe("test the navbar container and its components |", navBarTests);