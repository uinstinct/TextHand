import { useContext } from 'react';

import { DarkTheme } from 'Themes/index';
import { useControl } from 'Utils/Controls';
import { signPositionOptions } from 'Utils/options';

import {
    Grid, GridRow, GridColumn,
    Input,
    Divider
} from 'semantic-ui-react';

let signTimer = null;
function showSignature() {
    const signature = document.getElementById('signature');
    signature.style.display = 'block';
    clearTimeout(signTimer);
    signTimer = setTimeout(() => {
        signature.style.display = 'none';
    }, 1000);
}

export default function Sign() {
    const { isActive, } = useContext(DarkTheme);
    const [state, dispatch] = useControl();

    const changeSignatureValue = (event) => {
        dispatch({ type: 'CHANGE_SIGNATURE_VALUE', payload: { signValue: event.target.value, }, });
        showSignature();
    };

    const changeSignaturePosition = (event) => {
        dispatch({ type: 'CHANGE_SIGNATURE_POSITION', payload: { signPosition: event.target.value, }, });
        showSignature();
    };

    return (
        <div className="controlpanel spacing">
            <Grid columns={2} inverted={isActive} stackable>

                <Divider horizontal inverted={isActive}>
                    <h2>Signature</h2>
                </Divider>
                <GridRow>

                    <GridColumn>

                        Signature*
                        <Input
                            type="text"
                            size="mini"
                            onChange={changeSignatureValue}
                            value={state.signValue}
                        />

                    </GridColumn>
                    <GridColumn>

                        {state.signValue && state.signValue.length > 0
                            && (
                                <>
                                    Signature Position*
                                    <select
                                        defaultValue={state.signPosition}
                                        onChange={changeSignaturePosition}
                                        className="controlpanel select"
                                    >
                                        {signPositionOptions.map((opt) => (
                                            <option
                                                key={opt.text}
                                                value={opt.value}
                                            >
                                                {opt.text}
                                            </option>
                                        ))}
                                    </select>
                                </>
                            )}

                    </GridColumn>
                </GridRow>
            </Grid>
        </div>
    );
}