import html2canvas from 'html2canvas';
import { copyControls } from '../Controls';
import { progress } from '../GenerationProgress';

let container = null;
let content = null;

function randomizeLetters(letter) {

    const randomValue = Math.random();
    const randomScale = ((randomValue * parseInt(copyControls.fontSizeRandom)) + parseInt(copyControls.fontSize)).toFixed(2);

    let wrappedLetter = document.createElement('span');
    wrappedLetter.style = "all:unset";
    wrappedLetter.style.fontSize = randomScale + 'px';
    wrappedLetter.innerText = letter;

    return wrappedLetter;
}

function randomizeWord(word) {
    let letters = word.split('');

    if (parseInt(copyControls.fontSizeRandom) !== 0) {
        for (let i = 0; i < letters.length; i++) {
            letters[i] = randomizeLetters(letters[i]);
            letters[i] = letters[i].outerHTML;
        }
    }

    const styledLetters = letters.join('');
    let wordWrapper = document.createElement('span');
    wordWrapper.innerHTML = styledLetters;
    wordWrapper.style = 'all:unset';

    const sign = (2 * (Math.floor(Math.random() * 1.5 + 0.5))) - 1;
    const randomRotation = Math.random() * parseFloat(copyControls.wordRotation) * sign;
    wordWrapper.style.transform = `rotate(${randomRotation}deg)`;
    wordWrapper.style.fontSize = copyControls.fontSize;

    return wordWrapper;

}


async function convertDIVToImage() {

    /* the scale does not default to 1 but to the browser window device pixel ration
     * disabling the scale option results in a higher quality image
     * replace this with blur filter of canvas
     * use blur as slider and show in overlay
     * make indentation optional
     */
    const options = {
        logging: false,
        scrollX: 0,
        scrollY: -(window.scrollY + 22.5),
        scale: copyControls.resolutionScale
    };

    const canvas = await html2canvas(container, options); // just take the snapshot
    return canvas;
}

function transformSpaces(match) {
    const len = match.length - 4;
    const temp = " " + len + ":~: ";
    return temp;
}

async function generateImages() {

    const { updateProgress } = progress;
    let images = [];

    container = document.getElementById('page-container');
    content = document.getElementById('page-content');

    container.scrollTo(0, 0);
    const scrollHeight = content.scrollHeight;
    const clientHeight = copyControls.clientHeight; // height of .page-content when there is no content (increase this value to remove space at the bottom)

    const totalPages = Math.ceil(scrollHeight / clientHeight) + 1; // always add +1 to get the extra page to due to random font size


    let copiedText = content.innerHTML.trim();
    copiedText += " lastDummy"; // preserve the last word or letter also
    container.style.overflowY = 'hidden';

    let splitContent;
    if (copyControls.preserveIndentation === true) {
        splitContent = copiedText
            .replace(/\n/g, ' <br> ')
            .replace(/\s{3,}/g, transformSpaces)
            .split(/\s+/g)
    } else {
        splitContent = copiedText
            .replace(/\n/g, ' <br> ')
            .split(/\s+/g);
    }

    let currentWordPos = 0;

    for (let i = 0; i < totalPages; i++) {

        updateProgress({ type: "INCREMENT_PROGRESS", payload: { i, totalPages } });

        let words = [];
        let text = "";
        content.innerHTML = "";

        while (content.scrollHeight <= clientHeight && words.length <= splitContent.length) {
            const word = splitContent[currentWordPos];
            if (!word) {
                break;
            } else if (word === '<br>') {
                words.push(word);
            } else if (word.includes('&lt') || word.includes('&gt') || word.includes('&amp')) {
                words.push(word);
            } else if (word.includes(":~:")) {
                const len = parseInt(word);
                let newWord = "";
                for (let i = 0; i < len; i++) {
                    newWord += " ";
                }
                words.push(newWord);
            } else {
                const styledWord = randomizeWord(word);
                words.push(styledWord.outerHTML);
                styledWord.remove();
            }

            text = words.join(' ');

            content.innerHTML = text;
            currentWordPos++;
        }

        // remove the last word
        currentWordPos--;
        words.pop(words[currentWordPos]);
        text = words.join(' ');
        content.innerHTML = text;

        content.scrollTo(0, 0);
        container.scrollTo(0, 0);

        const overlay = document.querySelector('#overlay');
        if (JSON.parse(copyControls.shadowEffect) === true) {
            overlay.style.display = 'block';
            overlay.style.background = `linear-gradient(${Math.random() * 360}deg, #0008, #0000)`;
        }

        const canvas = await convertDIVToImage();
        images.push(canvas);

        overlay.style.display = 'none';
        overlay.style.background = 'none';
    }

    updateProgress({ type: "APPLY_FILTERS" });
    container.style.overflowY = 'scroll';

    return images;
}

export { generateImages };