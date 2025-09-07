// Purpose: Format drinks into LLM prompt

/**
 * Builds bartender-style prompt using drinks list
 *
 *  {string} userQuery
 *  {Array} drinks
 *  {string}
 */
function buildPrompt(userQuery, drinks) {
  const list = drinks.map((drink, i) =>
    `(${i + 1}) ${drink.name}: ${drink.description}`
  ).join('\n');

  return `
User asked: "${userQuery}"

Here are some drinks from the bar:
${list}

Respond like a witty, helpful bartender. Pick 1 option and explain it naturally.
If user is underage, suggest only non-alcoholic drinks. Add emojis where appropriate.
  `;
}

module.exports = { buildPrompt };
