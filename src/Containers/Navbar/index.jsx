import { useContext, useState } from 'react';

import { DarkTheme } from 'Themes/index';

import {
    Menu, Segment,
    Label,
    Button, Checkbox
} from 'semantic-ui-react';
import Guide from './guide';
import './index.css';

export default function NavbarIndex() {
    const darkTheme = useContext(DarkTheme);

    const changeMode = (event, data) => {
        darkTheme.setDarkmode(data.checked);
    };

    const [showGuide, setShowGuide] = useState(false);

    return (
        <>
            <Segment inverted={darkTheme.isActive}>
                <Menu inverted={darkTheme.isActive} secondary pointing>
                    <Menu.Item
                        name="home"
                        active
                    />
                    <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" href="mailto:uinstinct@outlook.com?subject=I%20want%20to%20tell%20you%20something%20about%20TextHand&body=Please%20mention%20by%20stating%20any%20of%20the%20following%3A%0A-%20I%20found%20a%20bug%20that%20I%20want%20you%20to%20report%20to%0A-%20I%20have%20a%20great%20feature%20in%20my%20mind%20and%20would%20like%20you%20to%20add%20it">
                            Report a Bug
                        </a>
                    </Menu.Item>
                    <Menu.Item position="right">
                        <Button
                            color="olive"
                            inverted={darkTheme.isActive}
                            onClick={() => setShowGuide(true)}
                            style={{ marginRight: '2rem', }}
                            id="guide-modal"
                        >
                            Show Guide
                        </Button>
                        <Checkbox
                            toggle
                            checked={darkTheme.isActive}
                            onChange={changeMode}
                        />
                        <span style={{ marginLeft: '1rem', }}>
                            <Label color={darkTheme.isActive ? 'violet' : 'blue'} horizontal>
                                {darkTheme.isActive ? 'Dark Mode' : 'Light Mode'}
                            </Label>
                        </span>
                    </Menu.Item>
                </Menu>
            </Segment>
            <Guide showGuide={showGuide} setShowGuide={setShowGuide} />
        </>
    );
}