import React, { useState, useContext } from 'react';

import Generated from './Generated';
import Text from './Text';
import { DarkTheme } from '../../Themes';

import { GridColumn, Segment } from 'semantic-ui-react';
import "./index.css";


function Editor() {
    // override the problems from the done github one
    const { isActive } = useContext(DarkTheme)

    const [text, setText] = useState('');


    return (
        <>
            <GridColumn>
                <Segment inverted={isActive} piled>
                    <h1>Generated</h1>
                    <Generated text={text} />
                </Segment>
            </GridColumn>
            <GridColumn>
                <Segment inverted={isActive} raised stacked >
                    <h1>Text Area</h1>
                    <Text text={text} setText={setText} />
                </Segment>
            </GridColumn>
        </>
        )

}

export default Editor;