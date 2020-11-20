import React, { useContext, useEffect } from 'react';
import path from "path";

import { useControl } from 'Containers/Controls';
import {
    addImageToBackground,
    changeToWhiteBackground,
    readFileAndChangeBG
} from "lib/paperChange"

import { DarkTheme } from 'Themes';
import {
    Grid, GridRow, GridColumn,
    Button,
    Divider, Popup
} from 'semantic-ui-react';

const paperOptions = [
    {
        text: "Paper 2",
        value: "paper2"
    },
    {
        text: "Paper 3",
        value: "paper3"
    },
    {
        text: "Paper 4",
        value: "paper4"
    }
]

export default function CustomPaper() {

    const { isActive } = useContext(DarkTheme);
    const [state, dispatch] = useControl();

    const changePaper = event => {
        const paper = event.target.value;
        dispatch({ type: 'CHANGE_PAPER', payload: { pageBG: paper } });
        dispatch({
            type: 'APPLY_SHADOW_EFFECT',
            payload: { shadowEffect: false }
        });
    }

    useEffect(() => {
        if (state.pageBG === "white") {
            changeToWhiteBackground();
        } else {
            addImageToBackground(state.pageBG);
        }
    }, [state.pageBG]);

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
                            style={{ width: "100%" }}>
                            <Popup
                                inverted={isActive}
                                trigger=
                                {
                                    <input
                                        type='file'
                                        accept=".jpg,.jpeg,.png"
                                        onChange=
                                        {e =>
                                            readFileAndChangeBG(
                                                e.target.files[0]
                                            )
                                        }
                                    />
                                }
                                content=
                                "Upload a valid image of type jpg or png">

                            </Popup>
                            <Button
                                circular size='mini' icon='repeat'
                                inverted={isActive}
                                onClick={() =>
                                    changePaper(
                                        { target: { value: "white" } }
                                    )
                                }
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
                            onChange={changePaper}
                            value={state.pageBG}
                        >
                            <option disabled value="white">None</option>
                            {paperOptions.map(p =>
                                <option
                                    key={p.text}
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