import React, { useContext } from 'react';

import { DarkTheme } from '../../Themes';
import { useControl } from '../Controls';

import { Grid, GridRow, GridColumn, Input, Checkbox } from 'semantic-ui-react';

function Spacing() {
    const { isActive } = useContext(DarkTheme);
    const dispatch = useControl()[1]; //const [state, dispatch] = useControl();

    const changeLetterSpacing = event => {
        dispatch({ type: 'CHANGE_LETTER_SPACING', payload: { letterSpacing: event.target.value } });
    }

    const changeLineHeight = event => {
        dispatch({ type: 'CHANGE_LINE_HEIGHT', payload: { lineHeight: event.target.value } });
    }

    const changeWordSpacing = event => {
        dispatch({ type: 'CHANGE_WORD_SPACING', payload: { wordSpacing: event.target.value } });
    }

    return (
        <>
            <h2>Spacing</h2>
            <Grid columns={2} inverted={isActive} stackable>
                <GridRow >
                    <GridColumn>
                        Word Spacing
                            <Input size='mini' inverted={isActive} style={{ marginLeft: '1rem' }} onChange={changeWordSpacing} />
                    </GridColumn>
                    <GridColumn style={{ marginLeft:'0.5rem' }}>
                        Randomize
                            <Checkbox style={{ marginTop: '1.5rem', marginLeft: '1rem' }} />
                    </GridColumn>
                </GridRow>
                <GridRow>
                    <GridColumn>
                        Letter Spacing
                            <Input size='mini' inverted={isActive} style={{ marginLeft: '1rem' }} onChange={changeLetterSpacing} />
                    </GridColumn>
                </GridRow>
                <GridRow>
                    <GridColumn>
                        Line Height
                        <Input size='mini' inverted={isActive} style={{ marginLeft: '1rem' }} onChange={changeLineHeight} />
                    </GridColumn>
                </GridRow>
            </Grid>
        </>
    );
}

export default Spacing;