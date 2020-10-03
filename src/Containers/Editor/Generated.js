import React, { useMemo } from 'react';

import { useControl } from '../Controls';

function createHTML(text) {

    // THIS NEEDS RECONSIDERATION

    const words = text
        //.split(/\s/g)
        //.replace(/ /g, "<span style='margin-left:100px'></span>")
    return words;

    // use this in generated image function
    //let theHTML = "";

    //words.forEach(word => {
    //    const space = parseInt(Math.random() * 10);
    //    const tempSpan = `<span style='margin-right:${space}px'>${word}</span>`;
    //    theHTML += tempSpan;
    //})

    //return theHTML;
}

function Generated(props) {
    // override the problems from the done github app

    const state = useControl()[0]; // const [state, dispatch] = useControl();

    const manipulatedStyles = useMemo(() => {

        return {
            ...state,
        }
    }, [state]);

    const madeHTML = useMemo(() => createHTML(props.text), [props.text]);


    return (
        <div className="generated container" id="page-container" >
            <div className="generated core" id="page-content" style={manipulatedStyles} dangerouslySetInnerHTML={{ __html: madeHTML }} >
            </div>
        </div>
    )

}

export default Generated;