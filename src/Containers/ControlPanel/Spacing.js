import React, { useContext } from 'react';

import { DarkTheme } from '../../Themes';

import { Grid, GridRow, GridColumn, Input, Checkbox } from 'semantic-ui-react';

function Spacing() {
    const { isActive } = useContext(DarkTheme);
    return (
        <>
            <h2>Spacing</h2>
            <Grid columns={2} inverted={isActive} >
                <GridRow>
                    <GridColumn>
                        Word Spacing
                            <Input size={'mini'} inverted={isActive} style={{ marginLeft: '1rem' }} />
                    </GridColumn>
                    <GridColumn>
                        Randomize
                            <Checkbox style={{ marginTop: '1.5rem', marginLeft: '1rem' }} />
                    </GridColumn>
                </GridRow>
                <GridRow>
                    <GridColumn>
                        Letter Spacing
                            <Input size={'mini'} inverted={isActive} style={{ marginLeft: '1rem' }} />
                    </GridColumn>
                    <GridColumn>
                        Randomize
                            <Checkbox style={{ marginTop: '1.5rem', marginLeft: '1rem' }} />
                    </GridColumn>
                </GridRow>
            </Grid>
        </>
    );
}

export default Spacing;