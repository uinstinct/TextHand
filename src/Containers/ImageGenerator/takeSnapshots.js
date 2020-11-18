import html2canvas from 'html2canvas';
import { copyControls } from '../Controls';
import { progress } from '../GenerationProgress';
import Randomizer from "./randomizers";

let container = null;
let content = null;

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

    const shouldLetterRandomize =
        parseInt(copyControls.fontSizeRandom) > 0 || false;
    const { updateProgress } = progress;
    let images = [];

    container = document.getElementById('page-container');
    content = document.getElementById('page-content');

    container.scrollTo(0, 0);
    const scrollHeight = content.scrollHeight;
    const clientHeight = copyControls.clientHeight || 550; // height of .page-content when there is no content (increase this value to remove space at the bottom)

    const totalPages = Math.ceil(scrollHeight / clientHeight) + 1; // always add +1 to get the extra page to due to random font size


    let copiedText = content.innerHTML.trim();
    copiedText += " lastDummy"; // preserve the last word or letter also
    container.style.overflowY = 'hidden';

    let splitContent;
    if (JSON.parse(copyControls.preserveIndentation) === true) {
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
    const { applyRandomization } = new Randomizer(totalPages, splitContent.length); 

    for (let i = 0; i < totalPages; i++) {

        updateProgress({ type: "INCREMENT_PROGRESS", payload: { i, totalPages } });

        let words = [];
        let text = "";
        content.innerHTML = "";

        while (content.scrollHeight <= clientHeight && words.length <= splitContent.length + copyControls.strikeFreq) {
            const word = splitContent[currentWordPos];
            if (!word) {
                break;
            } else if (word === '<br>') {
                words.push(word);
            } else if (
                word.includes("&lt") || word.includes("&gt") || word.includes("&amp")
            ) {
                words.push(word);
            } else if (word.includes(":~:")) {
                const len = parseInt(word);
                let newWord = "";
                for (let i = 0; i < len; i++) {
                    newWord += " ";
                }
                words.push(newWord);
            } else {
                const currentWord = {value:currentWordPos};
                const styledWord = applyRandomization(
                    word, shouldLetterRandomize,
                    currentWord
                );
                currentWordPos = currentWord.value;
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
        const signature = document.querySelector("#signature");
        signature.style.display = 'block';
        if (JSON.parse(copyControls.shadowEffect) === true) {
            overlay.style.display = 'block';
            overlay.style.background = `linear-gradient(${Math.random() * 360}deg, #0005, #0000)`;
        }

        const canvas = await convertDIVToImage();
        images.push(canvas);

        signature.style.display = 'none';
        overlay.style.display = 'none';
        overlay.style.background = 'none';
    }

    updateProgress({ type: "APPLY_FILTERS" });
    container.style.overflowY = 'scroll';

    return images;
}

export { generateImages };