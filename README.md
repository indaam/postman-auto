# Postman Auto #
a CLI to auto generate postman tests from json response

## Noted
Before use this app, you need to have knowledge about postman test [Postman Test Script](https://learning.postman.com/docs/writing-scripts/test-scripts/)

Also have litle knowlage about [unittest](https://en.wikipedia.org/wiki/Unit_testing)

### Setup Postman Collection
This app use postman response to create auto test. So you need to include postman response into postman collections.
![Postman Response](https://github.com/indaam/postman-auto/blob/master/images-sample/postman-response.png?raw=true)

See `Postman Example.postman_collection.json`

## Getting started
* Require : [node](https://nodejs.org/en/) `>= v10`
* Optional : [python](https://www.python.org/)
* Optional : [yarn](https://yarnpkg.com)

## Install
Open the terminal, then
```console
$ npm install -g postman-auto
```

## Usage
cd to postman colections, then

```console
$ pm-auto sample-collection.json
```

### Test Result
By default, this app will create directory structure

```
pm-auto-output
  |- postman
  |- javascript
  |- python
```

cd to output directory and read `README.md`

![Postman Test](https://github.com/indaam/postman-auto/blob/master/images-sample/cli-postman-test-result.png?raw=true)

![Javascript Test](https://github.com/indaam/postman-auto/blob/master/images-sample/cli-javascript-test-result.png?raw=true)

![Python Test](https://github.com/indaam/postman-auto/blob/master/images-sample/cli-python-test-result.png?raw=true)

### Testing Test Result
For example--test postman result

```console
$ cd pm-auto-output/postman && npm install && npm run test
```

or

```console
$ cd pm-auto-output/postman && yarn install && yarn test
```

or

```console
$ cd pm-auto-output/postman && npm install
```

## Command Line Options

### `postman-auto [options]`

- `--help` <br />
Show command line help

- `--version`<br />
  Displays the current version


### `postman-auto <postman-collection> [options]`

- `--skipType <source>`<br />
  This skip create test. Default `["Null"]`, <br />
  Example skip Null and Array, `--skipType Null,Array`

- `--skipKeys <source>`<br />
  This skip create test spesific json key, default `null`
  Example: skip `data.name`, `--skipType data.name`

- `--output <source>`<br />
  Default will create 3 outputs, postman collection, javascript with mocha & chai and pyton with unittest.


### How it works?
Simple, its just read the postman response then create script test, example

Postman response
```javascript

{
    "args": {},
    "data": {
        "name": "indaam",
        "hobbies": [
            {
                "id": 0,
                "name": "anything"
            }
        ],
        "arr": [
            0,
            "1"
        ],
        "_boolean": true
    },
    "files": {},
}

```

Script test result
```javascript

var jsonData = pm.response.json();

pm.test(
  "Should response must be object and have keys 'args','data','files','form','headers','json','url' ",
  function () {
    pm.expect(jsonData).to.have.property("args");
    pm.expect(jsonData).to.have.property("data");
    pm.expect(jsonData).to.have.property("files");
  }
);

pm.test("Should args must be object ", function () {
  pm.expect(jsonData.args).to.be.an("object");
});

pm.test("Should data.name to be String", function () {
  pm.expect(jsonData.data.name).to.be.a("string");
});

pm.test("Should data.hobbies to be Array", function () {
  pm.expect(jsonData.data.hobbies).to.be.a("array");
});

pm.test("Should data.hobbies[0].id to be Number", function () {
  pm.expect(jsonData.data.hobbies[0].id).to.be.a("number");
});

pm.test("Should data.hobbies[0].name to be String", function () {
  pm.expect(jsonData.data.hobbies[0].name).to.be.a("string");
});

pm.test("Should data.arr to be Array", function () {
  pm.expect(jsonData.data.arr).to.be.a("array");
});

pm.test("Should data.arr[0] to be Number", function () {
  pm.expect(jsonData.data.arr[0]).to.be.a("number");
});

```

## Application Flow
* read postman collection
* get the sample response
* convert to object
* create object keys
* define test list base on key & type data
* convert postman item to [HAR](https://en.wikipedia.org/wiki/HAR_(file_format))
* create http snippet from har
* write unittest


## Limitation
On this first release, just create very simple test--only check type data on json response

* string
* number
* boolean
* null
* bject
* array

But on reality test, sometimes we need to create specific test like is valid date format, valid lat long. It not enough when only check type data.

For example case, when you have response latitude with value `-90.679436` is valid or not? by value check is valid. But on reality, where is `-90.679436` point? So is better when check max value for latitude.

## Use as library
### install

```console
$ npm i postman-auto
```

### usage

```javascript
const pma = require('postman-auto');
const postmanCollections = require('Postman Example.postman_collection.json');

// or
/*
const {
  PostmanTest,
  PostmanSplit,
  NodeJsTest,
  PythonTest,
  Main,
  func,
  utils
} = require('postman-auto');
*/

const options = {
  skipKeys: [],
  skipType: ['Null'],
  mergeTestFile: false,
  mixTestObject: false,
  output: [],
  showLog: true
};

const result = pma(postmanCollections, options);
console.log('result', result);

// Basic Docs

/*
{
  PostmanTest: [class PostmanTest extends BaseTest],
  PostmanSplit: [class PostmanSplit extends BaseTest],
  NodeJsTest: [class NodeJsTest extends BaseTest],
  PythonTest: [class PythonTest extends BaseTest],
  Main: [class Main extends BaseClass] {
    writeFile: [Function: writeFile],
    writeResults: [Function: writeResults],
    createPostmanSplit: [Function: createPostmanSplit],
    createPostmanTest: [AsyncFunction: createPostmanTest],
    createPythonTest: [AsyncFunction: createPythonTest],
    createNodeJsTest: [AsyncFunction: createNodeJsTest]
  },
  func: {
    getLastArray: [Function: getLastArray],
    camelCaseToDash: [Function: camelCaseToDash],
    toCamelCase: [Function: toCamelCase],
    toSnakeCase: [Function: toSnakeCase],
    cleanName: [Function: cleanName],
    removeSpace: [Function: removeSpace],
    replaceString: [Function: replaceString],
    typeOf: [Function: typeOf],
    toJson: [Function: toJson],
    getDeepKeys: [Function: getDeepKeys],
    cleanKey: [Function: cleanKey],
    refSubKey: [Function: refSubKey],
    getObjectKeys: [Function: getObjectKeys],
    validateJsKey: [Function: validateJsKey],
    validatePyKey: [Function: validatePyKey],
    inArray: [Function: inArray],
    isArray: [Function],
    isObject: [Function],
    isString: [Function],
    isBoolean: [Function]
  },
  utils: {
    readFile: [AsyncFunction: readFile],
    writeFile: [Function: writeFile]
  }
}
*/

```

## Becarefull
Its better to use this CLI on staging env

## Todos
* Migrate to typescript
* Add more options
* Add more languange
* Add specific type
* Complated the docs
* Complated comment script
