import html2canvas from 'html2canvas';

import { copyControls } from 'Utils/Controls';
import { progress } from 'Containers/GenerationProgress';
import Randomizer from './randomizers';

let container = null;
let content = null;

async function convertDIVToImage() {
    const options = {
        logging: false,
        scrollX: 0,
        scrollY: -(window.scrollY + 101.25), // (22.5*4.5) BUG
        scale: copyControls.resolutionScale,
    };

    const canvas = await html2canvas(container, options);
    return canvas;
}

function transformSpaces(match) {
    const len = match.length - 4;
    const temp = ' ' + len + ':~: ';
    return temp;
}

export default async function generateImages() {
    const shouldLetterRandomize = parseInt(copyControls.fontSizeRandom, 10) > 0 || false;
    const { updateProgress } = progress;
    const canvases = [];

    container = document.getElementById('page-container');
    content = document.getElementById('page-content');

    container.scrollTo(0, 0);
    const { scrollHeight } = content;
    const clientHeight = copyControls.clientHeight || 550;

    const totalPages = Math.ceil(scrollHeight / clientHeight) + 1;

    let copiedText = content.innerHTML.trim();
    copiedText += ' lastDummy'; // preserve the last word or letter also
    container.style.overflowY = 'hidden';

    let splitContent;
    if (JSON.parse(copyControls.preserveIndentation) === true) {
        splitContent = copiedText
            .replace(/\n/g, ' <br> ')
            .replace(/\s{3,}/g, transformSpaces)
            .split(/\s+/g);
    } else {
        splitContent = copiedText
            .replace(/\n/g, ' <br> ')
            .split(/\s+/g);
    }

    let currentWordPos = 0;
    // const { applyRandomization } = new Randomizer(totalPages, splitContent.length);
    const { applyRandomization } = Randomizer;

    for (let i = 0; i < totalPages; i += 1) {
        updateProgress({ type: 'INCREMENT_PROGRESS', payload: { i, totalPages } });

        const words = [];
        let text = '';
        content.innerHTML = '';

        while (
            content.scrollHeight <= clientHeight
            && words.length <= splitContent.length + copyControls.strikeFreq
        ) {
            const word = splitContent[currentWordPos];
            if (!word) {
                break;
            } else if (word === '<br>') {
                words.push(word);
            } else if (
                (/&lt|&gt|&amp/gi).test(word)
            ) {
                words.push(word);
            } else if (word.includes(':~:')) {
                const len = parseInt(word, 10);
                let newWord = '';
                for (let j = 0; j < len; j += 1) {
                    newWord += ' ';
                }
                words.push(newWord);
            } else {
                const styledWord = applyRandomization(
                    word,
                    shouldLetterRandomize,
                    currentWordPos,
                );
                words.push(styledWord.outerHTML);
                styledWord.remove();
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

        const overlay = document.querySelector('#overlay');
        const signature = document.querySelector('#signature');
        signature.style.display = 'block';
        if (JSON.parse(copyControls.shadowEffect) === true) {
            overlay.style.display = 'block';
            overlay.style.background = `linear-gradient(${Math.random() * 360}deg, #0008, #0000)`;
        }

        const canvas = convertDIVToImage();
        canvases.push(canvas);

        signature.style.display = 'none';
        overlay.style.display = 'none';
        overlay.style.background = 'none';
    }

    updateProgress({ type: 'APPLY_FILTERS' });
    container.style.overflowY = 'scroll';

    const resolvedCanvases = await Promise.all(canvases);
    return resolvedCanvases;
}