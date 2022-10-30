const BaseTest = require('./BaseTest');
const func = require('../func');
const { _get, postman2har, HTTPSnippet, path } = require('../libs');

const {
  CWD,
  DIRNAME,
  PY_INDENT,
  DEST_PYTHON,
  PATH_PY_TEMPLATE,
  FILE_PY_BASE_TEST,
  FILE_PY_CLASS_OPEN,
  FILE_PY_TEST_SELF,
  FILE_PY_README
} = require('../variables');

class PythonTest extends BaseTest {
  constructor(options) {
    super();
    this.options = options;
  }

  getTemplate(key, replacer) {
    const template = {
      initMain: `\n\nif __name__ == '__main__':\n${PY_INDENT}unittest.main()`
    };

    if (replacer) {
      return template[key].replace('{{TITLE}}', replacer);
    }

    return template[key];
  }

  expectTest(dataType, options, getTestTitle) {
    const pyFn = {
      Object: `self.is_object`,
      Boolean: `self.is_bool`,
      Array: `self.is_array`,
      Number: `self.is_number`,
      String: `self.is_string`,
      Null: `self.is_null`
    };

    const expectTestObjFn = function (key, title, objectKeys) {
      const isRoot = key === "['ROOT']";
      const keyTest = `resp_json${isRoot ? '' : '' + key}`;
      const testObjectKeys = func.getObjectKeys(objectKeys, "'", ',');

      if (testObjectKeys) {
        return objectKeys
          .map(d => {
            const childTitle = getTestTitle({
              key: key,
              dataType: 'Object',
              objectKeys: [d]
            });
            return `\n${PY_INDENT}${PY_INDENT}self.assertEqual(self.have_property(${keyTest}, '${d}'), True, "${childTitle}")`;
          })
          .join('');
      }
      return `\n${PY_INDENT}${PY_INDENT}self.assertEqual(self.is_object(${keyTest}), True, "${title}")`;
    };

    if (func.inArray(dataType, options.skipType)) {
      return function (key /* title */) {
        return `\n${PY_INDENT}${PY_INDENT}# Skip test ${key} because value is ${dataType}`;
      };
    }

    if (dataType === 'Object') {
      return function (key, title, objectKeys) {
        return expectTestObjFn(key, title, objectKeys);
      };
    }
    return function (key, title) {
      return `\n${PY_INDENT}${PY_INDENT}self.assertEqual(${pyFn[dataType]}(resp_json${key}), True, "${title}")`;
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
          temp.push(`${PY_INDENT}${PY_INDENT}# SKIP ${key} */\n`);
        } else {
          const res = this.writeTestCollection(
            Object.assign({}, expect, {
              key: func.validatePyKey(expect.key)
            }),
            options
          );
          temp.push(res);
        }
      }
    } else {
      temp.push(`${PY_INDENT}${PY_INDENT}# SKIP TEST NO DATA\n\n`);
    }
    return temp.join('');
  }

  wrapItemTest(data, options) {
    const fnName = this.createFnName(data.item.name);

    const items = {
      method: `\n${PY_INDENT}def test_${fnName}(self):`,
      httpSnippet: `${this.replaceHttpSnippet(data)}`,
      httpCloseConn: `\n${PY_INDENT}${PY_INDENT}conn.close()`,
      promiseClose: `\n${PY_INDENT}${PY_INDENT}resp_json = json.loads(data.decode("utf-8"))\n\n`,
      expectLists: this.createExpect(data.test, options)
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
        return `${PY_INDENT}${PY_INDENT}# ${title}${expectTest(
          key,
          title,
          objectKeys
        )}\n\n`;
      },
      Array: function (title, key) {
        return `${PY_INDENT}${PY_INDENT}# ${title}${expectTest(
          key,
          title
        )}\n\n`;
      },
      Null: function (title, key) {
        return `${PY_INDENT}${PY_INDENT}# ${title}${expectTest(
          key,
          title
        )}\n\n`;
      },
      Number: function (title, key) {
        return `${PY_INDENT}${PY_INDENT}# ${title}${expectTest(
          key,
          title
        )}\n\n`;
      },
      String: function (title, key) {
        return `${PY_INDENT}${PY_INDENT}# ${title}${expectTest(
          key,
          title
        )}\n\n`;
      },
      Boolean: function (title, key) {
        return `${PY_INDENT}${PY_INDENT}# ${title}${expectTest(
          key,
          title
        )}\n\n`;
      }
    };

    return collection[dataType](title, key, objectKeys);
  }

  replaceHttpSnippet(data) {
    if (data && data.httpSnippet) {
      return data.httpSnippet
        .replace('print', '# print')
        .replace(`import http.client`, '')
        .replace(/\n/g, `\n${PY_INDENT}${PY_INDENT}`);
    }
    return null;
  }

  createItemTest(data, options) {
    const temp = [];

    temp.push(`\n${PY_INDENT}# ${data.item.name}`);
    temp.push(this.wrapItemTest(data, options));

    return temp.join('');
  }

  createFnName(name) {
    return func.toSnakeCase(func.toCamelCase(func.cleanName(name)));
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
    const created = this.dateCreated();
    const initMain = this.getTemplate('initMain');

    const pathClassOpen = path.resolve(
      DIRNAME,
      PATH_PY_TEMPLATE,
      FILE_PY_CLASS_OPEN
    );
    const pathBaseTest = path.resolve(
      DIRNAME,
      PATH_PY_TEMPLATE,
      FILE_PY_BASE_TEST
    );
    const pathReadme = path.resolve(DIRNAME, PATH_PY_TEMPLATE, FILE_PY_README);
    const pathTestSelf = path.resolve(
      DIRNAME,
      PATH_PY_TEMPLATE,
      FILE_PY_TEST_SELF
    );

    const contentClassOpen = await this.getFileContent(pathClassOpen);
    const contentBaseTest = await this.getFileContent(pathBaseTest);
    const contentReadme = await this.getFileContent(pathReadme);
    const contentTestSelf = await this.getFileContent(pathTestSelf);
    const dateCreated = this.dateCreated(' ');

    return [
      {
        key: 'readme',
        fileName: FILE_PY_README,
        path: './',
        content: contentReadme.replace('{{DATE_CREATED}}', dateCreated)
      },
      {
        key: 'init',
        fileName: '__init__.py',
        path: './tests/',
        content: ''
      },
      {
        key: 'basetest',
        fileName: FILE_PY_BASE_TEST,
        path: './tests/',
        content: created + contentBaseTest
      },
      {
        key: 'testbase',
        fileName: FILE_PY_TEST_SELF,
        path: './tests/',
        content:
          created +
          (contentClassOpen + contentTestSelf + initMain).replace(
            'ClassName',
            'TestSelf'
          )
      }
    ];
  }

  async createTestListsSplit(dataModels, options) {
    const tempLists = await this.baseTestLists();
    const created = this.dateCreated();

    const pathClassOpen = path.resolve(
      DIRNAME,
      PATH_PY_TEMPLATE,
      FILE_PY_CLASS_OPEN
    );
    const contentClassOpen = await this.getFileContent(pathClassOpen);

    for (let index = 0; index < dataModels.length; index++) {
      const data = dataModels[index];
      const itemTest = this.createItemTest(data, options);
      const fnName = this.createFnName(data.item.name);
      const fileName = this.createFnName(data.item.name);
      const className = this.createClassName(data.item.name);

      options &&
        options.showLog &&
        console.log('Create python test', data.item.name);

      tempLists.push({
        key: fnName,
        fileName: 'test_' + fileName + '.py',
        path: './tests/',
        content:
          created +
          (contentClassOpen + itemTest).replace('ClassName', className)
      });
    }

    return tempLists.map(function (d) {
      return Object.assign({}, d, {
        outputPath: path.resolve(CWD, DEST_PYTHON, d.path, d.fileName)
      });
    });
  }

  async createTestLists(dataModels, options) {
    const tempLists = await this.baseTestLists();
    const created = this.dateCreated();
    const initMain = this.getTemplate('initMain');

    const pathClassOpen = path.resolve(
      DIRNAME,
      PATH_PY_TEMPLATE,
      FILE_PY_CLASS_OPEN
    );

    const contentClassOpen = await this.getFileContent(pathClassOpen);
    const fileName = this.createFnName(dataModels[0].info.name);
    const testContent = [created, contentClassOpen];

    for (let index = 0; index < dataModels.length; index++) {
      const data = dataModels[index];
      const itemTest = this.createItemTest(data, options);
      testContent.push(itemTest);
    }

    testContent.push(initMain);

    tempLists.push({
      key: 'test_http',
      fileName: 'test_' + fileName + '.py',
      path: './tests/',
      content: testContent.join('')
    });

    return tempLists.map(function (d) {
      return Object.assign({}, d, {
        outputPath: path.resolve(CWD, DEST_PYTHON, d.path, d.fileName)
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
      'python',
      'native',
      libs
    );

    if (this.options && this.options.mergeTestFile) {
      return await this.createTestLists(dataModels, this.options);
    }
    return await this.createTestListsSplit(dataModels, this.options);
  }
}

module.exports = PythonTest;
