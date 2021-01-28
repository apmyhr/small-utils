/** @type {Number} How long a cookie should live for. 60 days */
const COOKIE_EXPIRATION = 60 * 24 * 60 * 60;

/**
 * Get the value of a cookie.  Return null, or the optional default, if the cookie does not exist yet.
 * 
 * @param name {String} The name of the cookie
 * @param newValue The new value for the cookie
 */
export function getCookie(name, defaultValue = null) {
    let cookies = document.cookie.split(";");

    let cookie = cookies.find(c => c.split('=')[0] == name);

    if (cookie) {
        let valueStr = decodeURIComponent(cookie.split('=')[1]);

        //Special check for booleans
        if (valueStr == 'true' || valueStr == 'false') {
            return JSON.parse(valueStr);
        }

        return valueStr;

    } else {
        return defaultValue;
    }
}

/**
 * Set the value of a cookie
 * 
 * @param name {String} The name of the cookie
 * @param newValue The new value for the cookie
 */
export function setCookie(name, newValue) {
    let cookie = `${name}=${encodeURIComponent(newValue)}`;

    cookie += '; path=/; '

    //Must set max-age or the cookie will expire after the current session
    cookie += `max-age=${COOKIE_EXPIRATION};`;

    document.cookie = cookie;
}