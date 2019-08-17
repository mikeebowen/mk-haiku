const axios = require('axios');

module.exports = async function getRandomHaikuWord(syllables, apiKey, apiHost) {
  let haiku;
  let syllableCount =  0;
  let previousPartOfSpeech;

  while(syllableCount < syllables) {
    let partOfSpeech;
    if (!previousPartOfSpeech) {
      partOfSpeech = ['adjective', 'noun', 'verb'][Math.floor(Math.random() * 3)];
      previousPartOfSpeech = partOfSpeech;
    } else {
      switch (previousPartOfSpeech) {
        case 'adjective':
          partOfSpeech = 'noun';
          break;
        case 'noun':
          partOfSpeech = 'verb';
          break;
        case 'verb':
          partOfSpeech = 'adjective';
        default:
          break;
      }
    }
    const data = await axios.get(`https://${apiHost}/words/`, {
      headers: {
        'x-rapidapi-host': apiHost,
        'x-rapidapi-key': apiKey,
      },
      params: {
        random: true,
        soundsMax: 5,
        partOfSpeech,
      },
    })
    .catch(e => {
      console.error("TCL: e", e)
    });

  const {data: {word, syllables: {count: syllablesInWord}}} = data;

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
