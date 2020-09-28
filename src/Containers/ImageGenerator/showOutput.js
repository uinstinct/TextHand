import React, { useMemo } from 'react';
import { Image } from 'semantic-ui-react';

function ShowOutput(props) {
    const images = useMemo(() => {
        if (props.images.length > 0) {
            const tempImages = props.images.map(image => {
                return <Image src={image.toDataURL()} />
            })
            return tempImages;
        } else return [];
    }, [props.images]);
    return (
        <>
            {images.length > 0 ?
                <>Working
                    {images}
                </>
                : "Start Generating"}
        </>
    );
}

export default ShowOutput;