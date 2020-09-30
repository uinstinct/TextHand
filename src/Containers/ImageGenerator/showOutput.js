import React, { useMemo, useContext } from 'react';
import { saveAs } from 'file-saver';

import { DarkTheme } from '../../Themes';

import { Image, Segment, Grid, GridRow, GridColumn, Button, Label, Icon } from 'semantic-ui-react';

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
                        <GridColumn key={j}>
                            <Label attached='top right' color='red' style={{cursor: 'pointer'}} onClick={() => props.removeImage(j)}>
                                <Icon inverted={isActive} name='close' size='big' />
                            </Label>
                            <br/>
                            <Image src={imageURL} size='large' />
                            <br />
                            <a download href={imageURL} >
                                <Button inverted={isActive} > Download</Button>
                            </a>
                        </GridColumn>;

                    row.push(col);
                }

                const tempImageRow = <GridRow key={i} columns={4}>{row}</GridRow>
                tempImages.push(tempImageRow);
            }
            return tempImages;
        } else return [];
    }, [props, allImageURLs, isActive]);

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
                            <Button floated='right' inverted={isActive} onClick={props.removeAllImages}>Remove All Images</Button>
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