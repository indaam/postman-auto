const BaseTest = require('./BaseTest');

const func = require('../func');
const { prettier, _get, path } = require('../libs');

const {
  CWD,
  DIRNAME,
  PATH_PM_TEMPLATE,
  FILE_PM_PACKAGE_JSON,
  FILE_PM_README,
  DEST_POSTAMN,
  FILE_PM_PREFIX
} = require('../variables');

class PostmanTest extends BaseTest {
  constructor(options) {
    super();
    this.options = options;
  }

  expectTest(dataType, options) {
    const expectTestObjFn = function (key, objectKeys) {
      const isRoot = key === 'ROOT';
      const keyTest = `jsonData${isRoot ? '' : '.' + key}`;
      const testObjectKeys = func.getObjectKeys(objectKeys, "'", ',');

      if (testObjectKeys) {
        if (options && options.mixTestObject) {
          return `pm.expect(${keyTest}).to.have.keys(${testObjectKeys}).be.an('object');`;
        }

        return objectKeys
          .map(d => {
            return `pm.expect(${keyTest}).to.have.property('${d}');`;
          })
          .join('');
      }
      return `pm.expect(${keyTest}).to.be.an('object');`;
    };

    if (func.inArray(dataType, options.skipType)) {
      return function (key) {
        return `/* Skip test ${key} because value is ${dataType} */`;
      };
    }

    if (dataType === 'Object') {
      return function (key, objectKeys) {
        return expectTestObjFn(key, objectKeys);
      };
    }
    return function (key) {
      return `pm.expect(jsonData.${key}).to.be.a('${dataType.toLowerCase()}');`;
    };
  }

  getTestTitle(params) {
    const { dataType, key } = params;
    const testObjectKeys = func.getObjectKeys(params.objectKeys, "'", ',');

    const title = {
      Object: `Should ${key} must be object ${
        testObjectKeys ? `and have keys ${testObjectKeys}` : ''
      } `,
      Boolean: `Should ${key} to be Boolean`,
      Array: `Should ${key} to be Array`,
      Number: `Should ${key} to be Number`,
      String: `Should ${key} to be String`,
      Null: `Should ${key} to be Null`
    };

    return title[dataType];
  }

  writeTestCollection(params, options) {
    const { dataType, key, name, objectKeys } = params;

    const expectTest = this.expectTest(dataType, options);
    const title = this.getTestTitle(params);

    const collection = {
      Object: function (title, key, objectKeys) {
        return `pm.test("${title}", function () {
            ${expectTest(key, objectKeys)}
          });
          `;
      },
      Array: function (title, key) {
        return `pm.test("${title}", function () {
          ${expectTest(key)}
        });`;
      },
      Null: function (title, key) {
        return `pm.test("${title}", function () {
          ${expectTest(key)}
        });`;
      },
      Number: function (title, key) {
        return `pm.test("${title}", function () {
          ${expectTest(key)}
        });`;
      },
      String: function (title, key) {
        return `pm.test("${title}", function () {
          ${expectTest(key)}
        });`;
      },
      Boolean: function (title, key) {
        return `pm.test("${title}", function () {
          ${expectTest(key)}
        });`;
      }
    };

    const result = collection[dataType](title, key, objectKeys);
    return this.prettiTestScript(result, name);
  }

  prettiTestScript(str, name) {
    try {
      // console.log('CREATE TEST', name);
      return prettier.format(str, { semi: true, parser: 'babel' });
    } catch (error) {
      console.log('SKIP TEST', name);
      return null;
    }
  }

  initTestScript(name) {
    const str = `
    /* ${name} Test Script */

    /* Define jsonData  */
    var jsonData = pm.response.json();

    pm.test("Status code is 200", function () {
      pm.response.to.have.status(200);
    });

    pm.test("Content-Type is present", function () {
      pm.response.to.have.header("Content-Type");
    });

    `;
    return this.prettiTestScript(str, 'root');
  }

  initTestResponse(bodyResponse, item, options) {
    if (func.isObject(bodyResponse)) {
      const objectKeys = func.isObject(bodyResponse)
        ? Object.keys(bodyResponse)
        : null;

      return this.writeTestCollection(
        {
          dataType: 'Object',
          key: 'ROOT',
          objectKeys: objectKeys,
          name: item && item.name
        },
        options
      );
    }
    return null;
  }

  createChildTest(temp, params, options) {
    const { keyLists, bodyResponse, item } = params;

    for (let index = 0; index < keyLists.length; index++) {
      const key = keyLists[index];
      const data = _get(bodyResponse, key);
      const dataType = func.typeOf(data);
      const objectKeys = func.isObject(data) ? Object.keys(data) : null;

      const testResult = this.writeTestCollection(
        {
          key: func.validateJsKey(key),
          dataType: dataType,
          objectKeys: objectKeys,
          name: item && item.name
        },
        options
      );

      temp.pm_test.push(testResult);
      temp.test.push({
        key: key,
        dataType: dataType,
        objectKeys: func.isObject(data) ? Object.keys(data) : null
      });
    }
  }

  createTestLists(data, options) {
    const { item, bodyResponse } = data;
    const testCollection = {
      pm_test: [],
      test: []
    };

    const keyLists = func.getDeepKeys(bodyResponse);
    const initTestScript = this.initTestScript(item && item.name);
    const initTestResponse = this.initTestResponse(bodyResponse, item, options);

    if (initTestScript && initTestResponse) {
      testCollection.pm_test.push(initTestScript);
      testCollection.pm_test.push(initTestResponse);
      testCollection.test.push({
        key: 'ROOT',
        dataType: func.typeOf(bodyResponse),
        objectKeys: func.isObject(bodyResponse)
          ? Object.keys(bodyResponse)
          : null
      });
      this.createChildTest(
        testCollection,
        Object.assign(data, {
          keyLists: keyLists
        }),
        options
      );
    }

    return testCollection;
  }

  generateScriptTest(item, options) {
    const data = {
      item: item,
      bodyResponse: func.toJson(item.response[0].body)
    };

    return this.createTestLists(data, options);
  }

  setItemEventTest(item, scriptTestResult) {
    // const itemHaveEvent = this.isItemHaveEvent(item);
    // if (!itemHaveEvent) {
    item['event'] = [];
    item['event'][0] = {
      listen: 'test',
      script: {
        exec: scriptTestResult.pm_test
      }
    };
    // }
    return item;
  }

  setTestForOther(item, scriptTestResult) {
    item['test'] = scriptTestResult.test;
    return item;
  }

  generateTestItems(items, options) {
    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      const itemHaveChild = this.isItemHaveChild(item);

      if (itemHaveChild) {
        for (let index = 0; index < item.item.length; index++) {
          this.generateTestItems(item.item, options);
        }
      } else {
        options &&
          options.showLog &&
          console.log('Create postman test', item.name);
        const itemHaveRequest = this.isItemhaveRequest(item);
        const itemHaveResponse = this.isItemHaveResponse(item);

        if (itemHaveRequest && itemHaveResponse) {
          const scriptTestResult = this.generateScriptTest(item, options);
          this.setItemEventTest(item, scriptTestResult);
          this.setTestForOther(item, scriptTestResult);
        }
      }
    }

    return items;
  }

  updateItems(postmanCollection, options) {
    const postmanItems = postmanCollection && postmanCollection.item;
    const items = this.generateTestItems(postmanItems, options);
    return items;
  }

  async createTest(postmanCollection) {
    const postmanItem = this.updateItems(postmanCollection, this.options);

    const pathReadme = path.resolve(DIRNAME, PATH_PM_TEMPLATE, FILE_PM_README);
    const pathPackageJson = path.resolve(
      DIRNAME,
      PATH_PM_TEMPLATE,
      FILE_PM_PACKAGE_JSON
    );

    const contentReadme = await this.getFileContent(pathReadme);
    const contentPackageJson = await this.getFileContent(pathPackageJson);

    const pmJsonFileName = func.replaceString(
      postmanCollection.info.name + '.' + FILE_PM_PREFIX + '.json',
      ' ',
      '_'
    );

    const dateCreated = this.dateCreated(' ');

    return [
      {
        key: 'readme',
        fileName: FILE_PM_README,
        path: './',
        content: contentReadme.replace('{{DATE_CREATED}}', dateCreated)
      },
      {
        key: 'package',
        fileName: FILE_PM_PACKAGE_JSON,
        path: './',
        content: contentPackageJson.replace('{{OUTPUT_NAME}}', pmJsonFileName)
      },
      {
        key: 'postman',
        fileName: pmJsonFileName,
        path: './',
        content: Object.assign({}, postmanCollection, {
          created: dateCreated,
          item: postmanItem
        })
      }
    ].map(function (d) {
      return Object.assign({}, d, {
        outputPath: path.resolve(CWD, DEST_POSTAMN, d.path, d.fileName)
      });
    });
  }
}

module.exports = PostmanTest;
