import { useContext, useEffect } from 'react';

import { DarkTheme } from 'Themes/index';
import { useControl } from 'Utils/Controls';

import {
    Grid, GridRow, GridColumn,
    Divider, Popup,
    Button
} from 'semantic-ui-react';
import { loadFont, saveFont, deleteFont } from 'Utils/db/fontFile';

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
    const { isActive, } = useContext(DarkTheme);
    const [, dispatch] = useControl();

    const changeFontFamily = (event) => {
        addFontFromFile(event.target.files[0], true);
        dispatch({ type: 'CHANGE_FONT_FAMILY', payload: { fontFamily: 'loadedFont', }, });
    };

    const resetFontFamily = () => {
        deleteFont();
        dispatch({ type: 'CHANGE_FONT_FAMILY', payload: { fontFamily: 'Homemade Apple', }, });
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
        <div className="controlpanel family">
            <Grid inverted={isActive} doubling>
                <Divider horizontal inverted={isActive}>
                    <h3>Family</h3>
                </Divider>
                <GridRow columns={1}>
                    <GridColumn>

                        <span
                            className="controlpanel inline"
                            style={{ width: 'auto', }}
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
                                            marginLeft: '1rem',
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
                            />
                        </span>

                    </GridColumn>
                </GridRow>
                <GridRow>
                    <select
                        className="controlpanel select"
                    >
                        <option>go</option>
                    </select>
                </GridRow>

            </Grid>
        </div>
    );
}