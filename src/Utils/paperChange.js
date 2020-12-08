const paper2 = require('assets/paper-2.jpg');
const paper3 = require('assets/paper-3.jpg');
const paper4 = require('assets/paper-4.jpg');

const papers = {
    paper2,
    paper3,
    paper4
};

export function addImageToBackground(url) {
    let paperURL = null;
    if (url in papers) {
        paperURL = papers[url];
    }
    if (paperURL) {
        const editorContainer = document.getElementById('page-container');
        editorContainer.style.background = `url(${paperURL.default})`;
        editorContainer.style.backgroundSize = 'cover';
    }
}

export function changeToWhiteBackground() {
    const editorContainer = document.getElementById('page-container');
    editorContainer.style.background = 'white';
}

export function readFileAndChangeBG(fileObj) {
    const reader = new FileReader();
    reader.readAsDataURL(fileObj);
    reader.onload = (e) => addImageToBackground(e.target.result);
}