import html2canvas from 'html2canvas';

let container = null;
let content = null;

async function convertDIVToImage() {
    const options = {
        scrollX: 0,
        scrollY: -window.scrollY,
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

    const savedInnerHTML = container.innerHTML;

    if (totalPages > 1) {

        const splitContent = savedInnerHTML.split(/\s+/g);
        let currentWordPos = 0;

        for (let i = 0; i < totalPages; i++) {
            let words = [];
            let text = "";
            content.innerHTML = "";

            while (content.scrollHeight <= clientHeight && words.length <= splitContent.length) {
                const word = splitContent[currentWordPos];
                words.push(word);
                text = words.join(' '); // apply random space here
                content.innerHTML = text;
                currentWordPos++;
            }
            console.log(words, text, i, splitContent); // fix empty string
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
    container.innerHTML = savedInnerHTML; // fix this
    return images;
}

export { generateImages };