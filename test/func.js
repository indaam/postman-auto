const expect = require('chai').expect;
const func = require('../app/func');

describe('Function Test', function () {
  const arr = new Array('ken', 17);
  const obj = new Object({
    name: 'ken',
    age: 17
  });
  const number = new Number('1');
  const date = new Date();
  const regex = new RegExp();
  const _null = null;
  const _undefined = undefined;
  // const bigInt = BigInt();
  // const boolean = new Boolean(true);
  const fn = function () {};
  const bigint = BigInt('1');

  it('Test getLast Array Number', function () {
    expect(func.getLastArray(arr)).to.equal(17);
    expect(func.getLastArray([])).to.eql([]);
  });

  it('Test getLast Array as Object', function () {
    const arr = [{}, {}, obj];
    expect(func.getLastArray(arr)).to.eql(obj);
    expect(func.getLastArray(arr).age).to.equal(17);
  });

  it('Test CamelCase to Dash', function () {
    expect(func.camelCaseToDash('MyName')).to.equal('my-name');
  });

  it('Test toCamelCase', function () {
    expect(func.toCamelCase('to-camel-case')).to.equal('toCamelCase');
    expect(func.toCamelCase('to_camel_case')).to.equal('toCamelCase');
    expect(func.toCamelCase('to camel case')).to.equal('toCamelCase');
    expect(func.toCamelCase('TO CAMEL CASE')).to.equal('toCamelCase');
  });

  it('Test toSnakeCase', function () {
    expect(func.toSnakeCase('toSnakeCase')).to.equal('to_snake_case');
  });

  it('Test cleanName', function () {
    expect(func.cleanName('@clean@Name1')).to.equal(' clean Name ');
  });

  it('Test removeSpace', function () {
    expect(func.removeSpace('remove Space')).to.equal('removeSpace');
  });

  it('Test replaceString', function () {
    expect(func.replaceString('@replaceString@', '@')).to.equal(
      'replaceString'
    );
  });

  it('Test getObjectKeys', function () {
    expect(
      func.getObjectKeys(
        {
          name: 'ken',
          age: 17
        },
        '',
        ','
      )
    ).to.equal('name,age');
    expect(func.getObjectKeys(['name', 'age'], '', ',')).to.equal('name,age');
    expect(func.getObjectKeys(null, '', ',')).to.equal(null);
  });

  it('Test validateJsKey', function () {
    expect(func.validateJsKey('data.my-name')).to.equal("data['my-name']");
    expect(func.validateJsKey('data.myname')).to.equal('data.myname');
    expect(func.validateJsKey('data.myname.3_k')).to.equal(
      "data['myname']['3_k']"
    );
  });

  it('Test validatePyKey', function () {
    expect(func.validatePyKey('data.my-name')).to.equal("['data']['my-name']");
    expect(func.validatePyKey('data.myname')).to.equal("['data']['myname']");
    expect(func.validatePyKey('data[0].myname')).to.equal(
      "['data'][0]['myname']"
    );
  });

  it('Test inArray', function () {
    expect(func.inArray(1, [1, 2])).to.equal(true);
    expect(func.inArray(3, [1, 2])).to.equal(false);
  });

  it('Test fn typeOf', function () {
    expect(func.typeOf(arr)).to.equal('Array');
    expect(func.typeOf(obj)).to.equal('Object');
    expect(func.typeOf(number)).to.equal('Number');
    expect(func.typeOf(_null)).to.equal('Null');
    expect(func.typeOf(date)).to.equal('Date');
    expect(func.typeOf(regex)).to.equal('RegExp');
    expect(func.typeOf(fn)).to.equal('Function');
    expect(func.typeOf(_undefined)).to.equal('Undefined');
    expect(func.typeOf(obj.a)).to.equal('Undefined');
    expect(func.typeOf(bigint)).to.equal('BigInt');
  });

  it('Test isArray', function () {
    expect(func.isArray(arr)).to.equal(true);
    expect(func.isArray(_null)).to.equal(false);
  });

  it('Test toJson', function () {
    const jsonStringObj = `{"name" : "indaam", "born" : ${new Date().getFullYear()}}`;
    const jsonStringArr = `[${jsonStringObj}]`;

    expect(func.toJson(jsonStringObj)).to.eql({
      name: 'indaam',
      born: new Date().getFullYear()
    });
    expect(func.toJson(jsonStringArr)).to.eql([
      {
        name: 'indaam',
        born: new Date().getFullYear()
      }
    ]);
    expect(func.toJson(`{name:me}`)).to.equal(null);
  });

  it('Test cleanKey', function () {
    expect(func.cleanKey('[[0]]')).to.equal('[0]');
  });

  it('Test refSubKey', function () {
    expect(func.refSubKey('0[0]')).to.equal('[0][0]');
  });

  it('Test getDeepKeys', function () {
    const obj = {
      string: 'string',
      number: 1,
      arr: [1, 2, 3],
      arrObj: [{ a: 1 }, { a: 1 }],
      arrdeep4: [[[[[[1], [1], 12]]]]]
    };

    const res = func.getDeepKeys(obj);

    expect(res).to.eql([
      'string',
      'number',
      'arr',
      'arr[0]',
      'arrObj',
      'arrObj[0].a',
      'arrdeep4',
      'arrdeep4[0][0]',
      'arrdeep4[0][0][0][0]',
      'arrdeep4[0][0][0][0][0][0]'
    ]);
  });
});
