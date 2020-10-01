import React, { useContext, useState } from 'react';

import { DarkTheme } from '../../Themes';
import { useControl } from '../Controls';

import { Grid, GridRow, GridColumn, Input, Checkbox, Dropdown, Popup } from 'semantic-ui-react';

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
        let value = parseInt(data.value);
        value = isNaN(value) ? 0 : value;
        dispatch({ type: 'CHANGE_FONT_SIZE', payload: { fontSize: value } });
    }

    const changeInkColour = (event, data) => {
        dispatch({ type: 'CHANGE_FONT_COLOUR', payload: { fontColour: data.value } });
    }

    const changeFontWeight = (event, data) => {
        dispatch({ type: 'CHANGE_FONT_WEIGHT', payload: { fontWeight: data.value } });
    }

    return (
        // the h2 font does not change if the actions is dispatched once, because this component is not re-rendered
        <>
            <h2>Font</h2>
            <Grid inverted={isActive} doubling>
                <GridRow columns={1}>
                    <GridColumn>
                        Font Family
                        <Popup inverted={isActive} trigger=
                            {
                                <Input type='file' accept='.ttf,.otf' loading={loading} inverted={isActive} onChange={changeFontFamily} style={{ marginLeft: '1rem' }} />
                            } content='Upload files of .ttf and .otf format only'/>
                    </GridColumn>
                </GridRow>
                <GridRow columns={2}>
                    <GridColumn>
                        Font Size
                            <Input size='mini' inverted={isActive} onChange={changeFontSize} />
                    </GridColumn>
                    <GridColumn>
                        Randomize
                            <Checkbox style={{ marginTop: '1.5rem', marginLeft: '1rem' }} />
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