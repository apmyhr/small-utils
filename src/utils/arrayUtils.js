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