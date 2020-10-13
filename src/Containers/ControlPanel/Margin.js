import React, { useContext } from 'react';

import { DarkTheme } from '../../Themes';
import { useControl } from '../Controls';

import { Grid, GridRow, GridColumn } from 'semantic-ui-react';

function Margin() {
    const { isActive } = useContext(DarkTheme);
    const [state, dispatch] = useControl();

    const changeMarginLeft = event => {
        const value = event.target.value === '' ? 0 : parseInt(event.target.value);
        dispatch({ type: 'CHANGE_MARGIN_LEFT', payload: { marginLeft:value } });
    }

    const changeMarginRight = event => {
        const value = event.target.value === '' ? 0 : parseInt(event.target.value);
        dispatch({ type: 'CHANGE_MARGIN_RIGHT', payload: { marginRight: value } });
    }

    const changeMarginTop = event => {
        const value = event.target.value === '' ? 0 : parseInt(event.target.value);
        dispatch({ type: 'CHANGE_MARGIN_TOP', payload: { marginTop: value } });
    }

    const changeMarginBottom = event => {
        const value = event.target.value === '' ? 0 : parseInt(event.target.value);
        dispatch({ type: 'CHANGE_MARGIN_BOTTOM', payload: { marginBottom: value } });
    }

    return (
        <>
            <h2>Margin</h2>
            <Grid inverted={isActive} columns={2} stretched>
                <GridRow>
                    <GridColumn>
                        Left
                            <input type="number" value={parseInt(state.marginLeft)} onChange={changeMarginLeft} />
                    </GridColumn>
                    <GridColumn>
                        Right
                            <input type="number" value={parseInt(state.marginRight)} onChange={changeMarginRight} />
                    </GridColumn>
                </GridRow>
                <GridRow>
                    <GridColumn>
                        Top
                            <input type="number" value={parseInt(state.marginTop)} onChange={changeMarginTop} />
                    </GridColumn>
                    <GridColumn>
                        Bottom
                            <input type="number" value={parseInt(state.marginBottom)} onChange={changeMarginBottom} />
                    </GridColumn>
                </GridRow>
            </Grid>
        </>
    );
}

export default Margin;