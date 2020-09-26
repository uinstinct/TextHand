import React, { useContext } from 'react';

import { DarkTheme } from '../../Themes';

import { Segment, Grid, GridRow, GridColumn, Input, Checkbox } from 'semantic-ui-react';

function Margin() {
    const { isActive } = useContext(DarkTheme);
    return (
        <>
            <h2>Margin</h2>
            <Grid inverted={isActive} columns={2} stretched>
                <GridRow>
                    <GridColumn>
                        Left
                            <Input size={'mini'} inverted={isActive} />
                    </GridColumn>
                    <GridColumn>
                        Right
                            <Input size={'mini'} inverted={isActive} />
                    </GridColumn>
                </GridRow>
                <GridRow>
                    <GridColumn>
                        Top
                            <Input size={'mini'} inverted={isActive} />
                    </GridColumn>
                    <GridColumn>
                        Bottom
                            <Input size={'mini'} inverted={isActive} />
                    </GridColumn>
                </GridRow>
            </Grid>
        </>
    );
}

export default Margin;