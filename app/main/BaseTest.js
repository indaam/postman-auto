const utils = require('../utils');
const func = require('../func');
class BaseTest {
  constructor() {
    this.options = {};
  }

  // BaseTest.isItemHaveEvent
  isItemHaveEvent(item) {
    return !!(item && item.event && item.event.length);
  }

  // BaseTest.isItemHaveChild
  isItemHaveChild(item) {
    return !!(item && item.item && item.item.length);
  }

  isItemhaveRequest(item) {
    return !!(item && item.request);
  }

  isItemHaveResponse(item) {
    return !!(item && item.response && item.response.length);
  }

  async getFileContent(filePath) {
    try {
      return utils.readFile(filePath);
    } catch (error) {
      throw error;
    }
  }

  dateCreated(before) {
    before = before || '# ';
    return `${before}Auto create at ${new Date().toDateString()} \n`;
  }

  getTestTitle(params) {
    const { dataType, key, objectKeys } = params;
    const testObjectKeys = func.getObjectKeys(objectKeys, "'", ',');
    const singular =
      func.isArray(objectKeys) && objectKeys.length === 1 ? '' : 's';

    const title = {
      Object: `Should ${key} must be an object ${
        testObjectKeys ? `and have key${singular} ${testObjectKeys}` : ''
      } `,
      Boolean: `Should ${key} to be a Boolean`,
      Array: `Should ${key} to be an Array`,
      Number: `Should ${key} to be Number`,
      String: `Should ${key} to be String`,
      Null: `Should ${key} to be Null`
    };

    return title[dataType];
  }

  async createHttpModel(postmanCollection, target, client, libs) {
    const harCollection = await libs.postman2har(postmanCollection);
    const httpsnippet = new libs.HTTPSnippet(harCollection[0]);
    return {
      httpSnippet: httpsnippet.convert(target, client),
      test: libs._get(postmanCollection, '["item"][0]["test"]'),
      item: libs._get(postmanCollection, '["item"][0]'),
      info: libs._get(postmanCollection, '["info"]')
    };
  }

  async createDataModel(postmanSplit, target, client, libs) {
    const temp = [];
    if (func.isArray(postmanSplit)) {
      for await (const postmanCollection of postmanSplit) {
        const collection = await this.createHttpModel(
          postmanCollection,
          target,
          client,
          libs
        );
        temp.push(collection);
      }
    }
    return temp;
  }
}

module.exports = BaseTest;

/** BaseTest init base test class */

/**
 * BaseTest.isItemHaveEvent
 * @params {Object} Postman Item
 * @retun {Boolean} true when item have property event and have len
 */
