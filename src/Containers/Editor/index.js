import React, { useState, useContext } from 'react';

import Generated from './Generated';
import Text from './Text';
import { DarkTheme } from '../../Themes';

import { GridColumn, Segment } from 'semantic-ui-react';
import "./index.css";


function Editor() {
    const { isActive } = useContext(DarkTheme)

    const [text, setText] = useState('');

    return (
        <>
            <GridColumn>
                <Segment inverted={isActive} piled secondary>
                        <h1>Generated</h1>
                    <div style={{ color: 'black' }}>
                        <Generated text={text} />
                    </div>
                </Segment>
            </GridColumn>
            <GridColumn>
                <Segment inverted={isActive} raised stacked >
                    <h1>Text Area</h1>
                    <Text text={text} setText={setText} />
                </Segment>
            </GridColumn>
        </>
    );

}

export default Editor;