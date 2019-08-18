'use strict';

module.exports = async function (apiKey, apiHost, rhymingWord) {
  return await getWord(apiKey, apiHost, 'adjective', 'twirl');
}