import React from 'react';
import { Form, TextArea } from 'semantic-ui-react';


function Text(props) {
    const changeInput = (event,data) => {
        props.setText(data.value);
    }
    return (
        <Form className='text-area form' >
            <TextArea placedholder='type your text here' className='text-area' value={props.text} onInput={changeInput} />
        </Form>
    );
}

export default Text;