import React, { useContext } from 'react'
import { Menu, Segment, Checkbox } from 'semantic-ui-react'
import { DarkTheme } from '../../Themes';

import "./index.css";


export default function NavbarIndex() {

    const darkTheme = useContext(DarkTheme);

    const changeMode = (event, data) => {
        darkTheme.setDarkmode(data.checked);
    }
    
    return (
        <Segment inverted={darkTheme.isActive}>
            <Menu inverted={darkTheme.isActive} secondary pointing>
                <Menu.Item
                    name='home'
                    active={true}
                />
                <Menu.Item position='right'>
                    <Checkbox toggle
                        checked={darkTheme.isActive}
                        onChange={changeMode}
                    />
                    <span style={{ marginLeft:'1rem' }}>
                        {darkTheme.isActive?"Dark Mode":"Light Mode"}
                    </span>
                </Menu.Item>
            </Menu>
        </Segment>
    )
}
