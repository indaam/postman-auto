const BaseClass = require('./BaseClass');
const PostmanTest = require('./PostmanTest');
const PostmanSplit = require('./PostmanSplit');
const NodeJsTest = require('./NodeJsTest');
const PythonTest = require('./PythonTest');
const func = require('../func');
const utils = require('../utils');

class Main extends BaseClass {
  constructor(options) {
    super();
    this.options = options;
  }
}

Main.writeFile = writeFile;
Main.writeResults = writeResults;
Main.createPostmanSplit = createPostmanSplit;
Main.createPostmanTest = createPostmanTest;
Main.createPythonTest = createPythonTest;
Main.createNodeJsTest = createNodeJsTest;

function writeFile(content, dest) {
  const isObject = typeof content === 'object';
  if (isObject) {
    content = JSON.stringify(content, null, 2);
  }
  return utils.writeFile(dest, content, 'utf8');
}

function writeResults(items, options) {
  if (func.isArray(items)) {
    for (let index = 0; index < items.length; index++) {
      const res = items[index];
      Main.writeFile(res.content, res.outputPath);
      options &&
        options.showLog &&
        console.log('Success create file test', res.outputPath);
    }
  }
  return 1;
}
function createPostmanSplit(pmResult, options) {
  const postmanCollections = pmResult.find(function (d) {
    return d.key === 'postman';
  })['content'];
  const pmSplit = new PostmanSplit(options);
  return pmSplit.createSplit(postmanCollections);
}

async function createPostmanTest(postmanCollections, options) {
  const pm = new PostmanTest(options);
  try {
    return await pm.createTest(postmanCollections);
  } catch (error) {
    throw error;
  }
}

async function createPythonTest(postmanCollections, options) {
  const py = new PythonTest(options);
  try {
    return await py.createTest(postmanCollections);
  } catch (error) {
    throw error;
  }
}

async function createNodeJsTest(postmanCollections, options) {
  const js = new NodeJsTest(options);
  try {
    return await js.createTest(postmanCollections);
  } catch (error) {
    throw error;
  }
}

const app = async function (postmanCollections, options) {
  // create postman test
  const pmResult = await Main.createPostmanTest(postmanCollections, options);

  // Create Postman test split
  const pmSplit = Main.createPostmanSplit(pmResult, options);

  // Write postman collection test
  if (func.inArray('postman', options.output)) {
    Main.writeResults(pmResult, options);
  }

  // Write python test
  const pyResult = await Main.createPythonTest(pmSplit, options);
  if (func.inArray('python', options.output)) {
    Main.writeResults(pyResult, options);
  }

  // Write node js test
  const jsResult = await Main.createNodeJsTest(pmSplit, options);
  if (func.inArray('javascript', options.output)) {
    Main.writeResults(jsResult, options);
  }

  return [pmResult, pmResult, pyResult, jsResult];
};

app.PostmanTest = PostmanTest;
app.PostmanSplit = PostmanSplit;
app.NodeJsTest = NodeJsTest;
app.PythonTest = PythonTest;
app.Main = Main;
app.func = func;
app.utils = utils;

module.exports = app;
