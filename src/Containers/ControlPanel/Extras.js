import React, { useContext } from 'react';

import { DarkTheme } from '../../Themes';
import { useControl } from '../Controls';

import { Input, Popup } from 'semantic-ui-react';


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

    return (
        <>
            <h2>Extras</h2>
            Background Image
            <Popup inverted={isActive}
                trigger=
                {
                    <Input size='small' type='file' accept='.jpg,.jpeg,.png' inverted={isActive} onChange={changeBackgroundImage} />
                } content="Upload a valid image of type jpg or png" />
            
        </>
    );
}

export default Extras;