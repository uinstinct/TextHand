import React, { useContext } from 'react';

import { DarkTheme } from '../../Themes';
import { useControl } from '../Controls';

import { Input, Popup, Checkbox, Button } from 'semantic-ui-react';


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
    const [state, dispatch] = useControl();

    const changeBackgroundImage = event => {
        addImageToBackground(event.target.files[0]);
    }
    const changeToWhiteBackground = () => {
        var editorContainer = document.getElementById('page-container');
        editorContainer.style.background = "white";
    }

    const changeResolutionScale = event => {
        const value = event.target.value === '' ? 0 : parseFloat(event.target.value);
        dispatch({ type: 'CHANGE_RESOLUTION_SCALE', payload: { resolutionScale: value } });
    }

    const applyShadowEffect = (event, data) => {
        dispatch({ type: 'APPLY_SHADOW_EFFECT', payload: { shadowEffect: data.checked } });
    }

    const applyResetAll = () => {
        dispatch({ type: 'APPLY_RESET' });
    }

    return (
        <>
            <h2>Extras</h2>

            Background Image
            <Popup inverted={isActive}
                trigger=
                {
                    <span>
                        <Input size='mini' type='file' accept='.jpg,.jpeg,.png' inverted={isActive} onChange={changeBackgroundImage} />
                        <Button circular style={{ marginLeft: '0.2rem' }} size='mini' inverted={isActive} icon='repeat' onClick={changeToWhiteBackground} />
                    </span>
                } content={instructions.imageUpload}>

            </Popup>


            <div style={{ margin: '10px 0' }} />

            Resolution Scale
            <Popup inverted={isActive}
                trigger={
                    <Input size='mini' min='0' max='2' step='0.1' inverted={isActive} onChange={changeResolutionScale} type='number' style={{ display: 'block', appearance: 'none' }} value={parseFloat(state.resolutionScale)} />
                } content={instructions.resolutionScale} />

            <div style={{ margin: '1rem' }}>
                Use Shadow Effect
                <Checkbox style={{ marginLeft: '1rem' }} slider onChange={applyShadowEffect} defaultChecked={JSON.parse(state.shadowEffect)} />
            </div>

            <Popup on='click' position='right center' inverted={isActive}
                content={<Button size='big' color='red' inverted={isActive} onClick={applyResetAll} >Reset All</Button>}
                trigger={<Button icon='repeat' inverted={isActive} size='big' />} />

        </>
    );
}

export default Extras;