const getRandomHaikuWord = require('./getRandomHaikuWord');

module.exports = async function getRandomHaiku(apiKey, apiHost) {
  let haiku = [];
  for (let i = 0; i < 3; i++) {
    const syllables = i === 0 || i === 2 ? 5 : 7;

    const word = await getRandomHaikuWord(syllables, apiKey, apiHost);
    if (syllables === 5 && !haiku[0]) {
      haiku[0] = word;
    } else if (syllables === 7) {
      haiku[1] = word;
    } else {
      haiku[2] = word;
    }
  }

  haiku.forEach(h => console.log(h));
}
