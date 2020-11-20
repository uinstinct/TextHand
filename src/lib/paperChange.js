const papers = {
    paper2: require("assets/paper-2.jpg"),
    paper3: require("assets/paper-3.jpg"),
    paper4: require("assets/paper-4.jpg")
}

export function addImageToBackground(url) {
    if (url in papers) {
        url = papers[url];
    }
    const editorContainer = document.getElementById('page-container');
    editorContainer.style.background = `url(${url})`;
    editorContainer.style.backgroundSize = 'cover';
}

export function changeToWhiteBackground() {
    const editorContainer = document.getElementById('page-container');
    editorContainer.style.background = "white";
}

export function readFileAndChangeBG(fileObj) {
    const reader = new FileReader();
    reader.readAsDataURL(fileObj);
    reader.onload = e => addImageToBackground(e.target.result);
}