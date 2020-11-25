import { useContext } from 'react';

import { DarkTheme } from 'Themes/index';
import { useControl } from 'Utils/Controls';

import {
    Grid, GridRow, GridColumn,
    Divider
} from 'semantic-ui-react';

export default function Randomizers() {
    const { isActive, } = useContext(DarkTheme);
    const [state, dispatch] = useControl();

    const changeFontSizeRandom = (event) => {
        const value = event.target.value === '' ? 0 : parseInt(event.target.value, 10);
        dispatch({ type: 'CHANGE_FONT_SIZE_RANDOM', payload: { fontSizeRandom: value, }, });
    };

    const changeWordRotation = (event) => {
        const value = event.target.value === '' ? 0 : parseFloat(event.target.value);
        dispatch({ type: 'CHANGE_WORD_ROTATION', payload: { wordRotation: value, }, });
    };

    return (
        <div className="controlpanel randomizer">

            <Grid inverted={isActive} doubling>

                <Divider horizontal inverted={isActive}>
                    <h4>Randomization</h4>
                </Divider>
                <GridRow columns={2}>
                    <GridColumn>

                        Word Rotation (in degs)
                        <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="10"
                            onChange={changeWordRotation}
                            value={parseFloat(state.wordRotation)}
                        />

                    </GridColumn>
                    <GridColumn>

                        Letter Sizing
                        <input
                            type="number"
                            min="0"
                            max="30"
                            step={1}
                            style={{ width: '3rem', }}
                            value={state.fontSizeRandom}
                            onChange={changeFontSizeRandom}
                        />

                    </GridColumn>
                </GridRow>
            </Grid>
        </div>
    );
}