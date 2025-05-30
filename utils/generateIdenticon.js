//https://identicon.net/

const identicon = require("identicon.js");

const generateIdenticon = (input, size = 64) => {
  const hash = require("crypto").createHash("md5").update(input).digest("hex");
  const data = new identicon(hash, size).toString();

  return `data:image/png;base64,${data}`;
};

module.exports = generateIdenticon;
