import { copyControls } from 'Utils/Controls';

const wrappedLetter = document.createElement('span');
wrappedLetter.style = 'all:unset';

function randomizeLetters(letter, fontSizeRandom, fontSize) {
    const rand = Math.random();
    const sign = (2 * (Math.floor(rand * 1.5 + 0.5))) - 1;
    const randomScale = ((rand * fontSizeRandom * sign) + fontSize)
        .toFixed(2);

    wrappedLetter.style.fontSize = randomScale + 'px';
    wrappedLetter.innerText = letter;

    return wrappedLetter;
}

const wordWrapper = document.createElement('span');
wordWrapper.style = 'all:unset';

export default class TakeSnapshotRandomizer {
    constructor() {
        this.fontSizeRandom = parseInt(copyControls.fontSizeRandom, 10);
        this.fontSize = parseInt(copyControls.fontSize, 10);
        this.wordRotation = parseFloat(copyControls.wordRotation);
        this.shouldLetterRandomize = parseInt(copyControls.fontSizeRandom, 10) > 0 || false;

        this.applyRandomization = this.applyRandomization.bind(this);
        this.randomizeWord = this.randomizeWord.bind(this);
    }

    applyRandomization(word) {
        return this.randomizeWord(word);
    }

    randomizeWord(word) {
        if (this.shouldLetterRandomize) {
            const letters = word.split('');
            const { fontSizeRandom, fontSize, } = this;
            for (let i = 0; i < letters.length; i += 1) {
                letters[i] = randomizeLetters(letters[i], fontSizeRandom, fontSize).outerHTML;
            }
            const styledLetters = letters.join('');
            wordWrapper.innerHTML = styledLetters;
        } else {
            wordWrapper.style.fontSize = this.fontSize;
            wordWrapper.innerHTML = word;
        }

        if (this.wordRotation > 0) {
            const rand = Math.random();
            const sign = (2 * (Math.floor(rand * 1.5 + 0.5))) - 1;
            const randomRotation = rand * this.wordRotation * sign;
            wordWrapper.style.transform = `rotate(${randomRotation}deg)`;
        }
        return wordWrapper;
    }
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

// export default class TakeSnapshotRandomizer {
//    /* constructor(pages, noOfWords) {
//        this.applyRandomization = this.applyRandomization.bind(this);
//        this.strikePositions = createStrikePositions(pages, noOfWords);
//        this.strikeCurrPos = 0;
//        this.willStrike = copyControls.strikeFreq > 0 ? true : false;
//    } */

//    static applyRandomization(word, shouldLetterRandomize/* . currentWord */) {
//        return randomizeWord(word, shouldLetterRandomize);

//        /* if(this.willStrike
//            && this.strikePositions
//                .includes(currentWord.value, this.strikeCurrPos)) {

//            this.strikeCurrPos++;
//            currentWord.value--;

//            const styledWord = randomizeWord(word, false);
//            styledWord.style.textDecoration = "line-through";
//            return styledWord;

//        }else{
//            return randomizeWord(word, shouldLetterRandomize);
//        } */
//    }
// }