const expect = require('chai').expect;

const postmanCollections = require('../Postman Example.postman_collection.json');
const NodeJsTest = require('../app/main/NodeJsTest');

describe('NodeJsTest Test', async function () {
  const options = {
    skipKeys: [],
    skipType: ['Null'],
    mergeTestFile: false,
    mixTestObject: false,
    output: ['postman', 'python', 'javascript'],
    showLog: true
  };
  const pm = new NodeJsTest(options);
  const result = await pm.createTest(postmanCollections);

  it('NodeJsTest Test Should result is an Array', function () {
    expect(result).to.be.an('array');
  });

  it('NodeJsTest Test Should result have property readme & check readme object', function () {
    const readme = result.find(function (d) {
      return d.key === 'readme';
    });
    expect(readme).to.be.have.property('key');
    expect(readme).to.be.have.property('fileName');
    expect(readme).to.be.have.property('path');
    expect(readme).to.be.have.property('content');
  });
});
