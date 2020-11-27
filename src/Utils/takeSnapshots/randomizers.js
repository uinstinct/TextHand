import { copyControls } from 'Utils/Controls';

function randomizeLetters(letter, sign) {
    const fontSizeRandom = parseInt(copyControls.fontSizeRandom, 10);
    const fontSize = parseInt(copyControls.fontSize, 10);

    const randomScale = ((Math.random() * fontSizeRandom * sign) + fontSize)
        .toFixed(2);

    const wrappedLetter = document.createElement('span');
    wrappedLetter.style = 'all:unset';
    wrappedLetter.style.fontSize = randomScale + 'px';
    wrappedLetter.innerText = letter;

    return wrappedLetter;
}

function randomizeWord(word, shouldLetterRandomize) {
    const wordWrapper = document.createElement('span');
    wordWrapper.style = 'all:unset';
    const sign = (2 * (Math.floor(Math.random() * 1.5 + 0.5))) - 1;
    const wordRotation = parseFloat(copyControls.wordRotation);

    if (shouldLetterRandomize) {
        const letters = word.split('');
        for (let i = 0; i < letters.length; i += 1) {
            letters[i] = randomizeLetters(letters[i], sign);
            letters[i] = letters[i].outerHTML;
        }
        const styledLetters = letters.join('');
        wordWrapper.innerHTML = styledLetters;
    } else {
        wordWrapper.style.fontSize = copyControls.fontSize;
        wordWrapper.innerHTML = word;
    }

    const randomRotation = wordRotation > 0 ? (Math.random() * wordRotation * sign) : 0;
    wordWrapper.style.transform = `rotate(${randomRotation}deg)`;
    return wordWrapper;
}

/* function createStrikePositions(pages, noOfWords) {
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
} */

export default class TakeSnapshotRandomizer {
    /* constructor(pages, noOfWords) {
        this.applyRandomization = this.applyRandomization.bind(this);
        this.strikePositions = createStrikePositions(pages, noOfWords);
        this.strikeCurrPos = 0;
        this.willStrike = copyControls.strikeFreq > 0 ? true : false;
    } */

    static applyRandomization(word, shouldLetterRandomize/* . currentWord */) {
        return randomizeWord(word, shouldLetterRandomize);

        /* if(this.willStrike
            && this.strikePositions
                .includes(currentWord.value, this.strikeCurrPos)) {

            this.strikeCurrPos++;
            currentWord.value--;

            const styledWord = randomizeWord(word, false);
            styledWord.style.textDecoration = "line-through";
            return styledWord;

        }else{
            return randomizeWord(word, shouldLetterRandomize);
        } */
    }
}