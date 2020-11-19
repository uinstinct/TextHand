import React, { useContext } from 'react';

import { DarkTheme } from '../../Themes';
import { useControl } from '../Controls';

import {
    Popup,
    Checkbox, Button,
    Divider
} from 'semantic-ui-react';


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


export default function Extras() {
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
            <Divider horizontal inverted={isActive}>
                <h2>Extras</h2>
            </Divider>

            Background Image
            <Popup inverted={isActive}
                trigger=
                {
                    <span
                        className="controlpanel inline"
                        style={{ width: "100%" }}
                    >
                        <input
                            type='file'
                            accept='.jpg,.jpeg,.png'
                            onChange={changeBackgroundImage}
                        />
                        <Button
                            circular size='mini' icon='repeat'
                            inverted={isActive}
                            onClick={changeToWhiteBackground}
                        />
                    </span>
                } content={instructions.imageUpload}>

            </Popup>


            <div style={{ margin: '10px 0' }} />

            <div className="controlpanel inline">
                Resolution Scale
            <Popup inverted={isActive}
                    trigger={
                        <input min='0.7' max='4' step='0.1' type='number'
                            onChange={changeResolutionScale}
                            value={parseFloat(state.resolutionScale)}
                        />
                    }
                    content={instructions.resolutionScale}
                />
            </div>

            <div
                style={{ margin: '1rem' }}
            >
                Use Shadow Effect
                <Checkbox slider
                    style={{ marginLeft: '1rem' }}
                    defaultChecked={JSON.parse(state.shadowEffect)}
                    onChange={applyShadowEffect}
                />
            </div>

            <div
                style={{ margin: '1rem' }}
            >
                Preserve Indentation
                <Checkbox
                    style={{ marginLeft: '1rem' }}
                    defaultChecked={JSON.parse(state.preserveIndentation)}
                    onChange={applyPreserveIndentation}
                />
            </div>

            <Popup
                on='click' position='right center'
                inverted={isActive}
                content={
                    <Button
                        color='red'
                        icon='repeat'
                        inverted={isActive}
                        onClick={applyResetAll}
                    />
                }
                trigger={
                    <Button icon='repeat' inverted={isActive}>
                        Reset All
                    </Button>
                }
            />
        </div>
    );
}