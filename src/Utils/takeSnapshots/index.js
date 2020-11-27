import { copyControls } from 'Utils/Controls';
import { progress } from 'Containers/GenerationProgress';

import {
    convertContainerToCanvas,
    preserveIndentation,
    putInWordArray,
    Overlay
} from './helpers';
import Randomizer from './randomizers';

export default async function generateImages() {
    const { applyRandomization, } = new Randomizer();
    const { addOverlay, removeOverlay, } = new Overlay(JSON.parse(copyControls.shadowEffect));

    const { updateProgress, } = progress;
    const canvases = [];

    const container = document.getElementById('page-container');
    const content = document.getElementById('page-content');

    container.scrollTo(0, 0);
    container.style.overflowY = 'hidden';

    const { scrollHeight, } = content;
    const { clientHeight, } = copyControls;
    const totalPages = Math.ceil(scrollHeight / clientHeight) + 1;

    /* preserve the last word or letter also */
    const copiedText = content.innerHTML.trim() + ' lastDummy';

    const splitContent = preserveIndentation(copyControls.preserveIndentation, copiedText);

    let currentWordPos = 0;
    // const { applyRandomization } = new Randomizer(totalPages, splitContent.length);

    for (let i = 0; i < totalPages; i += 1) {
        updateProgress({ type: 'INCREMENT_PROGRESS', payload: { i, totalPages, }, });

        const words = [];
        let text = '';
        content.innerHTML = '';

        while (
            content.scrollHeight <= clientHeight
            && words.length <= splitContent.length
        ) {
            const word = splitContent[currentWordPos];
            if (!word) {
                break;
            } else {
                putInWordArray(
                    word, words, applyRandomization
                );
            }

            text = words.join(' ');

            content.innerHTML = text;
            currentWordPos += 1;
        }

        // remove the last word
        currentWordPos -= 1;
        words.pop(words[currentWordPos]);

        text = words.join(' ');
        content.innerHTML = text;

        content.scrollTo(0, 0);
        container.scrollTo(0, 0);

        addOverlay();

        const canvas = convertContainerToCanvas(
            container, copyControls.resolutionScale
        );
        canvases.push(canvas);

        removeOverlay();
    }

    updateProgress({ type: 'APPLY_FILTERS', });
    container.style.overflowY = 'scroll';

    const resolvedCanvases = await Promise.all(canvases);
    return resolvedCanvases;
}