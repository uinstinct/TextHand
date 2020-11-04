import React from 'react';
import { create } from 'react-test-renderer';

import Generated from "../Containers/Editor/Generated";

/** jest.mock needs to be defined outside descibe blocks
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
})

describe("test the generated container and its functionalities", () => {
    it("renders and matches snapshot", () => {

        const generated = create(<Generated text="text inside generated container"/>);
        expect(generated.toJSON()).toMatchSnapshot();
    })
})