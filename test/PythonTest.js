const expect = require('chai').expect;

const postmanCollections = require('../Postman Example.postman_collection.json');
const PythonTest = require('../app/main/PythonTest');

describe('PythonTest Test', async function () {
  const options = {
    skipKeys: [],
    skipType: ['Null'],
    mergeTestFile: false,
    mixTestObject: false,
    output: ['postman', 'python', 'javascript'],
    showLog: true
  };
  const pm = new PythonTest(options);
  const result = await pm.createTest(postmanCollections);

  it('PythonTest Test Should result is an Array', function () {
    expect(result).to.be.an('array');
  });

  it('PythonTest Test Should result have property readme & check readme object', function () {
    const readme = result.find(function (d) {
      return d.key === 'readme';
    });
    expect(readme).to.be.have.property('key');
    expect(readme).to.be.have.property('fileName');
    expect(readme).to.be.have.property('path');
    expect(readme).to.be.have.property('content');
  });
});
