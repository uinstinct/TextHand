import React from 'react';
import { create } from 'react-test-renderer';
import { render } from '@testing-library/react';

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

describe("test the generated container and its functionalities", () => {
    it("renders and matches snapshot", () => {
        const generated = create(<Generated text="text inside generated container" />);
        expect(generated.toJSON()).toMatchSnapshot();
    });

    it("changes input on props change", () => {
        const text1 = "text inside is 1";
        const text2 = "text has changed to 2";
        const { container, rerender } = render(<Generated text={text1} />);
        const pageContent = container.querySelector('#page-content');
        expect(pageContent.innerHTML).toBe(text1);

        rerender(<Generated text={text2} />);
        expect(pageContent.innerHTML).toBe(text2);
    });
});