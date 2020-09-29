import React, { useMemo, useContext } from 'react';
import { saveAs } from 'file-saver';

import { DarkTheme } from '../../Themes';

import { Image, Segment, Grid, GridRow, GridColumn, Button } from 'semantic-ui-react';

function ShowOutput(props) {
    const { isActive } = useContext(DarkTheme);

    const allImageURLs = [];

    const images = useMemo(() => {
        if (props.images.length > 0) {
            let tempImages = [];
            for (let i = 0; i < props.images.length; i += 4) {
                let row = [];
                for (let j = i; j < props.images.length && j < i + 4; j++) {
                    const imageURL = props.images[j].toDataURL('image/jpeg')
                    allImageURLs.push(imageURL);
                    const col =
                        <GridColumn>
                            <Image src={imageURL} size='large' />
                            <br />
                            <a download href={imageURL} > <Button inverted={isActive} > Download</Button></a>
                        </GridColumn>;
                    row.push(col);
                }
                const tempImageRow = <GridRow columns={4}>{row}</GridRow>
                tempImages.push(tempImageRow);
            }
            return tempImages;
        } else return [];
    }, [props.images, isActive]);

    const doDownloadAll = () => {
        allImageURLs.forEach((imageURL, index) => {
            saveAs(imageURL, `${index}.jpg` )
        })
    }

    return (
        <>
            <Segment inverted={isActive} >
                <Grid>
                    {images.length > 0 ?
                        <>
                            <Button inverted={isActive} onClick={doDownloadAll}>Download All</Button>
                            {images}
                        </>
                        : <h3>Start Generating</h3>
                    }
                </Grid>
            </Segment>
        </>
    );
}

export default ShowOutput;