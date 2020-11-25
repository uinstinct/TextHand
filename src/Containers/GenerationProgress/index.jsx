import { useReducer, useContext } from 'react';

import { DarkTheme } from 'Themes/index';
import { Progress } from 'semantic-ui-react';


const initialState = {
    percent: 0,
    label: "Start Generating Images",
}

function reducer(state, action) {
    switch (action.type) {
    case "START":
        return { ...state, label: "initializing ..." };
    case "INCREMENT_PROGRESS": {

        const { i, totalPages } = action.payload;
        const percent = Math.ceil((i + 1) / (totalPages + 1) * 100);
        const label = "Taking Snapshots ... " + percent + "%";
        return { ...state, percent, label };

    }
    case "APPLY_FILTERS":
        return { ...state, label: "Applying Filters", percent: 100 };
    default:
        return state;
    }
}

let progress = {};

function GenerationProgress({ attached }) {

    const { isActive } = useContext(DarkTheme);
    const [state, dispatch] = useReducer(reducer, initialState);

    const updateProgress = (obj) => {
        setTimeout(() => {
            dispatch(obj);
        }, 1000);
    }

    progress = { progressState: state, updateProgress };

    return (
        <Progress attached={attached ? "top" : null} inverted={isActive} indicating percent={state.percent}>
            {state.label}
        </Progress>
    );
}

export { progress };
export default GenerationProgress;