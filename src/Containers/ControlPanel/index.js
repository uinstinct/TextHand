import React, { useContext } from 'react';
import { DarkTheme } from '../../Themes';

import Font from './Font';
import Margin from './Margin';
import Spacing from './Spacing';

import { Segment } from 'semantic-ui-react';
import "./index.css";

function ControlPanelIndex() {
    const { isActive } = useContext(DarkTheme);
    return (
        <div className='main container'>
            <Segment raised inverted={isActive}>
                <Font />
                <Margin />
                <Spacing />
            </Segment>
        </div>
    );

}

export default ControlPanelIndex;