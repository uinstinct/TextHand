import React, { useContext } from 'react';

//import { DarkTheme } from '../../Themes';
import { DarkTheme } from "Themes/index";
import { useControl } from '../Controls';

import {
    Grid, GridRow, GridColumn,
    Input,
    Popup, Label
} from 'semantic-ui-react';

const options = [
    {
        text: "normal",
        value: 400,
    },
    {
        text: "light",
        value: 150,
    },
    {
        text: "lighter",
        value: 10,
    },
    {
        text: "bold",
        value: 600,
    },
    {
        text: "bolder",
        value: 800,
    }
];


function addFontFromFile(fileObj) {
    const reader = new FileReader();
    reader.readAsArrayBuffer(fileObj);
    reader.onload = (e) => {
        const newFont = new FontFace('loadedFont', e.target.result);
        newFont.load().then((loadedFace) => {
            document.fonts.add(loadedFace);
        });
    };
}


function Font() {
    const { isActive } = useContext(DarkTheme);
    const [state, dispatch] = useControl();

    const changeFontFamily = event => {
        addFontFromFile(event.target.files[0]);
        dispatch({ type: 'CHANGE_FONT_FAMILY', payload: { fontFamily: 'loadedFont' } });
    }

    const changeFontSize = (event) => {
        const value = event.target.value === '' ? 0 : parseInt(event.target.value);
        dispatch({ type: 'CHANGE_FONT_SIZE', payload: { fontSize: value } });
    }

    const changeFontSizeRandom = (event) => {
        const value = event.target.value === '' ? 0 : parseInt(event.target.value);
        dispatch({ type: 'CHANGE_FONT_SIZE_RANDOM', payload: { fontSizeRandom: value } });
    }

    const changeInkColour = (event) => {
        dispatch({ type: 'CHANGE_FONT_COLOUR', payload: { fontColour: event.target.value } });
    }

    const changeFontWeight = (event) => {
        dispatch({ type: 'CHANGE_FONT_WEIGHT', payload: { fontWeight: event.target.value } });
    }

    const changeWordRotation = (event) => {
        const value = event.target.value === "" ? 0 : parseFloat(event.target.value);
        dispatch({ type: 'CHANGE_WORD_ROTATION', payload: { wordRotation: value } });
    }

    return (
        <div className="controlpanel font">
            <h2>Font</h2>
            <Grid inverted={isActive} doubling>
                <GridRow columns={1}>
                    <GridColumn>

                        Font Family
                        <Popup inverted={isActive} trigger=
                            {
                                <input type='file' accept='.ttf,.otf'  onChange={changeFontFamily} style={{ marginLeft: '1rem' }} />
                            } content='Upload files of .ttf and .otf format only' />

                    </GridColumn>
                </GridRow>
                <GridRow columns={2}>
                    <GridColumn>

                        Font Size
                            <input type="number" onChange={changeFontSize} value={parseInt(state.fontSize)} min="0"/>

                    </GridColumn>
                    <GridColumn>

                        Randomize Value
                            <input type='number' min='0' max='30' style={{ width: '3rem' }} onChange={changeFontSizeRandom} value={state.fontSizeRandom} />

                    </GridColumn>
                </GridRow>
                <GridRow columns={2}>
                    <GridColumn>

                        Ink Colour
                            <Input type='color' inverted={isActive} style={{ marginLeft: '1rem' }} onChange={changeInkColour} />

                    </GridColumn>
                    <GridColumn>

                        <Label color="red" pointing="right" horizontal>Bug</Label> Font Weight
                        {/*Revert to semantic dropdown if you still see whitespace at bottom https://github.com/uinstinct/TextHand/commit/c305337f3890b9c37f053b1a9fea6cbdd350c8c9*/}
                        <select onChange={changeFontWeight} defaultValue={state.fontWeight}>
                            {options.map(opt =>
                                <option key={opt.text}
                                    value={opt.value}>
                                    {opt.text}
                                </option>
                            )}
                        </select>

                    </GridColumn>
                </GridRow>
                <GridRow columns={1}>
                    <GridColumn>

                        Word Rotation (in degs)
                            <br />
                        <input
                            size='small' type='number'
                            step='0.1' min='0' max='10'
                            onChange={changeWordRotation}
                            value={parseFloat(state.wordRotation)}
                        />

                    </GridColumn>
                </GridRow>
            </Grid>
        </div>
    );
}

export default Font;