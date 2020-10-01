import React, { useContext, useState } from 'react'

import Rules from './Rules';

import { DarkTheme } from '../../Themes';

import { Menu, Segment, Checkbox, Label, Button } from 'semantic-ui-react'
import "./index.css";


export default function NavbarIndex() {

    const darkTheme = useContext(DarkTheme);

    const changeMode = (event, data) => {
        darkTheme.setDarkmode(data.checked);
    }

    const [showRules, setShowRules] = useState(false);
    
    return (
        <>
            <Segment inverted={darkTheme.isActive}>
                <Menu inverted={darkTheme.isActive} secondary pointing>
                    <Menu.Item
                        name='home'
                        active={true}
                    />
                    <Menu.Item position='right'>
                        <Button color='olive' inverted={darkTheme.isActive} onClick={() => setShowRules(true)} style={{ marginRight: '2rem' }}>
                            Show Rules
                        </Button>
                        <Checkbox toggle
                            checked={darkTheme.isActive}
                            onChange={changeMode}
                        />
                        <span style={{ marginLeft: '1rem' }}>
                            <Label color={darkTheme.isActive ? 'violet' : 'blue'} horizontal>
                                {darkTheme.isActive ? "Dark Mode" : "Light Mode"}
                            </Label>
                        </span>
                    </Menu.Item>
                </Menu>
            </Segment>
            <Rules showRules={showRules} setShowRules={setShowRules} />
        </>
    );
}
