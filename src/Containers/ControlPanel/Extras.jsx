import React, { useContext } from 'react';

import { DarkTheme } from '../../Themes';
import { useControl } from '../Controls';

import { Popup, Checkbox, Button } from 'semantic-ui-react';


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
        editorContainer.style.backgroundSize = 'cover';
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
        localStorage.clear();
        dispatch({ type: 'APPLY_RESET' });
    }

    const applyPreserveIndentation = (event, data) => {
        dispatch({ type: 'APPLY_PRESERVE_INDENTATION', payload: { preserveIndentation: data.checked } });
    }

    return (
        <div className="controlpanel extras">
            <h2>Extras</h2>

            Background Image
            <Popup inverted={isActive}
                trigger=
                {
                    <span>
                        <input type='file' accept='.jpg,.jpeg,.png' onChange={changeBackgroundImage} />
                        <Button circular style={{ marginLeft: '0.2rem' }} size='mini' inverted={isActive} icon='repeat' onClick={changeToWhiteBackground} />
                    </span>
                } content={instructions.imageUpload}>

            </Popup>


            <div style={{ margin: '10px 0' }} />

            Resolution Scale
            <Popup inverted={isActive}
                trigger={
                    <input min='0.8' max='4' step='0.1' onChange={changeResolutionScale} type='number' style={{ display: 'block', appearance: 'none' }} value={parseFloat(state.resolutionScale)} />
                } content={instructions.resolutionScale} />

            <div style={{ margin: '1rem' }}>
                Use Shadow Effect
                <Checkbox style={{ marginLeft: '1rem' }} slider onChange={applyShadowEffect} defaultChecked={JSON.parse(state.shadowEffect)} />
            </div>

            <div style={{ margin: '1rem' }}>
                Preserve Indentation
                <Checkbox style={{ marginLeft: '1rem' }} onChange={applyPreserveIndentation} defaultChecked={JSON.parse(state.preserveIndentation)} />
            </div>

            <Popup on='click' position='right center' inverted={isActive}
                content={<Button size='big' color='red' inverted={isActive} onClick={applyResetAll} >Reset All</Button>}
                trigger={<Button icon='repeat' inverted={isActive} size='big' />} />
            <br />

            
        </div>
    );
}

export default Extras;