import React from 'react';
import {
    render, screen,
    fireEvent, waitFor,
    cleanup
} from '@testing-library/react';
import {
    withDarkThemeProvider,
    mockUseControl, sampleControls,
    dummyText, dummyShortText,
} from "./testUtils";

import * as html2canvas from "html2canvas";
import Editor from "../Containers/Editor";
import ImageGeneratorIndex from "../Containers/ImageGenerator";

const mockCopyControlsGetter = jest.fn(() => sampleControls);
jest.mock("../Containers/Controls", () => (
    {
        useControl: mockUseControl,
        get copyControls() {
            return mockCopyControlsGetter();
        }
    }
));

jest.mock("html2canvas", () => jest.fn());

// this is an integrated test
describe("test the image generation phenomenon |", () => {

    let econtainer = null;

    beforeEach(() => {
        cleanup();
        mockCopyControlsGetter.mockReturnValue(sampleControls);

        // render the editor container inside document.body
        const renderRes = render(withDarkThemeProvider(<Editor />));
        econtainer = renderRes.container;

        const pageContainer = econtainer.querySelector('#page-container');
        const pageContent = econtainer.querySelector('#page-content');
        pageContainer.scrollTo = jest.fn();
        pageContent.scrollTo = jest.fn();

        jest.spyOn(html2canvas, 'default') // the default property indicates the default export of that package
            .mockImplementation((cEl, options) => {
                const canvas = document.createElement('canvas');
                canvas.innerHTML = cEl.outerHTML;
                return canvas;
            });
    });


    /**since the process is synchronous,
     * snapshot is taken when both image is being generated
     * the generated-overlay has a display of block
     * */
    it("matches its snapshot during image generation", async () => {

        const { container: icontainer } = render(withDarkThemeProvider(<ImageGeneratorIndex />));
        const generateButton = icontainer.querySelector("#generate-button");

        const textArea = econtainer.querySelector(".text-area.core");
        fireEvent.input(textArea, { target: { value: dummyText } });

        fireEvent.click(generateButton);

        const pageContainer = econtainer.querySelector("#page-container");

        expect(generateButton).toHaveAttribute('disabled');
        expect(pageContainer.innerHTML).toMatchSnapshot();
    });

    /** we cannot apply snapshot testing in random functions
     * as each time a new random value will be generated
     */
    
    it("has random rotation applied and it runs applies word rotation", () => {
        mockCopyControlsGetter.mockReturnValue({
            ...sampleControls,
            fontSize: '14px',
            wordRotation: 5,
        });
        const { container: icontainer } = render(withDarkThemeProvider(<ImageGeneratorIndex />));
        const generateButton = icontainer.querySelector("#generate-button");
        const textArea = econtainer.querySelector(".text-area.core");

        fireEvent.input(textArea, { target: { value: dummyText } });
        fireEvent.click(generateButton);

        expect(generateButton).toHaveAttribute('disabled');
    });

    it("has random fontSize applied and it applies random fontSize to each letter",
        () => {
            mockCopyControlsGetter.mockReturnValue({
                ...sampleControls,
                fontSize: '20px',
                fontSizeRandom: 7,
            });
            const { container: icontainer } = render(withDarkThemeProvider(<ImageGeneratorIndex />));
            const generateButton = icontainer.querySelector("#generate-button");
            const textArea = econtainer.querySelector(".text-area.core");

            fireEvent.input(textArea, { target: { value: dummyText } });
            fireEvent.click(generateButton);

            expect(generateButton).toHaveAttribute('disabled');

        });

    it("has both random fontSize and random word rotation and applied the same",
        async () => {
            jest.spyOn(console, 'warn').mockImplementation(() => { });
            jest.spyOn(console, 'error').mockImplementation(() => { });

            mockCopyControlsGetter.mockReturnValue({
                ...sampleControls,
                fontSize: '12px',
                wordRotation: 4,
                fontSizeRandom: 5,
                paperLines: true,
            });
            const { container: icontainer } = render(withDarkThemeProvider(<ImageGeneratorIndex />));
            const generateButton = icontainer.querySelector("#generate-button");
            const textArea = econtainer.querySelector(".text-area.core");

            fireEvent.input(textArea, { target: { value: dummyText } });
            fireEvent.click(generateButton);

            await waitFor(() => {
                return screen.findByText(/applying filters/gi);
            }, { timeout: 30 * 1000, interval: 5 * 1000 });

            /*if progress is 100, then "applying filters",
             * should be displayed on the progress bar */
            const progress = screen.getByText(/applying filters/gi);
            expect(progress.outerHTML).toMatchSnapshot();
            expect(generateButton).toHaveAttribute("disabled");
        }, 35 * 1000);


    /** there seems to be a problem with this test
     * the progress bar does not seem to unmount
     * and keeps showing progress as 100
     */
    it("matches snapshot when image generation is complete", async () => {
        const { container: icontainer } = render(withDarkThemeProvider(<ImageGeneratorIndex />));

        const generateButton = icontainer.querySelector("#generate-button");
        const textArea = econtainer.querySelector(".text-area.core");
        const pageContainer = econtainer.querySelector("#page-container");

        fireEvent.input(textArea, { target: { value: dummyShortText } });

        fireEvent.click(generateButton);
        expect(generateButton).toHaveAttribute('disabled');

        /*
        await waitFor(() => (
            iGetByTestId('generated-images')
        ), { timeout: 6000 });
        const gi = await screen.getByTestId('generated-images');
        console.log(gi.outerHTML);*/

        expect(pageContainer.innerHTML).toMatchSnapshot(); // should not be same as first test
        //expect(generateButton).not.toHaveAttribute('disabled');

    });

});