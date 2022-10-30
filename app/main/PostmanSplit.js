const BaseTest = require('./BaseTest');

class PostmanSplit extends BaseTest {
  constructor(options) {
    super();
    this.options = options;
  }

  splitItems(items, postmanTemp) {
    let temp = [];

    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      const itemHaveChild = this.isItemHaveChild(item);
      if (itemHaveChild) {
        const res = this.splitItems(item.item, postmanTemp);
        temp = temp.concat(res);
      } else {
        temp.push(
          Object.assign({}, postmanTemp, {
            info: Object.assign({}, postmanTemp.info, {
              name: postmanTemp.info.name
            }),
            item: [item]
          })
        );
      }
    }
    return temp;
  }

  createSplit(postmanCollection) {
    const postmanItems = postmanCollection && postmanCollection.item;
    const postmanTemp = Object.assign({}, postmanCollection, {
      item: null
    });

    return this.splitItems(postmanItems, postmanTemp);
  }
}
module.exports = PostmanSplit;
