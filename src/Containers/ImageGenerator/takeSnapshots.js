import html2canvas from 'html2canvas';

let container = null;
let content = null;

function randomizeWord(word) {

    const randomValue = Math.random();
    const randomSpace = Math.ceil(randomValue * 30) + 10;
    const randomScale = 1 || ((randomValue * 0.5) + 1).toFixed(2);

    //const wrapper = `<span style='margin-right:${randomSpace}px; transform: scale(${randomScale}); margin-bottom: ${randomSpace}px;'>${word}</span>`;

    const wrapper = `<span style="margin: auto ${randomSpace}px ${randomSpace}px auto; transform: scale(${randomScale}); line-height: ${randomSpace}px" >${word}</span>`
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

    const copiedInnerText = container.innerText;

    if (totalPages > 1) {

        const splitContent = copiedInnerText.split(/\s+/g);
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