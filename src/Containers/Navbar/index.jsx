import { useContext, useState } from 'react';

import Guide from './guide';

import { DarkTheme } from 'Themes/index';

import {
    Menu, Segment,
    Label,
    Button, Checkbox
} from 'semantic-ui-react';
import "./index.css";


export default function NavbarIndex() {

    const darkTheme = useContext(DarkTheme);

    const changeMode = (event, data) => {
        darkTheme.setDarkmode(data.checked);
    }

    const [showGuide, setShowGuide] = useState(false);
    
    return (
        <>
            <Segment inverted={darkTheme.isActive}>
                <Menu inverted={darkTheme.isActive} secondary pointing>
                    <Menu.Item
                        name='home'
                        active={true}
                    />
                    <Menu.Item >
                        <a target='_blank' rel='noopener noreferrer' href="https://t.me/AdityaMitra" >
                            Report a Bug
                        </a>
                    </Menu.Item>
                    <Menu.Item position='right'>
                        <Button color='olive'
                            inverted={darkTheme.isActive}
                            onClick={() => setShowGuide(true)}
                            style={{ marginRight: '2rem' }}
                            id='guide-modal'
                        >
                            Show Guide
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
            <Guide showGuide={showGuide} setShowGuide={setShowGuide} />
        </>
    );
}
