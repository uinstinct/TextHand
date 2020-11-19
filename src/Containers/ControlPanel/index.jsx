import React, { useContext } from 'react';
import { DarkTheme } from 'Themes';

import Font from './Font';
import Margin from './Margin';
import Spacing from './Spacing';
import Extras from './Extras';

import { Segment, Grid, GridRow, GridColumn } from 'semantic-ui-react';
import "./index.css";

function ControlPanelIndex() {
    const { isActive } = useContext(DarkTheme);
    return (
        <div className='main container'>
            <Segment raised inverted={isActive}>
                <Grid stackable divided columns={4} inverted={isActive} >
                    <GridRow>
                        <GridColumn>
                            <Font />
                        </GridColumn>
                        <GridColumn>
                            <Margin />
                        </GridColumn>
                        <GridColumn>
                            <Spacing/>
                        </GridColumn>
                        <GridColumn>
                            <Extras />
                        </GridColumn>
                    </GridRow>
                </Grid>
            </Segment>
        </div>
    );

}

export default ControlPanelIndex;