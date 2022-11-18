const undecodeText = text => {
  let entities = {
    amp: '&',
    apos: "'",
    '#x27': "'",
    '#x2F': '/',
    '#39': "'",
    '#47': '/',
    lt: '<',
    gt: '>',
    nbsp: ' ',
    quot: '"',
    '#039': "'"
  };
  return text.replace(/&([^;]+);/gm, function (match, entity) {
    return entities[entity] || match;
  });
};

export default undecodeText;
