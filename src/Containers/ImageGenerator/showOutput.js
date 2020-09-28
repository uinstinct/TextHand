import React, { useMemo, useContext } from 'react';
import { Image, Segment, Grid, GridRow, GridColumn } from 'semantic-ui-react';
import { DarkTheme } from '../../Themes';

function ShowOutput(props) {
    const { isActive } = useContext(DarkTheme);

    const images = useMemo(() => {
        if (props.images.length > 0) {
            let tempImages = [];
            for (let i = 0; i < props.images.length; i += 4) {
                let row = [];
                for (let j = i; j < props.images.length && j < i + 4; j++) {
                    const col =
                        <GridColumn>
                            <Image src={props.images[j].toDataURL()} size='large' />
                        </GridColumn>;
                    row.push(col);
                }
                const tempImageRow = <GridRow columns={4}>{row}</GridRow>
                tempImages.push(tempImageRow);
            }
            return tempImages;
        } else return [];
    }, [props.images]);

    return (
        <>
            <Segment inverted={isActive} >
                <Grid>
                    {images.length > 0 ?
                        <>{images}</>
                        : "Start Generating"
                    }
                </Grid>
            </Segment>
        </>
    );
}

export default ShowOutput;