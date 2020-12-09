export default function timeRemaining(text, state) {
    const noOfLetters = text
        .replace(/(\s+)|(\n)/g, '')
        .length;

    const noOfWords = text.split(/(\s+)|(\n)/g).length;

    if (state.fontSizeRandom > 0 && state.wordRotation > 0) {
        return noOfLetters * 0.01850;
    } if (state.fontSizeRandom > 0) {
        return noOfLetters * 0.01357;
    } if (state.wordRotation > 0) {
        return noOfWords * 0.00993;
    }

    if (noOfWords > 2000) {
        return noOfWords * 0.00615;
    }
    return noOfWords * 0.01106;
}