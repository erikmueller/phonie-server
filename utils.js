const stringToByteBlocks = (str, bytes = 4) =>
  str
    .match(new RegExp(`.{1,${bytes}}`, 'g'))
    .map(block =>
      block
        .split('')
        .map(char => '0x' + char
          .charCodeAt(0)
          .toString(16))
        )

const bytesToString = (blocks) =>
  blocks.map(block => block.map(char => String.fromCharCode(`${char}`)).join('')).join('')

module.exports = {
  bytesToString,
  stringToByteBlocks
}
