import { useState, useContext } from 'react';

import { DarkTheme } from 'Themes/index';

import Generated from './Generated';
import Text from './Text';

import { GridColumn, Segment } from 'semantic-ui-react';
import "./index.css";


export default function Editor() {
    const { isActive } = useContext(DarkTheme)

    const [text, setText] = useState('');

    return (
        <>
            <GridColumn>
                <Segment inverted={isActive} piled secondary>
                    <h1>Generator</h1>
                    <div style={{ color: 'black' }}>
                        <Generated text={text} />
                    </div>
                </Segment>
            </GridColumn>
            <GridColumn>
                <Segment inverted={isActive} raised stacked >
                    <h1>Writer</h1>
                    <Text text={text} setText={setText} />
                </Segment>
            </GridColumn>
        </>
    );

}