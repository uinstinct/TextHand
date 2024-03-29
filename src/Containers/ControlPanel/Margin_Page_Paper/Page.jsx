import { useContext, } from 'react';

import { DarkTheme, } from 'Themes/index';
import { useControl, } from 'Utils/Controls';

import {
    Grid, GridRow, GridColumn,
    Checkbox, Label,
    Divider,
} from 'semantic-ui-react';

export default function Page() {
    const { isActive } = useContext(DarkTheme);
    const [state, dispatch] = useControl();

    const changeClientHeight = (event) => {
        dispatch({ type: 'CHANGE_CLIENT_HEIGHT', payload: { clientHeight: parseInt(event.target.value, 10) } });
    };

    const applyPaperLines = (event, data) => {
        dispatch({ type: 'APPLY_PAPER_LINES', payload: { paperLines: data.checked } });
    };

    return (
        <div className="controlpanel page">
            <Divider horizontal inverted={isActive}>
                <h2>Page</h2>
            </Divider>
            <Grid inverted={isActive} columns={1} stretched>
                <GridRow>
                    <GridColumn>
                        <div className="controlpanel inline">
                            Page Content Length
                            <input
                                type="number"
                                min="200"
                                max="700"
                                value={state.clientHeight}
                                onChange={changeClientHeight}
                                style={{
                                    height: '20px',
                                    width: '100px'
                                }}
                            />
                        </div>
                    </GridColumn>
                </GridRow>
                <GridRow>
                    <GridColumn>
                        <span>
                            <Label color="yellow" pointing="right" horizontal>Beta</Label>
                            {' '}
                            Apply Paper Lines
                            <Checkbox
                                style={{ marginLeft: '0.5rem' }}
                                onChange={applyPaperLines}
                                defaultChecked={!!state.paperLines}
                            />
                        </span>
                    </GridColumn>
                </GridRow>
            </Grid>
        </div>
    );
}