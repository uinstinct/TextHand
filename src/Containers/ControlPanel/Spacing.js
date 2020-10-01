import React, { useContext } from 'react';

import { DarkTheme } from '../../Themes';
import { useControl } from '../Controls';

import { Grid, GridRow, GridColumn, Input, Checkbox } from 'semantic-ui-react';

function Spacing() {
    const { isActive } = useContext(DarkTheme);
    const [state, dispatch] = useControl();

    const changeLetterSpacing = event => {
        dispatch({ type: 'CHANGE_LETTER_SPACING', payload: { letterSpacing: event.target.value } });
    }

    return (
        <>
            <h2>Spacing</h2>
            <Grid columns={2} inverted={isActive} stackable>
                <GridRow >
                    <GridColumn>
                        Word Spacing
                            <Input size='mini' inverted={isActive} style={{ marginLeft: '1rem' }} />
                    </GridColumn>
                    <GridColumn style={{ marginLeft:'1rem' }}>
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
                        <Input size='mini' inverted={isActive} style={{ marginLeft: '1rem' }} />
                    </GridColumn>
                </GridRow>
            </Grid>
        </>
    );
}

export default Spacing;