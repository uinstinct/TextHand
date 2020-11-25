import React from 'react';
import { render } from '@testing-library/react';
import App from "../Containers/App";

describe("test the app container |", () => {

    it("whole app is rendered without failing", () => {

        console.error = jest.fn();

        const { asFragment } = render(<App />);
        const app = asFragment();
        expect(app).toMatchSnapshot();
    });

});