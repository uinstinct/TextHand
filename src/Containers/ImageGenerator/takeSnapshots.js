import html2canvas from 'html2canvas';

let container = null;
let content = null;

function randomizeWord(word) {

    const randomSpace = 5 || Math.ceil(Math.random() * 20);
    const randomScale = ((Math.random() * 0.4) + 1).toFixed(2);

    const wrapper = `<span style='margin-right:${randomSpace}px; transform: scale(${randomScale})'>${word}</span>`;
    return wrapper;

}

async function convertDIVToImage() {
    const options = {
        scrollX: 0,
        scrollY: -(window.scrollY),
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

    const copiedInnerHTML = container.innerHTML;

    if (totalPages > 1) {

        const splitContent = copiedInnerHTML.split(/\s+/g);
        let currentWordPos = 0;
        console.log(splitContent, 'see this');

        for (let i = 0; i < totalPages; i++) {
            let words = [];
            let text = "";
            content.innerHTML = "";

            while (content.scrollHeight <= clientHeight && words.length <= splitContent.length) {
                const word = splitContent[currentWordPos];
                if (!word) break;

                const styledWord = randomizeWord(word);
                words.push(styledWord);

                text = words.join(' ');
                content.innerHTML = text;
                currentWordPos++;
            }
            console.log(words, 'see words');
            currentWordPos--;
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