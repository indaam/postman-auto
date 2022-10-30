const BaseTest = require('./BaseTest');
const func = require('../func');
const { prettier, _get, postman2har, HTTPSnippet, path } = require('../libs');

const {
  CWD,
  DIRNAME,
  DEST_JAVASCRIPT,
  PATH_JS_TEMPLATE,
  FILE_JS_PACKAGE_JSON,
  FILE_JS_README
} = require('../variables');

class NodeJsTest extends BaseTest {
  constructor(options) {
    super();
    this.options = options;
  }

  getTemplate(key, replacer) {
    const template = {
      importLibs: `const expect = require('chai').expect;\nconst http = require('https');`,
      openDescribe: `describe('{{TITLE}}', function () {`,
      closeDescribe: `});`,
      comment: `/* {{TITLE}} */`,
      fnPromiseOpen: `const httpPromise = function () {`,
      fnPromiseClose: `};`,
      promiseOpen: `return new Promise((resolve, reject) => {`,
      promiseClose: `});`,
      itOpen: `it('{{TITLE}}', function (done) {`,
      itClose: `});`,
      httpPromisOpen: `httpPromise().then(function (res) {`,
      httpPromisClose: `}).catch(console.log);`,
      resResponse: `const jsonResponse = JSON.parse(res);`,
      itDone: `done();`
    };

    if (replacer) {
      return template[key].replace('{{TITLE}}', replacer);
    }

    return template[key];
  }

  expectTest(dataType, options /* getTestTitle */) {
    const expectTestObjFn = function (key, title, objectKeys) {
      const isRoot = key === 'ROOT';
      const keyTest = `jsonResponse${isRoot ? '' : '.' + key}`;
      const testObjectKeys = func.getObjectKeys(objectKeys, "'", ',');

      if (testObjectKeys) {
        if (options && options.mixTestObject) {
          return `expect(${keyTest}).to.have.keys(${testObjectKeys}).be.an('object', "${title}");`;
        }

        return objectKeys
          .map(d => {
            /*
            const childTitle = getTestTitle({
              key: key,
              dataType: 'Object',
              objectKeys: [d]
            });
            */
            return `expect(${keyTest}).to.have.property('${d}');`;
          })
          .join('');
      }
      return `expect(${keyTest}).to.be.an('object', "${title}");`;
    };

    if (func.inArray(dataType, options.skipType)) {
      return function (key) {
        return `/* Skip test ${key} because value is ${dataType} */`;
      };
    }

    if (dataType === 'Object') {
      return function (key, title, objectKeys) {
        return expectTestObjFn(key, title, objectKeys);
      };
    }
    return function (key, title) {
      return `expect(jsonResponse.${key}).to.be.a('${dataType.toLowerCase()}', "${title}");`;
    };
  }

  createExpect(expecList, options) {
    const temp = [];
    if (func.isArray(expecList) && expecList.length) {
      const skipKeys = (options && options.skipKeys) || [];
      for (let index = 0; index < expecList.length; index++) {
        const expect = expecList[index];
        const key = expect.key;

        if (skipKeys.includes(key)) {
          temp.push(`/* SKIP ${key} */\n`);
        } else {
          const res = this.writeTestCollection(
            Object.assign({}, expect, {
              key: func.validateJsKey(key)
            }),
            options
          );
          temp.push(res);
        }
      }
    } else {
      temp.push(`\n/* SKIP TEST NO DATA */ \n`);
    }
    return temp.join('');
  }

  wrapItemTest(data, options) {
    const items = {
      fnPromiseOpen: this.getTemplate('fnPromiseOpen'),
      promiseOpen: this.getTemplate('promiseOpen'),
      httpSnippet: this.replaceHttpSnippet(data),
      promiseClose: this.getTemplate('promiseClose'),
      fnPromiseClose: this.getTemplate('fnPromiseClose'),
      itOpen: this.getTemplate('itOpen', data.item.name),
      httpPromisOpen: this.getTemplate('httpPromisOpen'),
      resResponse: this.getTemplate('resResponse'),
      expectLists: this.createExpect(data.test, options),
      itDone: this.getTemplate('itDone'),
      httpPromisClose: this.getTemplate('httpPromisClose'),
      itClose: this.getTemplate('itClose')
    };

    return Object.keys(items)
      .map(function (k) {
        return items[k];
      })
      .join('');
  }

  writeTestCollection(params, options) {
    const { dataType, key, objectKeys } = params;

    const expectTest = this.expectTest(dataType, options, this.getTestTitle);
    const title = this.getTestTitle(params);

    const collection = {
      Object: function (title, key, objectKeys) {
        return `\n/* ${title} */\n${expectTest(key, title, objectKeys)}\n`;
      },
      Array: function (title, key) {
        return `\n/* ${title} */\n${expectTest(key, title)}\n`;
      },
      Null: function (title, key) {
        return `\n/* ${title} */\n${expectTest(key, title)}\n`;
      },
      Number: function (title, key) {
        return `\n/* ${title} */\n${expectTest(key, title)}\n`;
      },
      String: function (title, key) {
        return `\n/* ${title} */\n${expectTest(key, title)}\n`;
      },
      Boolean: function (title, key) {
        return `\n/* ${title} */\n${expectTest(key, title)}\n`;
      }
    };

    return collection[dataType](title, key, objectKeys);
  }

  replaceHttpSnippet(data) {
    if (data && data.httpSnippet) {
      return data.httpSnippet
        .replace('console.log', 'resolve')
        .replace(
          /(const\shttp\s=\srequire\().https.\)/gi,
          "/* const http = require('https') */\n"
        );
    }
    return null;
  }

  createItemTest(data, options) {
    const openDescribe = this.getTemplate('openDescribe', data.item.name);
    const closeDescribe = this.getTemplate('closeDescribe');
    const temp = [];

    temp.push(openDescribe);
    temp.push(this.wrapItemTest(data, options));
    temp.push(closeDescribe);

    return this.prettyCode(temp.join(''));
  }

  prettyCode(str) {
    return prettier.format(str, {
      parser: 'babel',
      singleQuote: true,
      bracketSpacing: true,
      jsxBracketSameLine: false,
      printWidth: 80,
      tabWidth: 2,
      trailingComma: 'none',
      semi: true,
      arrowParens: 'avoid'
    });
  }

  createFnName(name) {
    return func.toCamelCase(func.cleanName(name));
  }

  createClassName(name) {
    const str = func.toCamelCase(func.cleanName(name));
    return str
      .split('')
      .map(function (s, i) {
        return i === 0 ? s.toUpperCase() : s;
      })
      .join('');
  }

  async baseTestLists() {
    const pathReadme = path.resolve(DIRNAME, PATH_JS_TEMPLATE, FILE_JS_README);
    const pathPackageJson = path.resolve(
      DIRNAME,
      PATH_JS_TEMPLATE,
      FILE_JS_PACKAGE_JSON
    );

    const contentReadme = await this.getFileContent(pathReadme);
    const contentPackageJson = await this.getFileContent(pathPackageJson);
    const dateCreated = this.dateCreated(' ');

    return [
      {
        key: 'readme',
        fileName: FILE_JS_README,
        path: './',
        content: contentReadme.replace('{{DATE_CREATED}}', dateCreated)
      },
      {
        key: 'package',
        fileName: FILE_JS_PACKAGE_JSON,
        path: './',
        content: contentPackageJson
      }
    ];
  }

  async createTestListsSplit(dataModels, options) {
    const tempLists = await this.baseTestLists();
    const created = this.dateCreated('// ');
    const templateImportLibs = this.getTemplate('importLibs');

    for (let index = 0; index < dataModels.length; index++) {
      const data = dataModels[index];
      const itemTest = this.createItemTest(data, options);
      const fnName = this.createFnName(data.item.name);
      const fileName = this.createFnName(data.item.name);

      options &&
        options.showLog &&
        console.log('Create javascript test', data.item.name);

      tempLists.push({
        key: fnName,
        fileName: '' + fileName + '.js',
        path: './test/',
        content: created + templateImportLibs + '\n\n' + itemTest
      });
    }

    return tempLists.map(function (d) {
      return Object.assign({}, d, {
        outputPath: path.resolve(CWD, DEST_JAVASCRIPT, d.path, d.fileName)
      });
    });
  }

  async createTestLists(dataModels, options) {
    const tempLists = await this.baseTestLists();
    const created = this.dateCreated('//');

    const templateImportLibs = this.getTemplate('importLibs');
    const templateOpenDescribe = this.getTemplate(
      'openDescribe',
      dataModels[0]['info']['name']
    );
    const templateCloseDescribe = this.getTemplate('closeDescribe');

    const fileName = this.createFnName(dataModels[0].info.name);
    const testContent = [created, templateImportLibs + '\n\n'];

    testContent.push(templateOpenDescribe);

    for (let index = 0; index < dataModels.length; index++) {
      const data = dataModels[index];
      const itemTest = this.createItemTest(data, options);
      testContent.push('\n' + itemTest);
    }

    testContent.push(templateCloseDescribe);

    tempLists.push({
      key: 'test_http',
      fileName: fileName + '.js',
      path: './test/',
      content: this.prettyCode(testContent.join(''))
    });

    return tempLists.map(function (d) {
      return Object.assign({}, d, {
        outputPath: path.resolve(CWD, DEST_JAVASCRIPT, d.path, d.fileName)
      });
    });
  }

  async createTest(postmanSplit) {
    const libs = {
      postman2har: postman2har,
      HTTPSnippet: HTTPSnippet,
      _get: _get
    };
    const dataModels = await this.createDataModel(
      postmanSplit,
      'node',
      'native',
      libs
    );

    if (this.options && this.options.mergeTestFile) {
      return await this.createTestLists(dataModels, this.options);
    }
    return await this.createTestListsSplit(dataModels, this.options);
  }
}

module.exports = NodeJsTest;
