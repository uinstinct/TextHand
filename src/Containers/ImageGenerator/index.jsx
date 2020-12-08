import { useContext, useState, } from 'react';

import { DarkTheme, } from 'Themes/index';
import { progress, } from 'Containers/GenerationProgress';

import generateCanvases from 'Utils/takeSnapshots';
import {
    Segment,
    Grid, GridRow, GridColumn,
} from 'semantic-ui-react';
import applyFilters from 'Utils/applyFilters';

import ShowOutput from './showOutput';

export default function ImageGenerator() {
    const { isActive } = useContext(DarkTheme);

    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);

    const applyImageGeneration = async () => {
        const { updateProgress } = progress;
        updateProgress({ type: 'START' });
        setLoading(true);

        const canvases = await generateCanvases();
        const filteredImages = await applyFilters(canvases);
        const newImages = images.concat(filteredImages);
        setImages(newImages);

        setLoading(false);
    };

    const removeImage = (idx) => {
        const newImages = [];
        for (let i = 0; i < images.length; i += 1) {
            if (i !== idx) {
                newImages.push(images[i]);
            }
        }
        setImages(newImages);
    };

    const removeAllImages = () => {
        setImages([]);
    };

    return (
        <div style={{ margin: '1rem', padding: '1rem' }}>
            <Grid>
                <GridRow textAlign="center">
                    <GridColumn textAlign="center">
                        <Segment inverted={isActive}>
                            <button
                                type="button"
                                disabled={loading}
                                onClick={applyImageGeneration}
                                id="generate-button"
                            >
                                GENERATE
                            </button>
                        </Segment>
                    </GridColumn>
                </GridRow>
                <GridRow style={{ margin: '0 1rem' }} columns={1} stretched>
                    <GridColumn>
                        <h3>Output Images</h3>
                        <ShowOutput
                            images={images}
                            removeImage={removeImage}
                            removeAllImages={removeAllImages}
                        />
                    </GridColumn>
                </GridRow>
            </Grid>
        </div>
    );
}