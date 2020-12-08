import { useContext, useState, } from 'react';

import { DarkTheme, } from 'Themes/index';
import { navbarDropdownOptions, } from 'Utils/options';

import {
    Menu, Segment,
    Label, Dropdown,
    Button, Checkbox,
} from 'semantic-ui-react';
import Guide from './guide';
import './index.css';

export default function NavbarIndex() {
    const darkTheme = useContext(DarkTheme);

    const changeMode = (event, data) => {
        darkTheme.setDarkmode(data.checked);
    };

    const [showGuide, setShowGuide] = useState(false);

    const dropdownOptions = navbarDropdownOptions.map((option) => (
        <Dropdown.Item
            key={option.text}
        >
            <a
                target="_blank"
                rel="noreferrer noopenner"
                href={option.value}
                style={{ color: 'black' }}
            >
                {option.text}
            </a>
        </Dropdown.Item>
    ));

    return (
        <>
            <Segment inverted={darkTheme.isActive}>
                <Menu inverted={darkTheme.isActive} secondary pointing>
                    <Menu.Item
                        name="TextHand"
                        active
                    />
                    <Menu.Item>
                        <Dropdown text="Something missing?">
                            <Dropdown.Menu inverted>
                                {dropdownOptions}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
                    <Menu.Item position="right">
                        <Button
                            color="olive"
                            inverted={darkTheme.isActive}
                            onClick={() => setShowGuide(true)}
                            style={{ marginRight: '2rem' }}
                            id="guide-modal"
                        >
                            Guide
                        </Button>
                        <Checkbox
                            toggle
                            checked={darkTheme.isActive}
                            onChange={changeMode}
                        />
                        <span style={{ marginLeft: '1rem' }}>
                            <Label
                                color={darkTheme.isActive
                                    ? 'violet' : 'blue'}
                                horizontal
                            >
                                {darkTheme.isActive
                                    ? 'Dark Mode' : 'Light Mode'}
                            </Label>
                        </span>
                    </Menu.Item>
                </Menu>
            </Segment>
            <Guide showGuide={showGuide} setShowGuide={setShowGuide} />
        </>
    );
}