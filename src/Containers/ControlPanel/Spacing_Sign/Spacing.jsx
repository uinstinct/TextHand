import { useContext, } from 'react';

import { DarkTheme, } from 'Themes/index';
import { useControl, } from 'Utils/Controls';

import {
    Grid, GridRow, GridColumn,
    Divider,
} from 'semantic-ui-react';

export default function Spacing() {
    const { isActive } = useContext(DarkTheme);
    const [state, dispatch] = useControl();

    const changeWordSpacing = (event) => {
        const value = event.target.value === '' ? 0 : parseFloat(event.target.value);
        dispatch({ type: 'CHANGE_WORD_SPACING', payload: { wordSpacing: value } });
    };

    const changeLetterSpacing = (event) => {
        const value = event.target.value === '' ? 0 : parseFloat(event.target.value);
        dispatch({ type: 'CHANGE_LETTER_SPACING', payload: { letterSpacing: value } });
    };

    const changeLineHeight = (event) => {
        dispatch({ type: 'CHANGE_LINE_HEIGHT', payload: { lineHeight: parseFloat(event.target.value) } });
    };

    return (
        <div className="controlpanel spacing">
            <Divider horizontal inverted={isActive}>
                <h2>Spacing</h2>
            </Divider>
            <Grid columns={2} inverted={isActive} stackable>
                <GridRow>
                    <GridColumn>

                        Word Spacing
                        <input type="number" style={{ marginLeft: '1rem' }} value={parseFloat(state.wordSpacing)} onChange={changeWordSpacing} />

                    </GridColumn>
                    <GridColumn>

                        Letter Spacing
                        <input type="number" style={{ marginLeft: '1rem' }} onChange={changeLetterSpacing} value={parseFloat(state.letterSpacing)} />

                    </GridColumn>
                </GridRow>
                <GridRow>
                    <GridColumn>

                        Line Height
                        <input type="number" step="0.1" style={{ marginLeft: '1rem' }} onChange={changeLineHeight} value={state.lineHeight} />

                    </GridColumn>
                </GridRow>
            </Grid>
        </div>
    );
}