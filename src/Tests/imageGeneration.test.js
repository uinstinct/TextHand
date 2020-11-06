import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

import {
    withDarkThemeProvider,
    mockUseControl
} from "./testUtils"
import Editor from "../Containers/Editor";
import ImageGeneratorIndex from "../Containers/ImageGenerator";

jest.mock("../Containers/Controls", () => (
    {
        useControl: mockUseControl,
    }
));

// this is an integrated test
describe("test the image generation phenomenon | ", () => {

    beforeEach(() => {
        cleanup();
        // render the editor container inside document.body
        render(withDarkThemeProvider(<Editor />));
    });

    it("renders inside the testContainer", () => {
        const { container } = render(withDarkThemeProvider(<ImageGeneratorIndex />));
        const generateButton = container.querySelector("#generate-button");

        fireEvent.click(generateButton);

        expect(generateButton).toHaveAttribute('disabled');

    });
});