import React, { useContext } from 'react';

import { DarkTheme } from '../../Themes';
import { useControl } from '../Controls';

import { Input, Popup } from 'semantic-ui-react';


const instructions = {
    imageUpload: "Upload a valid image of type jpg or png",
    resolutionScale: "Enter a value between 0 and 1 in decimals"
}

function addImageToBackground(fileObj) {
    const reader = new FileReader();
    reader.readAsDataURL(fileObj);
    reader.onload = e => {
        console.log(e.target.result);
        var editorContainer = document.getElementById('page-container');
        editorContainer.style.background = `url(${e.target.result})`;
    }
}


function Extras() {
    const { isActive } = useContext(DarkTheme);
    const [state, dispatch] = useControl();

    const changeBackgroundImage = event => {
        addImageToBackground(event.target.files[0]);
    }

    const changeResolutionScale = event => {
        const container = document.getElementById('page-container');
        container.setAttribute('resolution-scale', event.target.value);
    }

    return (
        <>
            <h2>Extras</h2>
            Background Image
            <Popup inverted={isActive}
                trigger=
                {
                    <Input size='small' type='file' accept='.jpg,.jpeg,.png' inverted={isActive} onChange={changeBackgroundImage} />
                } content={instructions.imageUpload} />

            <div style={{ margin: '10px 0' }} />

            Resolution Scale
            <Popup inverted={isActive}
                trigger={
                    <Input size='mini' min='0' max='2' inverted={isActive} onChange={changeResolutionScale} type='number' style={{ display: 'block', appearance: 'none' }} />
                } content={instructions.resolutionScale} />
        </>
    );
}

export default Extras;