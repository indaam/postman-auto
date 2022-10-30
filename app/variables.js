// process, __dirname, from node js
const CWD = process.cwd();
const DIRNAME = __dirname;

// python
const PY_INDENT = '  ';
const PATH_PY_TEMPLATE = './template/python';
const FILE_PY_BASE_TEST = 'BaseTest.py';
const FILE_PY_CLASS_OPEN = 'ClassOpen.py';
const FILE_PY_TEST_SELF = 'test_self.py';
const FILE_PY_README = 'README.md';

// python
const PATH_JS_TEMPLATE = './template/javascript';
const FILE_JS_PACKAGE_JSON = 'package.json';
const FILE_JS_README = 'README.md';

// postman
const PATH_PM_TEMPLATE = './template/postman';
const FILE_PM_PACKAGE_JSON = 'package.json';
const FILE_PM_PREFIX = 'postman_collection';
const FILE_PM_README = 'README.md';

// dest
const BASE_DEST = 'pm-auto-output';
const DEST_PYTHON = BASE_DEST + '/python';
const DEST_POSTAMN = BASE_DEST + '/postman';
const DEST_JAVASCRIPT = BASE_DEST + '/javascript';

module.exports = {
  CWD,
  DIRNAME,
  PY_INDENT,
  PATH_PY_TEMPLATE,
  FILE_PY_BASE_TEST,
  FILE_PY_CLASS_OPEN,
  FILE_PY_README,
  FILE_PY_TEST_SELF,
  DEST_PYTHON,
  DEST_POSTAMN,
  DEST_JAVASCRIPT,
  PATH_PM_TEMPLATE,
  FILE_PM_PACKAGE_JSON,
  FILE_PM_PREFIX,
  FILE_PM_README,
  PATH_JS_TEMPLATE,
  FILE_JS_PACKAGE_JSON,
  FILE_JS_README
};
