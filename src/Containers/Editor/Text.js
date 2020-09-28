import React from 'react';
import { Form, TextArea } from 'semantic-ui-react';


function Text(props) {
    const changeInput = (event,data) => {
        props.setText(data.value);
    }
    return (
        <div className="text-area-container">
            <Form>
                <TextArea placedholder='type your text here' className='text-area' value={props.text} onInput={changeInput} />
            </Form>
        </div>
    );
}

export default Text;