import { useContext, } from 'react';

import { DarkTheme, } from 'Themes/index';
import { useControl, } from 'Utils/Controls';
import { destroyDB as destroyFontFileDB, } from 'Utils/db/fontFile';

import {
    Popup,
    Checkbox, Button,
    Divider,
} from 'semantic-ui-react';

export default function Extras() {
    const { isActive } = useContext(DarkTheme);
    const [state, dispatch] = useControl();

    const changeResolutionScale = (event) => {
        const value = event.target.value === '' ? 0 : parseFloat(event.target.value);
        dispatch({
            type: 'CHANGE_RESOLUTION_SCALE',
            payload: { resolutionScale: value }
        });
    };

    const applyShadowEffect = (event, data) => {
        dispatch({
            type: 'APPLY_SHADOW_EFFECT',
            payload: { shadowEffect: data.checked }
        });
    };

    const applyResetAll = () => {
        /* we do not need to destroy the controls db
         * because it is being destroyed and created on every write */
        destroyFontFileDB();
        dispatch({ type: 'APPLY_RESET' });
    };

    const applyPreserveIndentation = (event, data) => {
        dispatch({
            type: 'APPLY_PRESERVE_INDENTATION',
            payload: { preserveIndentation: data.checked }
        });
    };

    return (
        <div className="controlpanel extras">
            <Divider horizontal inverted={isActive}>
                <h2>Extras</h2>
            </Divider>

            <div className="controlpanel inline">
                Resolution
                <Popup
                    inverted={isActive}
                    trigger={(
                        <input
                            min="0.7"
                            max="4"
                            step="0.1"
                            type="number"
                            onChange={changeResolutionScale}
                            value={parseFloat(state.resolutionScale)}
                        />
                    )}
                    content="Enter a value between 0 and 1 in decimals"
                />
            </div>

            <div
                style={{ margin: '1rem' }}
            >
                Apply Shadow Effect
                <Checkbox
                    slider
                    style={{ marginLeft: '1rem' }}
                    checked={!!state.shadowEffect}
                    onChange={applyShadowEffect}
                />
            </div>

            <div
                style={{ margin: '1rem' }}
            >
                Preserve Indentation
                <Checkbox
                    style={{ marginLeft: '1rem' }}
                    defaultChecked={!!state.preserveIndentation}
                    onChange={applyPreserveIndentation}
                />
            </div>

            <Popup
                on="click"
                position="right center"
                inverted={isActive}
                content={(
                    <Button
                        color="red"
                        icon="repeat"
                        inverted={isActive}
                        onClick={applyResetAll}
                    />
                )}
                trigger={(
                    <Button inverted={isActive}>
                        Reset All
                    </Button>
                )}
            />
        </div>
    );
}