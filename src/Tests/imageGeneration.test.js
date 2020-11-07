import React from 'react';
import {
    render, screen,
    fireEvent, cleanup
} from '@testing-library/react';

import * as html2canvas from "html2canvas";
import {
    withDarkThemeProvider,
    mockUseControl,
    dummyText
} from "./testUtils"
import Editor from "../Containers/Editor";
import ImageGeneratorIndex from "../Containers/ImageGenerator";

jest.mock("../Containers/Controls", () => (
    {
        useControl: mockUseControl,
        copyControls: mockUseControl()[0],
    }
));

jest.mock("html2canvas", () => jest.fn());

// this is an integrated test
describe("test the image generation phenomenon | ", () => {

    beforeEach(() => {
        cleanup();
        // render the editor container inside document.body
        render(withDarkThemeProvider(<Editor />));
        const pageContainer = document.getElementById('page-container');
        const pageContent = document.getElementById('page-content');
        pageContainer.scrollTo = jest.fn();
        pageContent.scrollTo = jest.fn();

    });

    it("renders inside the testContainer", () => {

        
        jest.spyOn(html2canvas, 'default') // the default property indicates the default export of that package
            .mockImplementation((cEl, options) => {
                const canvas = document.createElement('canvas');
                canvas.innerHTML = cEl.outerHTML;
                return canvas;
            });
        
        const { container } = render(withDarkThemeProvider(<ImageGeneratorIndex />));
        const generateButton = container.querySelector("#generate-button");

        const textArea = document.querySelector(".text-area.core");
        fireEvent.input(textArea, { target: { value: dummyText } });

        fireEvent.click(generateButton);

        expect(generateButton).toHaveAttribute('disabled');
    });
});