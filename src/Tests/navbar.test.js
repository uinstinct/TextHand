import React from 'react';
import { render as enzymeRender } from 'enzyme';
import { cleanup, render } from "@testing-library/react";

import Guide from '../containers/Navbar/Rules';

const navBarTests = () => {
    afterEach(cleanup);

    describe("test the guide component and its functionalities", () => {

        it("renders using enzyme render", () => {
            const rulesModal = enzymeRender(<Guide />);
            expect(rulesModal).toMatchSnapshot();
        });

        it("renders as fragment", () => {
            const rulesModal = render(<Guide />);
            expect(rulesModal).toMatchSnapshot();
        })

    })
}

describe("test the navbar container and its components", navBarTests);