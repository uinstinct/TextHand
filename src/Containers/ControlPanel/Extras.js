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
        var editorContainer = document.getElementById('page-container');
        editorContainer.style.background = `url(${e.target.result})`;
    }
}


function Extras() {
    const { isActive } = useContext(DarkTheme);
    const [state,dispatch] = useControl();

    const changeBackgroundImage = event => {
        addImageToBackground(event.target.files[0]);
    }

    const changeResolutionScale = event => {
        const value = event.target.value === '' ? 0 : parseFloat(event.target.value);
        dispatch({ type: 'CHANGE_RESOLUTION_SCALE', payload: { resolutionScale: value } });
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
                    <Input size='mini' min='0' max='2' inverted={isActive} onChange={changeResolutionScale} type='number' style={{ display: 'block', appearance: 'none' }} value={parseFloat(state.resolutionScale)} />
                } content={instructions.resolutionScale} />
        </>
    );
}

export default Extras;