/**
 * Convert a string from camel case into something else, such as lightGreen -> light-green
 * @param {String} str The camel case string to convert
 * @param {String} seperator The seperator to use, such as space or hyphen
 * @param {Boolean} lowerCase Convert to lower case
 */
export function fromCamelCase(str, seperator, lowerCase = false){
    var words = str.match(/[A-Za-z][a-z]*/g) || [];

    if (lowerCase){
        words = words.map(w => w.toLowerCase());
    }

    let combined = words.join(seperator);

    return combined;
}