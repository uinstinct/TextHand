import React from 'react';
import { cleanup, render } from '@testing-library/react';
import App from "../Containers/App";

describe("test the app container | ", () => {
    afterEach(cleanup);

    it("whole app is rendered without failing", () => {

        console.error = jest.fn();

        const { asFragment } = render(<App />);
        const app = asFragment();
        expect(app).toMatchSnapshot();
    });

});

/*
import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import { cleanup, fireEvent, render } from '@testing-library/react';
import App from "../Containers/App";

describe("test the working of imageGenerator container", () => {
    afterEach(cleanup);
    it("generated button is disabled while snapshot generation", () => {
        const { getByTestId } = render(<App />);
        fireEvent.click(getByTestId('generate-button'));

        expect(getByTestId('generate-button').toHaveAttribute('disabled'))
    });
})*/