import React, { useContext } from 'react';

import { DarkTheme } from '../../Themes';
import { useControl } from '../Controls';

import { Grid, GridRow, GridColumn, Input } from 'semantic-ui-react';

function Margin() {
    const { isActive } = useContext(DarkTheme);
    const dispatch = useControl()[1]; // const [state,dispatch] = useControl();

    const changeMarginLeft = event => {
        const value = parseInt(event.target.value);
        dispatch({ type: 'CHANGE_MARGIN_LEFT', payload: { marginLeft: value } });
    }

    const changeMarginRight = event => {
        const value = parseInt(event.target.value);
        dispatch({ type: 'CHANGE_MARGIN_RIGHT', payload: { marginRight: value } });
    }

    const changeMarginTop = event => {
        const value = parseInt(event.target.value);
        dispatch({ type: 'CHANGE_MARGIN_TOP', payload: { marginTop: value } });
    }

    const changeMarginBottom = event => {
        const value = parseInt(event.target.value);
        dispatch({ type: 'CHANGE_MARGIN_BOTTOM', payload: { marginBottom: value } });
    }

    return (
        <>
            <h2>Margin</h2>
            <Grid inverted={isActive} columns={2} stretched>
                <GridRow>
                    <GridColumn>
                        Left
                            <Input size={'mini'} inverted={isActive} onChange={changeMarginLeft} />
                    </GridColumn>
                    <GridColumn>
                        Right
                            <Input size={'mini'} inverted={isActive} onChange={changeMarginRight} />
                    </GridColumn>
                </GridRow>
                <GridRow>
                    <GridColumn>
                        Top
                            <Input size={'mini'} inverted={isActive} onChange={changeMarginTop} />
                    </GridColumn>
                    <GridColumn>
                        Bottom
                            <Input size={'mini'} inverted={isActive} onChange={changeMarginBottom} />
                    </GridColumn>
                </GridRow>
            </Grid>
        </>
    );
}

export default Margin;