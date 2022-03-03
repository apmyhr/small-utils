/**
 * Add a delay to the execution of a function.  Good for use with filtering text boxes to add a slight delay while the user is typing.
 * Note: This code was pulled from https://stackoverflow.com/a/59243268.
 * @param {function} fn Function to delay
 * @param {Number} delay Delay in milliseconds
 */
export function debounce(fn, delay) {
    var timeoutID = null
    return function () {
        clearTimeout(timeoutID)
        var args = arguments
        var that = this
        timeoutID = setTimeout(function () {
            fn.apply(that, args)
        }, delay)
    }
}

/**
 * Wait for a timeout.  This can be used with await in an async function.
 * @example await delay(5000); //Delay 5 seconds. 
 * @param {Number} ms Time to wait in milliseconds
 * @returns 
 */
export function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
