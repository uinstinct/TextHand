/**
 *
 * @param {String} text
 */
export default function timeRemaining(text) {
    const str = text
        .replace(/(\s+)|(\n)/g, '');

    if (str.length < 100) {
        return str.length;
    }
    return str.length;
}