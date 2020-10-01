import React, {  useState, useEffect } from 'react';
import marked from 'marked';

import rulesFile from '../../assets/rules.md';

import { Modal, ModalHeader, ModalContent, ModalActions, Button } from 'semantic-ui-react';

function Rules(props) {

    const [md, setMd] = useState('');

    useEffect(() => {
        fetch(rulesFile)
            .then(response => response.text())
            .then(text => {
                setMd(marked(text));
            })
            .catch(e => console.log('error while fetching rules.md', e));

    })

    return (
        <>
            <Modal
                open={props.showRules}
                onOpen={() => props.setShowRules(true)}
                onClose={() => props.setShowRules(false)}
            >
                <ModalHeader>
                    Before you proceed
                </ModalHeader>
                <ModalContent>
                    <div dangerouslySetInnerHTML={{ __html: md }} className="markdown rules">
                    </div>
                </ModalContent>
                <ModalActions>
                    <Button
                        content="Okay!"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={() => props.setShowRules(false)}
                        positive
                    />
                </ModalActions>
            </Modal>
        </>
    );

}

export default Rules;