import * as arrayUtils from './arrayUtils'

/**
 * Provides functions for generating random data of different types
 */
export class Random {
    /**
     * Return a random integer between a starting and ending range.  Defaults to between 0 and 100.
     * @param {Number} start Starting range. Defaults to 0
     * @param {Number} end Ending range.  Defaults to 100
     * 
     * @returns {Number} The random number
     */
    static number(start = 0, end = 100) {
        return Math.round((Math.random() * (end - start)) + start);
    }

    /**
     * Return a random item from a list
     * @param {Array} list 
     * @param {Number} start Starting index. Defaults to 0
     * @param {Number} end Ending index.  Defaults to 0 which is whole list
     * 
     * @returns {Any} Random item from the list
     */
    static listItem(list, start = 0, end = null) {
        let index = this.number(start, end ?? list.length - 1)
        return list[index];
    }

    /**
     * Return a random word from a list of words
     * @param {String[]} wordList 
     * 
     * @returns {String} A word
     */
    static word(wordList) {
        return this.listItem(wordList);
    }

    /**
     * Generate a sentence. 
     * @returns {String} A Sentence
     */
    static sentence() {
        let structureNum = this.number(0, 6);

        switch (structureNum) {
            case 0:
                return `The ${this.word(Dictionary.adjectives)} ${this.word(Dictionary.adjectives)} ${this.word(Dictionary.nouns)} ${this.word(Dictionary.verbs)} a ${this.word(Dictionary.nouns)}.`;
            case 1:
                return `${this.word(Dictionary.nouns)} are ${this.word(Dictionary.adjectives)}.`;
            // case 2:
            //     return `The ${this.word(adjectives)} ${this.word(adjectives)} ${this.word(nouns)} ${this.word(verbs)} a ${this.word(adverbs)}.`;
            // case 3:
            //     return `The ${this.word(adjectives)} ${this.word(adjectives)} ${this.word(nouns)} ${this.word(verbs)} a ${this.word(adverbs)}.`;
            // case 4:
            //     return `The ${this.word(adjectives)} ${this.word(adjectives)} ${this.word(nouns)} ${this.word(verbs)} a ${this.word(adverbs)}.`;
            // case 5:
            //     return `The ${this.word(adjectives)} ${this.word(adjectives)} ${this.word(nouns)} ${this.word(verbs)} a ${this.word(adverbs)}.`;
            default:
                return `${this.word(Dictionary.adjectives)} ${this.word(Dictionary.nouns)} are ${this.word(Dictionary.verbs)} a ${this.word(Dictionary.nouns)}.`;
        }
    }

    /**
     * Generate a paragraph of sentences.
     * @param {Number} maxSize Max number of sentences. Default to 10
     * @param {Number} maxSize Minimum number of sentences. Default to 2
     * @returns {String} The paragraph
     */
    static paragraph(maxSize = 10, minSize = 2) {
        let size = this.number(minSize, maxSize);
        let sentences = arrayUtils.fillWithFunction(size, () => this.sentence());

        return sentences.join(' ');
    }
}

/**
 * Dictionary of words.
 */
export class Dictionary {
    /** @type {String[]} List of nouns */
    static firstNames = ['Matthew', 'John', 'Luke', 'Paul', 'Eric', 'Shannon', 'Chrstina', 'Sophia', 'Isabelle', 'Molly', 'Matt', 'Mary', 'Kim', 'Jose', 'Juan', 'Maria'];

    /** @type {String[]} List of nouns */
    static lastNames = ['Smith', 'Rockefeller', 'Nugyen', 'Kim', 'Lee', 'Trump', 'Biden', 'Clinton', 'Bush', 'Anderson', 'Hamilton', 'Franklin', 'Hernandez'];

    /** @type {String[]} List of nouns */
    static nouns = ['apple', 'ball', 'cat', 'bear', 'car', 'plane', 'road', 'factory', 'planet', 'country', 'world', 'dog', 'internet', 'computer', 'laptop', 'person', 'man', 'woman', 'child', 'pet', 'backpack'];

    /** @type {String[]} List of verbs */
    static verbs = ['catch', 'fight', 'look', 'find', 'run', 'walk', 'hide', 'throw', 'draw', 'write', 'launch', 'shine', 'shout', 'talk', 'say', 'speak'];

    /** @type {String[]} List of adverbs */
    static adverbs = ['quickly', 'brilliantly', 'expertly', 'brutally', 'cheerfully', 'weirdly'];

    /** @type {String[]} List of adjectives */
    static adjectives = ['handsome', 'pretty', 'quick', 'smart', 'brilliant', 'red', 'blue', 'long', 'short', 'calm', 'angry', 'sad', 'happy', 'heavy', 'light'];

    static refreshWordLists() {

    }
}