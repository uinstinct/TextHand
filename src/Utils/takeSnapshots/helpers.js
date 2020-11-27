import html2canvas from 'html2canvas';

export async function convertContainerToCanvas(container, resolutionScale) {
    const options = {
        logging: false,
        scrollX: 0,
        scrollY: -(window.scrollY + 139), // (the plus is varying) BUG
        scale: resolutionScale,
    };

    const canvas = await html2canvas(container, options);
    return canvas;
}

export function preserveIndentation(shouldPreserve, copiedText) {
    const transformSpaces = (match) => {
        const len = match.length - 4;
        const temp = ' ' + len + ':~: ';
        return temp;
    };

    if (JSON.parse(shouldPreserve) === true) {
        const splitContent = copiedText
            .replace(/\n/g, ' <br> ')
            .replace(/\s{3,}/g, transformSpaces)
            .split(/\s+/g);
        return splitContent;
    }
    const splitContent = copiedText
        .replace(/\n/g, ' <br> ')
        .split(/\s+/g);
    return splitContent;
}

export function putInWordArray(
    word, words, applyRandomization
) {
    if (word === '<br>') {
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
        const styledWord = applyRandomization(word);
        words.push(styledWord.outerHTML);
        styledWord.remove();
    }
}

export class Overlay {
    constructor(shouldAddShadows) {
        this.overlay = document.querySelector('#overlay');
        this.signature = document.querySelector('#signature');
        this.shouldAddShadows = shouldAddShadows;

        this.addOverlay = this.addOverlay.bind(this);
        this.removeOverlay = this.removeOverlay.bind(this);
    }

    addOverlay() {
        this.signature.display = 'block';
        if (this.shouldAddShadows === true) {
            this.overlay.style.display = 'block';
            this.overlay.style.background = `linear-gradient(${Math.random() * 360}deg, #0008, #0000)`;
        }
    }

    removeOverlay() {
        this.signature.style.display = 'none';
        this.overlay.style.display = 'none';
        this.overlay.style.background = 'none';
    }
}