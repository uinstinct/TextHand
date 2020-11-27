import { useContext } from 'react';
import { DarkTheme } from 'Themes/index';

import {
    Segment,
    Grid, GridRow, GridColumn
} from 'semantic-ui-react';
import FontFamilyRandomizers from './Font_Family_Randomizers';
import MarginPagePaper from './Margin_Page_Paper';
import SpacingSign from './Spacing_Sign';
import Extras from './Extras';

import './index.css';

export default function ControlPanelIndex() {
    const { isActive, } = useContext(DarkTheme);
    return (
        <div className="main container">
            <Segment raised inverted={isActive}>
                <Grid stackable divided columns={4} inverted={isActive}>
                    <GridRow>
                        <GridColumn>
                            <FontFamilyRandomizers />
                        </GridColumn>
                        <GridColumn>
                            <MarginPagePaper />
                        </GridColumn>
                        <GridColumn>
                            <SpacingSign />
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