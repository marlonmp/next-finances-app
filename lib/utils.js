/**
 * get the chars from the string specified in the regex and join them.
 * @param {String} str
 * @param {RegExp} regex
 */
export function clearString(str, regex = /[a-z0-9\_]/ig) {
  const matches = [...str.matchAll(regex)];
  return matches.join('');
}

