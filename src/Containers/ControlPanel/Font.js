import React, { useContext } from 'react';

import { DarkTheme } from '../../Themes';

import { Grid, GridRow, GridColumn, Input, Checkbox } from 'semantic-ui-react';

function Font() {
    const { isActive } = useContext(DarkTheme);
    return (
        <>
            <h2>Font</h2>
            <Grid inverted={isActive} columns={3}>
                <GridRow>
                    <GridColumn>
                        Font Family
                            <Input type='file' inverted={isActive} />
                    </GridColumn>
                </GridRow>
                <GridRow>
                    <GridColumn>
                        Font Size
                            <Input size='mini' inverted={isActive} />
                    </GridColumn>
                    <GridColumn>
                        Randomize
                            <Checkbox style={{ marginTop: '1.5rem', marginLeft: '1rem' }} />
                    </GridColumn>
                </GridRow>
                <GridRow>
                    <GridColumn>
                        Ink Colour
                            <Input type={'color'} inverted={isActive} style={{ marginLeft: '1rem' }} />
                    </GridColumn>
                </GridRow>
            </Grid>
        </>
    );
}

export default Font;