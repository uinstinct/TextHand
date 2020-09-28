import React, { useContext, useMemo, useState, useEffect } from 'react';

import { DarkTheme } from '../../Themes';

import { generateImages } from './takeSnapshots';
import ShowOutput from './ShowOutput';

import { Segment, Button, Grid, GridRow, GridColumn } from 'semantic-ui-react';

function ImageGenerator() {

    const { isActive } = useContext(DarkTheme);

    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);


    const applyImageGeneration = async () => {
        setLoading(true);
        const canvases = await generateImages();
        setLoading(false);
        console.info(canvases);
        setImages(canvases);

    }

    return (
        <div style={{ margin: "1rem", padding: "1rem" }}>
            <Grid doubling stretched>
                <GridRow centered stretched>
                    <Segment inverted={isActive} >
                        <Button onClick={applyImageGeneration} inverted={isActive} disabled={loading} loading={loading} > Generate</Button>
                    </Segment>
                </GridRow>
                <GridRow style={{ margin: '0 1rem' }}>
                    <GridColumn stretched>
                        <h3>Showing output here</h3>
                        <ShowOutput images={images}/>
                    </GridColumn>
                </GridRow>
            </Grid>
        </div>
    );
}

export default ImageGenerator;




/*
 <Segment inverted={isActive} >
                        <h2>Generated Images</h2>
                        <Placeholder style={{ height: 400, width: 300 }} inverted={isActive} >
                            <PlaceholderImage />
                        </Placeholder>
                        </Segment>
                        */