import html2canvas from 'html2canvas';

let container = null;
let content = null;

function randomizeLetters(letter) {
    const randomValue = Math.random();
    const randomScale = ((randomValue * 8) + 20).toFixed(2);

    let wrappedLetter = document.createElement('span');
    wrappedLetter.style.fontSize = randomScale + 'px';
    wrappedLetter.innerText = letter;

    return wrappedLetter;
}

function randomizeWord(word) {

    let letters = word.split('');
    for (let i = 0; i < letters.length; i++) {
        letters[i] = randomizeLetters(letters[i]);
        letters[i] = letters[i].outerHTML;
    }
    console.log(letters[0], JSON.stringify(letters[0]), 'watch this')


    const styledLetters = letters.join('');
    let wordWrapper = document.createElement('span');
    wordWrapper.innerHTML = styledLetters;


    console.log(styledLetters, 'when word is styled');
    return wordWrapper;

}

async function convertDIVToImage() {
    const options = {
        scrollX: 0,
        scrollY: -(window.scrollY+22.5),
        scale: 1 // this controls the resolution
    };

    const canvas = await html2canvas(container, options); // just take the snapshot
    return canvas;
}

async function generateImages() {

    let images = [];

    container = document.getElementById('page-container');
    content = document.getElementById('page-content');

    container.scrollTo(0, 0);
    const scrollHeight = content.scrollHeight;
    const clientHeight = 514; // height of .page-content when there is no content (increase this value to remove space at the bottom)

    const totalPages = Math.ceil(scrollHeight / clientHeight);

    const copiedInnerText = container.innerText.trim(); // due to INNER TEXT, we cannot see the <br> tag

    if (totalPages > 1) {
        const splitContent = copiedInnerText.split(/\s+/g);
        let currentWordPos = 0;

        for (let i = 0; i < totalPages; i++) {
            let words = [];
            let text = "";
            content.innerHTML = "";

            while (content.scrollHeight <= clientHeight && words.length <= splitContent.length) {
                const word = splitContent[currentWordPos];
                if (!word) break;

                const styledWord = randomizeWord(word);
                words.push(styledWord.outerHTML);

                text = words.join(' ');
                content.innerHTML = text;
                currentWordPos++;
            }
            content.scrollTo(0, 0);
            container.scrollTo(0, 0);
            const canvas = await convertDIVToImage();
            images.push(canvas);
        }

    } else {
        const canvas = await convertDIVToImage();
        images.push(canvas);
    }
    return images;
}

export { generateImages };