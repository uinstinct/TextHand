import React, { useMemo, useContext } from 'react';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';

import { DarkTheme } from '../../Themes';

import { Image, Segment, Grid, GridRow, GridColumn, Button, Label, Icon, Dimmer, Loader, Placeholder } from 'semantic-ui-react';

function ShowOutput(props) {
    const { isActive } = useContext(DarkTheme);

    const allImageURLs = [];

    const images = useMemo(() => {

        if (props.images.length > 0) {
            let tempImages = [];

            for (let i = 0; i < props.images.length; i += 4) {
                let row = [];

                for (let j = i; j < props.images.length && j < i + 4; j++) {

                    const imageURL = props.images[j];
                    allImageURLs.push(imageURL);

                    const col =
                        <GridColumn key={j}>
                            <Label circular attached='top right' color='red' style={{ cursor: 'pointer' }} onClick={() => props.removeImage(j)}>
                                <Icon inverted={isActive} name='close' size='big' />
                            </Label>
                            <br />
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

    const doDownloadAllAsPDF = () => {
        const doc = new jsPDF('p', 'pt', 'a4');
        const width = doc.internal.pageSize.width;
        const height = doc.internal.pageSize.height;

        for (const i in allImageURLs) {
            doc.text(10, 20, '');
            doc.addImage(allImageURLs[i], 'JPEG', 25, 50, width - 50, height - 80, 'image-true');
            if (i !== allImageURLs.length - 1)
                doc.addPage();
        }
        doc.save();

    }

    return (
        <>
            <Segment inverted={isActive} >
                {props.loading && images.length === 0 ?
                    <>
                        <Dimmer active>
                            <Loader indeterminate>Preparing your Images</Loader>
                        </Dimmer>
                        <Placeholder>
                            <Placeholder.Image>
                            </Placeholder.Image>
                        </Placeholder>
                    </>
                    :

                    <Grid stackable>
                        {images.length > 0 ?
                            <>
                                <GridRow columns={3}>
                                    <GridColumn floated='left'>
                                        <Button inverted={isActive} onClick={doDownloadAll}><Icon name='download' inverted={isActive} />Download All</Button>
                                        <Button floated='right' inverted={isActive} onClick={props.removeAllImages}>Remove All Images</Button>
                                    </GridColumn>
                                    <GridColumn floated='right'>
                                        <Button inverted={isActive} onClick={doDownloadAllAsPDF}><Icon name='file pdf' inverted={isActive} /> Download All as PDF</Button>
                                    </GridColumn>
                                </GridRow>
                                {images}
                            </>
                            : 
                            <h3>Start Generating</h3>
                        }
                    </Grid>
                }
            </Segment>
        </>
    );
}

export default ShowOutput;