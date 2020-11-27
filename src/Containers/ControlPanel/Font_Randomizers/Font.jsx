import { useContext, useEffect } from 'react';

import { DarkTheme } from 'Themes/index';
import { useControl } from 'Utils/Controls';
import { fontWeightOptions } from 'Utils/options';

import {
    Grid, GridRow, GridColumn,
    Divider,
    Input,
    Popup
} from 'semantic-ui-react';
import { loadFont, saveFont } from 'Utils/db/fontFile';

function addFontFromFile(fileObj, shouldSaveFont) {
    if (shouldSaveFont) {
        saveFont(fileObj);
    }

    const reader = new FileReader();
    reader.readAsArrayBuffer(fileObj);
    reader.onload = (e) => {
        console.log(e.target.result, 'was found');
        const newFont = new FontFace('loadedFont', e.target.result);
        newFont.load().then((loadedFace) => {
            document.fonts.add(loadedFace);
        });
    };
}

export default function Font() {
    const { isActive, } = useContext(DarkTheme);
    const [state, dispatch] = useControl();

    const changeFontFamily = (event) => {
        addFontFromFile(event.target.files[0], true);
        dispatch({ type: 'CHANGE_FONT_FAMILY', payload: { fontFamily: 'loadedFont', }, });
    };

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

    useEffect(() => {
        setTimeout(async () => {
            const file = await loadFont();
            if (file) {
                addFontFromFile(file, false);
                dispatch({ type: 'CHANGE_FONT_FAMILY', payload: { fontFamily: 'loadedFont', }, });
            }
        }, 2000);
    }, []);

    return (
        <div className="controlpanel font">
            <Grid inverted={isActive} doubling>
                <Divider horizontal inverted={isActive}>
                    <h2>Font</h2>
                </Divider>
                <GridRow columns={1}>
                    <GridColumn>

                        Font Family
                        <Popup
                            inverted={isActive}
                            trigger={(
                                <input
                                    type="file"
                                    accept=".ttf,.otf"
                                    onChange={changeFontFamily}
                                    style={{ marginLeft: '1rem', }}
                                />
                            )}
                            content="Upload files of .ttf and .otf format only"
                        />

                    </GridColumn>
                </GridRow>
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