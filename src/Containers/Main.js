import React, { useContext } from 'react';

import { Grid, GridColumn, GridRow } from 'semantic-ui-react';

import Editor from './Editor';
import ControlPanel from './ControlPanel';

import { DarkTheme } from '../Themes';
import { ControlProvider } from './Controls';


function Main() {
    const { isActive } = useContext(DarkTheme)

    return (
        <Grid columns={2} inverted={isActive} >
            <ControlProvider>
                <GridRow>
                    <GridColumn>
                        <h1>Editor</h1>
                        <Editor />
                    </GridColumn>
                    <GridColumn>
                        <h1>Control Panel</h1>
                        <ControlPanel />
                    </GridColumn>
                </GridRow>
            </ControlProvider>
        </Grid>
    );
}

export default Main;