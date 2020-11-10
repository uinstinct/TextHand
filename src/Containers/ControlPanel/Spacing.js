import React, { useContext } from 'react';

import { DarkTheme } from '../../Themes';
import { useControl } from '../Controls';

import { Grid, GridRow, GridColumn } from 'semantic-ui-react';

function Spacing() {
    const { isActive } = useContext(DarkTheme);
    const [state, dispatch] = useControl();

    const changeWordSpacing = event => {
        const value = event.target.value === '' ? 0 : parseFloat(event.target.value);
        dispatch({ type: 'CHANGE_WORD_SPACING', payload: { wordSpacing: value } });
    }

    const changeLetterSpacing = event => {
        const value = event.target.value === '' ? 0 : parseFloat(event.target.value);
        dispatch({ type: 'CHANGE_LETTER_SPACING', payload: { letterSpacing: value } });
    }

    const changeLineHeight = event => {
        dispatch({ type: 'CHANGE_LINE_HEIGHT', payload: { lineHeight: event.target.value } });
    }

    const changeStrikeFreq = event =>{
        const value = event.target.value === '' ? 0:parseInt(event.target.value);
        dispatch({type:'CHANGE_STRIKE_FREQUENCY',payload:{strikeFreq:value}});
    }

    return (
        <div className="controlpanel spacing">
            <h2>Spacing</h2>
            <Grid columns={2} inverted={isActive} stackable>
                <GridRow >
                    <GridColumn>

                        Word Spacing
                            <input type="number" style={{ marginLeft: '1rem' }} value={parseFloat(state.wordSpacing)} onChange={changeWordSpacing} />

                    </GridColumn>
                </GridRow>
                <GridRow>
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
                <GridRow>
                    <GridColumn>

                        Strike Frequency
                        <input type="number" step="1" style={{ marginLeft: '1rem' }} onChange={changeStrikeFreq} value={state.strikeFreq} />
                    </GridColumn>
                </GridRow>
            </Grid>
        </div>
    );
}

export default Spacing;