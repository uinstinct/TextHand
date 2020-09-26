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

    const changeFont = event => {
        setLoading(true);
        addFontFromFile(event.target.files[0], dispatch);

        dispatch({ type: 'CHANGE_FONT_FAMILY', payload: { fontFamily: 'temp-font' } });
        // does not work if dispatched once
        dispatch({ type: 'CHANGE_FONT_FAMILY', payload: { fontFamily: 'temp-font' } });

        setLoading(false);
    }

    return (
        <>
            <h2 style={{ fontFamily: state.fontFamily+',cursive' }} className='page-a'>Font</h2>
            <Grid inverted={isActive} columns={3}>
                <GridRow>
                    <GridColumn>
                        Font Family
                            <Input type='file' loading={loading} inverted={isActive} onChange={changeFont}/>
                    </GridColumn>
                </GridRow>
                <GridRow>
                    <GridColumn>
                        Font Size
                            <Input size='mini' inverted={isActive} />
                    </GridColumn>
                    <GridColumn>
                        Randomize
                            <Checkbox style={{ marginTop: '1.5rem', marginLeft: '1rem' }} />
                    </GridColumn>
                </GridRow>
                <GridRow>
                    <GridColumn>
                        Ink Colour
                            <Input type={'color'} inverted={isActive} style={{ marginLeft: '1rem' }} />
                    </GridColumn>
                </GridRow>
            </Grid>
        </>
    );
}

export default Font;