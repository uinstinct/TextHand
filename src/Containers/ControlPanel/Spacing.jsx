import React, { useContext } from 'react';

import { DarkTheme } from '../../Themes';
import { useControl } from '../Controls';

import {
    Grid, GridRow, GridColumn,
    Input
} from 'semantic-ui-react';


let signTimer = null;
function showSignature() {
    const signature = document.getElementById("signature");
    signature.style.display = "block";
    clearTimeout(signTimer);
    signTimer = setTimeout(() => {
        signature.style.display = "none";
    }, 1000);
}

const options = [
    {
        text: "Top Right",
        value: "top-right",
    },
    {
        text: "Bottom Right",
        value: "bottom-right",
    }
];

export default function Spacinge() {
    const { isActive } = useContext(DarkTheme);
    const [state, dispatch] = useControl();

    const changeWordSpacing = event => {
        const value = event.target.value === '' ? 0 : parseFloat(event.target.value);
        dispatch({ type: 'CHANGE_WORD_SPACING', payload: { wordSpacing: value } });
    }

    const changeLetterSpacing = event => {
        const value = event.target.value === '' ? 0 : parseFloat(event.target.value);
        dispatch({ type: 'CHANGE_LETTER_SPACING', payload: { letterSpacing: value } });
    }

    const changeLineHeight = event => {
        dispatch({ type: 'CHANGE_LINE_HEIGHT', payload: { lineHeight: event.target.value } });
    }

    const changeStrikeFreq = event => {
        const value = event.target.value === '' ? 0:parseInt(event.target.value);
        dispatch({ type: 'CHANGE_STRIKE_FREQUENCY', payload: { strikeFreq: value } });
    }

    const changeSignatureValue = event => {
        dispatch({ type: 'CHANGE_SIGNATURE_VALUE', payload: { signValue: event.target.value } });
        showSignature();
    }

    const changeSignaturePosition = event => {
        dispatch({ type: 'CHANGE_SIGNATURE_POSITION', payload: { signPosition: event.target.value } });
        showSignature();
    }

    return (
        <div className="controlpanel spacing">
            <h2>Spacing</h2>
            <Grid columns={2} inverted={isActive} stackable>
                <GridRow >
                    <GridColumn>

                        Word Spacing
                            <input type="number" style={{ marginLeft: '1rem' }} value={parseFloat(state.wordSpacing)} onChange={changeWordSpacing} />

                    </GridColumn>
                    <GridColumn>

                        Letter Spacing
                            <input type="number" style={{ marginLeft: '1rem' }} onChange={changeLetterSpacing} value={parseFloat(state.letterSpacing)} />

                    </GridColumn>
                </GridRow>
                <GridRow>
                    <GridColumn>

                        Line Height
                        <input type="number" step="0.1" style={{ marginLeft: '1rem' }} onChange={changeLineHeight} value={state.lineHeight} />

                    </GridColumn>
                    <GridColumn>

                        Strike Frequency*
                        <input
                            disabled type="number" step="1"
                            style={{ marginLeft: '1rem' }}
                            onChange={changeStrikeFreq}
                            value={state.strikeFreq}
                        />

                    </GridColumn>
                </GridRow>
                <GridRow>
                    <GridColumn>

                        Signature*
                        <Input type="text" size="mini"
                            onChange={changeSignatureValue}
                            value={state.signValue}
                        />

                    </GridColumn>
                    <GridColumn>

                        {state.signValue && state.signValue.length > 0 &&
                            <>
                                Signature Position*
                                <select
                                    defaultValue={state.signPosition}
                                    onChange={changeSignaturePosition}
                                >
                                    {options.map(opt =>
                                        <option key={opt.text}
                                            value={opt.value}>
                                            {opt.text}
                                        </option>
                                    )}
                                </select>
                            </>
                        }

                    </GridColumn>
                </GridRow>
            </Grid>
        </div>
    );
}