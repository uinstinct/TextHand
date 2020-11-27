import { useContext } from 'react';

import { DarkTheme } from 'Themes/index';
import { useControl } from 'Utils/Controls';
import { fontWeightOptions } from 'Utils/options';

import {
    Grid, GridRow, GridColumn,
    Divider,
    Input
} from 'semantic-ui-react';

export default function Font() {
    const { isActive, } = useContext(DarkTheme);
    const [state, dispatch] = useControl();

    const changeFontSize = (event) => {
        const value = event.target.value === '' ? 0 : parseInt(event.target.value, 10);
        dispatch({ type: 'CHANGE_FONT_SIZE', payload: { fontSize: value, }, });
    };

    const changeInkColour = (event) => {
        dispatch({ type: 'CHANGE_FONT_COLOUR', payload: { fontColour: event.target.value, }, });
    };

    const changeFontWeight = async (event) => {
        dispatch({ type: 'CHANGE_FONT_WEIGHT', payload: { fontWeight: event.target.value, }, });
    };

    return (
        <div className="controlpanel font">
            <Grid inverted={isActive} doubling>
                <Divider horizontal inverted={isActive}>
                    <h2>Font</h2>
                </Divider>
                <GridRow columns={2}>
                    <GridColumn>

                        Font Size
                        <input type="number" onChange={changeFontSize} value={parseInt(state.fontSize, 10)} min="0" />

                    </GridColumn>
                    <GridColumn>

                        Font Weight
                        <select
                            onChange={changeFontWeight}
                            defaultValue={state.fontWeight}
                            className="controlpanel select"
                        >
                            {fontWeightOptions.map((opt) => (
                                <option
                                    key={opt.text}
                                    value={opt.value}
                                >
                                    {opt.text}
                                </option>
                            ))}
                        </select>

                    </GridColumn>
                </GridRow>
                <GridRow columns={2}>
                    <GridColumn>
                        <div className="controlpanel inline">
                            Ink Colour
                            <Input
                                type="color"
                                inverted={isActive}
                                style={{ marginLeft: '1rem', }}
                                onChange={changeInkColour}
                            />
                        </div>

                    </GridColumn>
                </GridRow>

            </Grid>
        </div>
    );
}