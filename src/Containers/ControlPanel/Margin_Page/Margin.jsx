import React, { useContext } from 'react';

import { DarkTheme } from 'Themes';
import { useControl } from 'Containers/Controls';

import {
    Grid, GridRow, GridColumn,
    Divider
} from 'semantic-ui-react';

export default function Margin() {

    const { isActive } = useContext(DarkTheme);
    const [state, dispatch] = useControl();

    const changeMarginLeft = event => {
        const value = event.target.value === '' ? 0 : parseInt(event.target.value);
        dispatch({ type: 'CHANGE_MARGIN_LEFT', payload: { marginLeft: value } });
    }

    const changeMarginRight = event => {
        const value = event.target.value === '' ? 0 : parseInt(event.target.value);
        dispatch({ type: 'CHANGE_MARGIN_RIGHT', payload: { marginRight: value } });
    }

    const changeMarginTop = event => {
        const value = event.target.value === '' ? 0 : parseInt(event.target.value);
        dispatch({ type: 'CHANGE_MARGIN_TOP', payload: { marginTop: value } });
    }

    return (
        <div className="controlpanel margin">
            <Divider inverted={isActive} horizontal>
                <h2>Margin</h2>
            </Divider>
            <Grid inverted={isActive} columns={3} stretched>
                <GridRow>
                    <GridColumn>
                        Left
                            <input type="number" value={parseInt(state.marginLeft)} onChange={changeMarginLeft} />
                    </GridColumn>
                    <GridColumn>
                        Right
                            <input type="number" value={parseInt(state.marginRight)} onChange={changeMarginRight} />
                    </GridColumn>
                    <GridColumn>
                        Top
                            <input type="number" value={parseInt(state.marginTop)} onChange={changeMarginTop} />
                    </GridColumn>
                </GridRow>
            </Grid>
        </div>
    );
}