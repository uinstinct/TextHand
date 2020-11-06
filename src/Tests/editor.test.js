import React from 'react';
import { create } from 'react-test-renderer';
import { render, fireEvent, cleanup } from '@testing-library/react';

import {
    withDarkThemeProvider,
    dummyText, text1, text2,
    mockUseControl,
} from './testUtils';
import EditorIndex from "../Containers/Editor/index";
import TextEdit from "../Containers/Editor/Text";
import Generated from "../Containers/Editor/Generated";

/** jest.mock needs to be defined outside describe blocks
 * the "mock" keyword ensures that we are allowed to reference out-of-scope variables
 * */
jest.mock("../Containers/Controls", () => (
    {
        useControl: mockUseControl,
    }
));

afterEach(() => cleanup());

describe("test the generated container and its functionalities | ", () => {
    it("renders and matches snapshot", () => {
        const generated = create(<Generated text="text inside generated container" />);
        expect(generated.toJSON()).toMatchSnapshot();
    });

    it("changes input on props change", () => {
        const { container, rerender } = render(<Generated text={text1} />);
        const pageContent = container.querySelector('#page-content');
        expect(pageContent.innerHTML).toBe(text1);

        rerender(<Generated text={text2} />);
        expect(pageContent.innerHTML).toBe(text2);
    });
});

describe("test the text area container and it functionalities | ", () => {
    it("renders and matches snapshot", () => {
        const { container } = render(<TextEdit text={dummyText} />);
        expect(container.innerHTML).toMatchSnapshot();
    });

    it("changes textarea text on input change", () => {
        const setText = jest.fn();

        const { container, rerender } = render(
            <TextEdit text={text1} setText={setText} />
        );
        const textArea = container.querySelector(".text-area.core");
        expect(textArea.value).toBe(text1);

        fireEvent.input(textArea, { target: { value: text2 } });

        expect(setText).toHaveBeenCalledWith(text2);
        expect(setText).toHaveBeenCalledTimes(1);

        rerender(<TextEdit text={text2} />)
        expect(textArea.value).toBe(text2);

    });
});


/** this is an Integration test
 * test the working of both the generated and the text container
 * */
describe("test the whole editor container and its functionalities | ", () => {
    it("renders and matches snapshot", () => {
        const { container } = render(withDarkThemeProvider(<EditorIndex />));
        expect(container.innerHTML).toMatchSnapshot();
    });

    it("changes the content of the editor container when text container changes",
        async () => {
            const { container } = render(withDarkThemeProvider(<EditorIndex />));
            const textArea = container.querySelector(".text-area.core");
            const pageContent = container.querySelector(".generated.core");

            fireEvent.input(textArea, { target: { value: dummyText } });

            expect(pageContent.innerHTML).toMatch(dummyText);
            expect(mockUseControl).toHaveBeenCalled();
            expect(container.innerHTML).toMatchSnapshot();
        }
    );
});