import React, {  useState, useEffect, useRef } from 'react';
import marked from 'marked';

import guideFile from '../../assets/guide.md';

import { Modal, ModalHeader, ModalContent, ModalActions, Button } from 'semantic-ui-react';

function Rules({ showGuide, setShowGuide}) {

    const [md, setMd] = useState('');
    const isMounted = useRef(true);

    useEffect(() => {
        fetch(guideFile)
            .then(response => response.text())
            .then(text => {
                if (isMounted) {
                    setMd(marked(text));
                    isMounted.current = false;
                }
            })
            .catch(e => console.log('error while fetching guide.md', e));

    }, []);

    return (
        <>
            <Modal
                open={showGuide}
                onOpen={() => setShowGuide(true)}
                onClose={() => setShowGuide(false)}
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
                        onClick={() => setShowGuide(false)}
                        positive
                    />
                </ModalActions>
            </Modal>
        </>
    );

}

export default Rules;