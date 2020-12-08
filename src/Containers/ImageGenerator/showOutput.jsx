import { useMemo, useContext, } from 'react';
import { saveAs, } from 'file-saver';
import { jsPDF as JsPDF, } from 'jspdf';

import { DarkTheme, } from 'Themes/index';
import GenerationProgress from 'Containers/GenerationProgress';

import {
    Segment, Label, Icon,
    Grid, GridRow, GridColumn,
    Button,
} from 'semantic-ui-react';
import './index.css';

export default function ShowOutput(
    {
        removeImage, images: allImageURLs, removeAllImages, loading
    }
) {
    const { isActive } = useContext(DarkTheme);

    const images = useMemo(() => {
        if (allImageURLs.length > 0) {
            const tempImages = [];

            for (let i = 0; i < allImageURLs.length; i += 4) {
                const row = [];

                for (let j = i; j < allImageURLs.length && j < i + 4; j += 1) {
                    const imageURL = allImageURLs[j];

                    const col = (
                        <GridColumn key={j}>
                            <Label circular attached="top right" color="red" style={{ cursor: 'pointer' }} onClick={() => removeImage(j)}>
                                <Icon inverted={isActive} name="close" size="big" />
                            </Label>
                            <br />
                            <img src={imageURL} alt={j} />
                            <br />
                            <a download href={imageURL}>
                                <Button inverted={isActive}> Download</Button>
                            </a>
                        </GridColumn>
                    );

                    row.push(col);
                }

                const tempImageRow = <GridRow key={i} columns={4}>{row}</GridRow>;
                tempImages.push(tempImageRow);
            }
            return tempImages;
        } return [];
    }, [allImageURLs, removeImage, isActive]);

    const doDownloadAll = () => {
        allImageURLs.forEach((imageURL, index) => {
            saveAs(imageURL, `${index + 1 < 10 ? '0' + (index + 1) : index + 1}.jpg`);
        });
    };

    const doDownloadAllAsPDF = () => {
        const doc = new JsPDF('p', 'pt', 'a4');
        const { height, width } = doc.internal.pageSize;

        for (let i = 0; i < allImageURLs.length; i += 1) {
            doc.text(10, 20, '');
            doc.addImage(allImageURLs[i], 'JPEG', 25, 50, width - 50, height - 80, 'image-' + i, 'FAST');
            if (i !== allImageURLs.length - 1) doc.addPage();
        }
        doc.save();
    };

    return (
        <div className="outputarea">
            {loading || images.length === 0
                ? (
                    <>
                        <GenerationProgress />
                    </>
                )
                : (
                    <>
                        <Segment inverted={isActive} className="outputarea segment">
                            <GenerationProgress attached />
                            <Grid stackable>
                                <GridRow columns={3}>
                                    <GridColumn floated="left">
                                        <Button
                                            inverted={isActive}
                                            onClick={doDownloadAll}
                                        >
                                            <Icon
                                                name="download"
                                                inverted={isActive}
                                            />
                                            Download All
                                        </Button>
                                        <Button
                                            floated="right"
                                            inverted={isActive}
                                            onClick={removeAllImages}
                                        >
                                            Remove All Images
                                        </Button>
                                    </GridColumn>
                                    <GridColumn floated="right">
                                        <Button
                                            inverted={isActive}
                                            onClick={doDownloadAllAsPDF}
                                        >
                                            <Icon
                                                name="file pdf"
                                                inverted={isActive}
                                            />
                                            Download All as PDF
                                        </Button>
                                    </GridColumn>
                                </GridRow>
                                {images}
                            </Grid>
                        </Segment>
                    </>
                )}
        </div>
    );
}