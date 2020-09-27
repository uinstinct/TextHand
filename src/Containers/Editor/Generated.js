import React, { useMemo } from 'react';

import { useControl } from '../Controls';

function Generated(props) {
    // override the problems from the done github app

    const [state, dispatch] = useControl();

    const manipulatedStyles = useMemo(() => {
        return {
            background: '#fff', lineHeight: '1.54rem',

            fontFamily: state.fontFamily,
            fontSize: state.fontSize + 'px,20px',
            color: state.color,

            marginLeft: state.marginLeft + 'px',
            marginRight: state.marginRight + 'px',
            marginTop: state.marginTop + 'px',
            marginBottom: state.marginBottom + 'px',
        }
    }, [state]);


    return (
        <div className="generated container">
            <div className="generated core" id="core-editor" style={manipulatedStyles} >
                {props.text}
            </div>
        </div>
    )

}

export default Generated;