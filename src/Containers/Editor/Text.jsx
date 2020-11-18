import React from 'react';
import { Form, TextArea } from 'semantic-ui-react';


function Text(props) {
    const changeInput = (event,data) => {
        props.setText(data.value);
    }
    return (
        <Form>
            <div className="text-area container">
                <TextArea placedholder='type your text here' className='text-area core' value={props.text} onInput={changeInput} />
            </div>
        </Form>
    );
}

export default Text;