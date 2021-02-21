/**
 * Divide an array of items into a two dimensional array of rows. 
 * @param {Array} items An array of items
 * @param {Number} rowLength Number of items per row
 * @returns {Array[]} The array divided into rows.
 */
export function divideIntoRows(items, rowLength){
    let numRows = Math.ceil(items.length / rowLength);
    let rows = new Array(numRows);

    for (let r = 0; r < numRows; r++){
        let end = Math.min(rowLength * (r + 1), items.length);
        rows[r] = items.slice(rowLength * r, end);
    }

    return rows;
}

/**
 * Return an array of size array length, filled with a function
 * @param {Number} size Size of array
 * @param {Function} fillFunction Function to fill with
 * @returns {Array} The array
 */
export function fillWithFunction(size, fillFunction){
    let array = new Array(size);
    for (let i = 0; i < size; i++){
        array[i] = fillFunction(i);
    }

    return array;
}