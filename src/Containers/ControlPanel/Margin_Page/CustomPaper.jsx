import React, { useContext } from 'react';

import { DarkTheme } from 'Themes';
import { useControl } from 'Containers/Controls';

import {
    Grid, GridRow, GridColumn,
    Button,
    Divider, Popup
} from 'semantic-ui-react';

const paperOptions = [
    {
        text: "Paper 2",
        value: "paper-2.jpg"
    },
    {
        text: "Paper 3",
        value: "paper-3.jpg"
    },
    {
        text: "Paper 4",
        value: "paper-4.jpg"
    }
]

function addImageToBackground(url) {
    var editorContainer = document.getElementById('page-container');
    editorContainer.style.background = `url(${url})`;
    editorContainer.style.backgroundSize = 'cover';
}

function readFileAndChangeBG(fileObj) {
    const reader = new FileReader();
    reader.readAsDataURL(fileObj);
    reader.onload = e => addImageToBackground(e.target.result);
}


export default function CustomPaper() {

    const { isActive } = useContext(DarkTheme);
    const [state, dispatch] = useControl();

    const changePaper = event => console.log(event.target.value);

    const changeToWhiteBackground = () => {
        var editorContainer = document.getElementById('page-container');
        editorContainer.style.background = "white";
    }

    return (
        <div className="controlpanel custom-paper">
            <Divider horizontal inverted={isActive} >
                <h2>BACKGROUND</h2>
            </Divider>
            <Grid inverted={isActive} columns={1} stretched>
                <GridRow>
                    <GridColumn>
                        Custom Paper
                        <div className="controlpanel inline"
                            style={{ width: "100%"}}>
                        <Popup
                            inverted={isActive}
                            trigger=
                            {
                                    <input
                                        type='file'
                                        accept=".jpg,.jpeg,.png"
                                    onChange=
                                    {e =>
                                        readFileAndChangeBG(e.target.files[0])
                                    }
                                    />
                            }
                            content="Upload a valid image of type jpg or png">

                        </Popup>
                        <Button
                                circular size='mini' icon='repeat'
                                inverted={isActive}
                                onClick={changeToWhiteBackground}
                                style={{
                                    alignSelf: "flex-end",
                                    justifySelf: "flex-end"

                                }}
                            />
                            </div>
                    </GridColumn>
                </GridRow>
                <GridRow columns={1}>
                    <GridColumn>
                        <select
                            className="controlpanel select"
                            onChange={e=>changePaper(e)}
                        >
                            {paperOptions.map(p =>
                                <option
                                    value={p.value}
                                >{p.text}</option>
                            )}
                        </select>
                    </GridColumn>
                </GridRow>
            </Grid>
        </div>
    );
}