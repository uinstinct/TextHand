import React, { useContext, useState } from 'react';

import { DarkTheme } from '../../Themes';
import { useControl } from '../Controls';

import { Grid, GridRow, GridColumn, Input, Dropdown, Popup } from 'semantic-ui-react';

const options = [
    {
        key: "normal",
        text: "normal",
        value: 400,
    },
    {
        key: "light",
        text: "light",
        value: 150,
    },
    {
        key: "lighter",
        text: "lighter",
        value: 10,
    },
    {
        key: "bold",
        text: "bold",
        value: 600,
    },
    {
        key: "bolder",
        text: "bolder",
        value: 800,
    }
];


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
        addFontFromFile(event.target.files[0]);

        dispatch({ type: 'CHANGE_FONT_FAMILY', payload: { fontFamily: 'temp-font' } });

        setLoading(false);
    }

    const changeFontSize = (event, data) => {
        const value = data.value === '' ? 0 : parseInt(data.value);
        dispatch({ type: 'CHANGE_FONT_SIZE', payload: { fontSize: value } });
    }

    const changeFontSizeRandom = (event) => {
        const value = event.target.value === '' ? 0 : parseInt(event.target.value);
        dispatch({ type: 'CHANGE_FONT_SIZE_RANDOM', payload: { fontSizeRandom: value } });
    }

    const changeInkColour = (event, data) => {
        dispatch({ type: 'CHANGE_FONT_COLOUR', payload: { fontColour: data.value } });
    }

    const changeFontWeight = (event, data) => {
        dispatch({ type: 'CHANGE_FONT_WEIGHT', payload: { fontWeight: data.value } });
    }

    return (
        <>
            <h2>Font</h2>
            <Grid inverted={isActive} doubling>
                <GridRow columns={1}>
                    <GridColumn>

                        Font Family
                        <Popup inverted={isActive} trigger=
                            {
                                <Input type='file' size='small' accept='.ttf,.otf' loading={loading} inverted={isActive} onChange={changeFontFamily} style={{ marginLeft: '1rem' }} />
                            } content='Upload files of .ttf and .otf format only' />

                    </GridColumn>
                </GridRow>
                <GridRow columns={2}>
                    <GridColumn>

                        Font Size
                            <Input size='mini' inverted={isActive} onChange={changeFontSize} value={parseInt(state.fontSize)} />

                    </GridColumn>
                    <GridColumn>

                        Randomize Value
                            <input type='number' min='0' max='20' style={{ width: '3rem' }} onChange={changeFontSizeRandom} value={state.fontSizeRandom} />

                    </GridColumn>
                </GridRow>
                <GridRow columns={2}>
                    <GridColumn>

                        Ink Colour
                            <Input type={'color'} inverted={isActive} style={{ marginLeft: '1rem' }} onChange={changeInkColour} />

                    </GridColumn>
                    <GridColumn>

                        Font Weight
                        <Dropdown 
                            placeholder='Select Font Weight'
                            options={options}
                            onChange={changeFontWeight}
                            openOnFocus closeOnEscape
                            style={{ marginLeft: '2rem' }}
                        />

                    </GridColumn>
                </GridRow>
            </Grid>
        </>
    );
}

export default Font;