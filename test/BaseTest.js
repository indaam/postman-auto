const expect = require('chai').expect;

const postmanExample = require('../Postman Example.postman_collection.json');
const BaseTest = require('../app/main/BaseTest');
const func = require('../app/func');

describe('BaseTest Test', function () {
  const base = new BaseTest();
  const item = postmanExample['item'][0];
  const item2 = func.getLastArray(postmanExample['item']);

  it('Test base isItemHaveChild', function () {
    expect(base.isItemHaveChild(item)).to.equal(true);
    expect(base.isItemHaveChild(item2)).to.equal(false);
  });

  it('Test base isItemHaveEvent', function () {
    const item = postmanExample['item'];
    expect(base.isItemHaveEvent(item['item'])).to.equal(false);
  });

  it('Test base isItemhaveRequest', function () {
    expect(base.isItemhaveRequest(item['item'][0])).to.equal(true);
  });

  it('Test base isItemHaveResponse', function () {
    expect(base.isItemHaveResponse(item['item'][0])).to.equal(true);
    expect(base.isItemHaveResponse(item2)).to.equal(false);
  });
});
