import { copyControls } from "Containers/Controls";

function randomizeLetters(letter) {

    const randomValue = Math.random();
    const randomScale = ((randomValue * parseInt(copyControls.fontSizeRandom)) + parseInt(copyControls.fontSize)).toFixed(2);

    let wrappedLetter = document.createElement('span');
    wrappedLetter.style = "all:unset";
    wrappedLetter.style.fontSize = randomScale + 'px';
    wrappedLetter.innerText = letter;

    return wrappedLetter;
}

function randomizeWord(word, shouldLetterRandomize) {

    const wordWrapper = document.createElement('span');
    wordWrapper.style = "all:unset";

    if (shouldLetterRandomize) {
        let letters = word.split('');
        for (let i = 0; i < letters.length; i++) {
            letters[i] = randomizeLetters(letters[i]);
            letters[i] = letters[i].outerHTML;
        }
        const styledLetters = letters.join('');
        wordWrapper.innerHTML = styledLetters;
    } else {
        wordWrapper.style.fontSize = copyControls.fontSize;
        wordWrapper.innerHTML = word;
    }

    const sign = (2 * (Math.floor(Math.random() * 1.5 + 0.5))) - 1;
    const randomRotation = Math.random() * parseFloat(copyControls.wordRotation) * sign;
    wordWrapper.style.transform = `rotate(${randomRotation}deg)`;
    return wordWrapper;
}


/*function createStrikePositions(pages, noOfWords) {
    const frequency = copyControls.strikeFreq || 0;
    let prev = 0;
    let positions = [];

    const noOfStrikes = frequency * (pages-1);
    const interval = Math.floor(noOfWords / noOfStrikes);

    for (let i = 0; i < noOfStrikes; i++) {
        const position = Math.floor(Math.random() * interval) + prev;
        prev += interval;
        positions.push(position);
    }
    return positions;
}*/

export default class TakeSnapshotRandomizer {

    /*constructor(pages, noOfWords) {
        this.applyRandomization = this.applyRandomization.bind(this);
        this.strikePositions = createStrikePositions(pages, noOfWords);
        this.strikeCurrPos = 0;
        this.willStrike = copyControls.strikeFreq > 0 ? true : false;
    }*/

    applyRandomization(word, shouldLetterRandomize, currentWord) {
        return randomizeWord(word, shouldLetterRandomize);

        /*if(this.willStrike
            && this.strikePositions
                .includes(currentWord.value, this.strikeCurrPos)) {

            this.strikeCurrPos++;
            currentWord.value--;

            const styledWord = randomizeWord(word, false);
            styledWord.style.textDecoration = "line-through";
            return styledWord;

        }else{
            return randomizeWord(word, shouldLetterRandomize);
        }*/
    }
};