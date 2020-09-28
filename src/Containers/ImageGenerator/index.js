import React, { useContext, useMemo, useState, useEffect } from 'react';

import { DarkTheme } from '../../Themes';

import { Segment, Button, Grid, GridRow, GridColumn } from 'semantic-ui-react';
import { generateImages } from './takeSnapshots';


function ImageGenerator() {

    const { isActive } = useContext(DarkTheme);

    const [loading, setLoading] = useState(false);

    const applyImageGeneration = async () => {
        setLoading(true);
        const images = await generateImages();
        setLoading(false);
        for (let image of images) {
            console.info(image.toDataURL());
        }
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
                    <GridColumn width stretched>
                        <h3>Show section here</h3>
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