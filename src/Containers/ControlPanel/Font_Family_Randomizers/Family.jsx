import { useContext, useEffect, } from 'react';

import { DarkTheme, } from 'Themes/index';
import { useControl, } from 'Utils/Controls';

import {
    Grid, GridRow, GridColumn,
    Divider, Popup,
    Button,
} from 'semantic-ui-react';
import { loadFont, saveFont, deleteFont, } from 'Utils/db/fontFile';
import { fontFamilyOptions, } from '../../../Utils/options';

function addFontFromFile(fileObj, shouldSaveFont) {
    if (shouldSaveFont) {
        saveFont(fileObj);
    }

    const reader = new FileReader();
    reader.readAsArrayBuffer(fileObj);
    reader.onload = (e) => {
        const newFont = new FontFace('loadedFont', e.target.result);
        newFont.load().then((loadedFace) => {
            document.fonts.add(loadedFace);
        });
    };
}

export default function Font() {
    const { isActive } = useContext(DarkTheme);
    const [state, dispatch] = useControl();

    const changeFontFamily = (event) => {
        if (event.target.files) {
            addFontFromFile(event.target.files[0], true);
            dispatch({ type: 'CHANGE_FONT_FAMILY', payload: { fontFamily: 'loadedFont' } });
        } else {
            dispatch({ type: 'CHANGE_FONT_FAMILY', payload: { fontFamily: event.target.value } });
        }
    };

    const resetFontFamily = () => {
        deleteFont();
        dispatch({ type: 'CHANGE_FONT_FAMILY', payload: { fontFamily: 'Homemade Apple' } });
    };

    useEffect(() => {
        setTimeout(async () => {
            const file = await loadFont();
            if (file) {
                addFontFromFile(file, false);
                dispatch({ type: 'CHANGE_FONT_FAMILY', payload: { fontFamily: 'loadedFont' } });
            }
        }, 2000);
    }, []);

    return (
        <div className="controlpanel family">
            <Grid inverted={isActive} doubling>
                <Divider horizontal inverted={isActive}>
                    <h3>Family</h3>
                </Divider>
                <GridRow columns={1}>
                    <GridColumn>

                        <span
                            className="controlpanel inline"
                            style={{ width: 'auto' }}
                        >
                            Font Family
                            <Popup
                                inverted={isActive}
                                trigger={(
                                    <input
                                        id="font-file-input"
                                        type="file"
                                        accept=".ttf,.otf"
                                        onChange={changeFontFamily}
                                        style={{
                                            marginLeft: '1rem'
                                        }}
                                    />
                                )}
                                content="Upload files of .ttf and .otf format only"
                            />
                            <Button
                                circular
                                size="mini"
                                icon="repeat"
                                inverted={isActive}
                                onClick={resetFontFamily}
                                aria-label="reset-font-family"
                            />
                        </span>

                    </GridColumn>
                </GridRow>
                <GridRow>
                    <label
                        htmlFor="font-family-options"
                        style={{ marginLeft: '10px' }}
                    >
                        Or choose from Options
                        <select
                            className="controlpanel select"
                            id="font-family-options"
                            defaultValue={state.fontFamily}
                            onChange={changeFontFamily}
                        >
                            {fontFamilyOptions.map((font) => (
                                <option
                                    key={font.text}
                                    value={font.value}
                                >
                                    {font.text}
                                </option>
                            ))}
                        </select>
                    </label>
                </GridRow>

            </Grid>
        </div>
    );
}