const countSyllables = require('syllable');
const axios = require('axios');

module.exports = async function getRandomHaikuWord(syllables, apiKey, apiHost) {
  let haiku;
  let syllableCount =  0;

  while(syllableCount < syllables) {
    const data = await axios.get(`https://${apiHost}/words/`, {
      headers: {
        'x-rapidapi-host': apiHost,
        'x-rapidapi-key': apiKey,
      },
      params: {
        random: true,
        soundsMax: 5,
        limit: 100,
      },
    })
    .catch(e => {
      console.error("TCL: e", e)
    });

  const {data: {word}} = data;
  const syllablesInWord = countSyllables(word);

    if (syllableCount + syllablesInWord <= syllables) {
      if (haiku) {
        haiku += ` ${word}`;
      } else {
        haiku = word;
      }

      syllableCount += syllablesInWord;
    }
  }
  return haiku;
}
