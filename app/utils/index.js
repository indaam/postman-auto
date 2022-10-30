const func = require('../func');
const libs = require('../libs');

const { mkdirp, path, fs } = libs;

const writeFile = (dest, content, options) => {
  return mkdirp(path.dirname(dest))
    .then(() => {
      return fs.writeFileSync(dest, content, options);
    })
    .catch(e => {
      throw e;
    });
};

const readFile = async (path, type) => {
  try {
    const data = fs.readFileSync(path, 'utf8');
    if (type === 'json') {
      return func.toJson(data);
    }
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  readFile,
  writeFile
};
