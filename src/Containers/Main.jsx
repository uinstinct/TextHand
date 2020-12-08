import { useContext, } from 'react';

import {
    Grid, GridColumn, GridRow,
    Segment,
} from 'semantic-ui-react';

import { DarkTheme, } from 'Themes/index';
import { ControlProvider, } from 'Utils/Controls';

import Editor from './Editor';
import ControlPanel from './ControlPanel';
import ImageGenerator from './ImageGenerator';

export default function Main() {
    const { isActive } = useContext(DarkTheme);

    const handleClick = () => document.getElementById('generate-button').click();

    return (
        <Grid stackable inverted={isActive} className="mainer">
            <ControlProvider>
                <GridRow columns={1}>
                    <GridColumn>
                        <h1>Settings</h1>
                        <em style={{ marginBottom: '1rem' }}>Most of the values are in px</em>
                        <ControlPanel />
                    </GridColumn>
                </GridRow>
                <GridRow textAlign="center">
                    <GridColumn textAlign="center">
                        <Segment
                            inverted={isActive}
                            marginLeft="1rem"
                            paddingLeft="1rem"
                        >
                            <button
                                type="button"
                                className="generate-button"
                                onClick={handleClick}
                            >
                                GENERATE
                            </button>
                        </Segment>
                    </GridColumn>
                </GridRow>
                <GridRow style={{ margin: '1rem' }} columns={2}>
                    <Editor />
                </GridRow>
            </ControlProvider>
            <GridRow stretched>
                <GridColumn>
                    <ImageGenerator />
                </GridColumn>
            </GridRow>
        </Grid>
    );
}