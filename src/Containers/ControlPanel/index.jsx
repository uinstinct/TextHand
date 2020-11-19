import React, { useContext } from 'react';
import { DarkTheme } from 'Themes';

import Font from './Font';
import MarginPage from './Margin_Page';
import SpacingSign from './Spacing_Sign';
import Extras from './Extras';

import {
    Segment,
    Grid, GridRow, GridColumn
} from 'semantic-ui-react';
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
                            <MarginPage />
                        </GridColumn>
                        <GridColumn>
                            <SpacingSign/>
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