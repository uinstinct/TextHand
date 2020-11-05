import React from 'react';
import { create } from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';

import { withDarkThemeProvider, dummyText, text1, text2 } from './testUtils';
import EditorIndex from "../Containers/Editor/index";
import TextEdit from "../Containers/Editor/Text";
import Generated from "../Containers/Editor/Generated";

/** jest.mock needs to be defined outside describe blocks
 * */
jest.mock("../Containers/Controls", () => {
    return {
        useControl: () => [{
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
        }]
    };
});

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
        const textArea = container.querySelector(".core");
        expect(textArea.value).toBe(text1);

        fireEvent.input(textArea, { target: { value: text2 } });
        expect(setText).toHaveBeenCalledWith(text2);
        expect(setText).toHaveBeenCalledTimes(1);

        rerender(<TextEdit text={text2} />)
        expect(textArea.value).toBe(text2);

    });
});


describe("test the whole editor container and its functionalities | ", () => {
    it("renders and matches snapshot", () => {
        const { container } = render(withDarkThemeProvider(< EditorIndex />));
        expect(container.innerHTML).toMatchSnapshot();
    });
});