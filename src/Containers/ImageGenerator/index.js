import React, { useContext } from 'react';
import html2canvas from 'html2canvas'

import { DarkTheme } from '../../Themes';

import { Segment, Button, Grid, GridRow, GridColumn, Placeholder, PlaceholderImage } from 'semantic-ui-react';

async function convertDIVToImage(pageEl) {
    const options = {
        scrollX: 0,
        scrollY: -window.scrollY,
        scale: 1
    };

    const canvas = await html2canvas(pageEl, options);
    return canvas;
}

function ImageGenerator() {

    const { isActive } = useContext(DarkTheme);

    const applyConversion = async () => {
        const pageEl = document.getElementById('core-editor');
        console.log('the element node got is', pageEl);
        const canvas = await convertDIVToImage(pageEl);
        console.info(canvas.toDataURL(),canvas);
    }

    return (
        <div style={{ margin: "1rem", padding: "1rem" }}>
            <Grid doubling stretched>
                <GridRow centered stretched>
                    <Segment inverted={isActive} >
                        <Button onClick={applyConversion} inverted={isActive} > Generate</Button>
                    </Segment>
                </GridRow>
                <GridRow style={{ margin: '0 1rem' }}>
                    <GridColumn width stretched>
                    <Segment inverted={isActive} >
                        <h2>Generated Images</h2>
                        <Placeholder style={{ height: 400, width: 300 }} inverted={isActive} >
                            <PlaceholderImage />
                        </Placeholder>
                        </Segment>
                    </GridColumn>
                </GridRow>
            </Grid>
        </div>
    );
}

export default ImageGenerator;