import React, { useContext, useState } from 'react';

import { DarkTheme } from '../../Themes';

import { Grid, GridRow, GridColumn, Input, Checkbox } from 'semantic-ui-react';
import { useControl } from '../Controls';

function addFontFromFile(fileObj) {
    const reader = new FileReader();
    reader.readAsArrayBuffer(fileObj);
    reader.onload = (e) => {
        const newFont = new FontFace('temp-font', e.target.result);
        newFont.load().then((loadedFace) => {
            document.fonts.add(loadedFace);
        });
    };
}

function Font() {
    const { isActive } = useContext(DarkTheme);
    const [state, dispatch] = useControl();
    const [loading, setLoading] = useState(false);

    const changeFontFamily = event => {
        setLoading(true);
        addFontFromFile(event.target.files[0], dispatch);

        dispatch({ type: 'CHANGE_FONT_FAMILY', payload: { fontFamily: 'temp-font' } });

        setLoading(false);
    }

    const changeFontSize = (event, data) => {
        let value = parseInt(data.value);
        value = isNaN(value) ? 0 : value;
        dispatch({ type: 'CHANGE_FONT_SIZE', payload: { fontSize: value } });
    }

    const changeInkColour = (event, data) => {
        dispatch({ type: 'CHANGE_FONT_COLOUR', payload: { fontColour: data.value } });
    }

    return (
        // the h2 font does not change if the actions is dispatched once, because this component is not re-rendered
        <>
            <h2>Font</h2>
            <Grid inverted={isActive} columns={3} >
                <GridRow>
                    <GridColumn>
                        Font Family
                            <Input type='file' loading={loading} inverted={isActive} onChange={changeFontFamily}/>
                    </GridColumn>
                </GridRow>
                <GridRow>
                    <GridColumn>
                        Font Size
                            <Input size='mini' inverted={isActive} onChange={changeFontSize} />
                    </GridColumn>
                    <GridColumn>
                        Randomize
                            <Checkbox style={{ marginTop: '1.5rem', marginLeft: '1rem' }} />
                    </GridColumn>
                </GridRow>
                <GridRow>
                    <GridColumn>
                        Ink Colour
                            <Input type={'color'} inverted={isActive} style={{ marginLeft: '1rem' }} onChange={changeInkColour} />
                    </GridColumn>
                </GridRow>
            </Grid>
        </>
    );
}

export default Font;