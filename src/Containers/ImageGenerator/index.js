import React, { useContext, useState } from 'react';

import { DarkTheme } from '../../Themes';
import { progress } from '../GenerationProgress';

import { generateImages } from './takeSnapshots';
import ShowOutput from './showOutput';

import { Segment, Grid, GridRow, GridColumn } from 'semantic-ui-react';

async function applyFilters(canvases) {

    let newImages = [];
    if (canvases.length > 0) {
        for (const convertedCanvas of canvases) {
            const convertedImageURI = convertedCanvas.toDataURL();
            const imgEl = document.createElement('img');
            imgEl.src = convertedImageURI;

            async function makeNewImage() {
                return new Promise((resolve, reject) => {
                    imgEl.onload = function () {
                        const newCanvas = document.createElement('canvas');
                        newCanvas.width = imgEl.width;
                        newCanvas.height = imgEl.height;

                        const ctx = newCanvas.getContext('2d');
                        //ctx.filter = "contrast(25)";

                        /* ctx.filter = "blur(2px)";
                         * preview the filters in OVERLAY and NOT GENERATEDCONTAINER
                         * do not use another canvas
                         * most values are in %
                         * refer https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter
                         * this is a default html slider - <input type="range" min="1" max="100" />
                         * styling has to be done manually
                         */
                        ctx.drawImage(imgEl, 0, 0);

                        const newImage = newCanvas.toDataURL();
                        resolve(newImage);
                    }
                });
            }

            const newImg = await makeNewImage();
            newImages.push(newImg);
        }
    }
    return newImages;
}


function ImageGenerator() {

    const { isActive } = useContext(DarkTheme);

    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);


    const applyImageGeneration = async () => {
        const { updateProgress } = progress;
        updateProgress({ type: "START" });
        setLoading(true);

        const newCanvases = await generateImages();
        const filteredImages = await applyFilters(newCanvases);
        const newImages = images.concat(filteredImages);
        setImages(newImages);

        setLoading(false);
    }


    const removeImage = (idx) => {
        let newImages = [];
        for (let i = 0; i < images.length; i++) {
            if (i !== idx) {
                newImages.push(images[i]);
            }
        }
        setImages(newImages);
    }

    const removeAllImages = () => {
        setImages([]);
    }

    return (
        <div style={{ margin: "1rem", padding: "1rem" }}>
            <Grid>
                <GridRow textAlign='center'>
                    <GridColumn textAlign='center'>
                        <Segment inverted={isActive} >
                            <button disabled={loading} onClick={applyImageGeneration} >
                                GENERATE
                            </button>
                        </Segment>
                    </GridColumn>
                </GridRow>
                <GridRow style={{ margin: '0 1rem' }} columns={1} stretched>
                    <GridColumn>
                        <h3>Showing output here</h3>
                        <ShowOutput images={images} removeImage={removeImage} removeAllImages={removeAllImages} />
                    </GridColumn>
                </GridRow>
            </Grid>
        </div>
    );
}

export default ImageGenerator;