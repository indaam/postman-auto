// func.getLastArray
function getLastArray(arr) {
  if (arr && arr.length) {
    return arr[arr.length - 1];
  }
  return arr;
}

// func.camelCaseToDash
function camelCaseToDash(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

// func.toCamelCase
function toCamelCase(str) {
  return str
    .toLowerCase()
    .replace(/^([A-Z])|[\s-_](\w)/g, function (match, p1, p2) {
      return p2.toUpperCase();
    });
}

// func.toSnakeCase
function toSnakeCase(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}

// func.cleanName
function cleanName(str) {
  return str.split(/\W|\d/).join(' ').replace(/  +/g, ' ');
}

// func.removeSpace
function removeSpace(str) {
  return str.replace(/\s+/g, '');
}

// func.replaceString
function replaceString(str, claener, replacer) {
  const re = new RegExp(claener, 'g');
  return str.replace(re, replacer || '');
}

// func.typeOf
function typeOf(p) {
  if (typeof p === 'undefined') {
    return 'Undefined';
  }
  return p === null ? 'Null' : p.constructor.name;
}

// func.toJson
function toJson(data) {
  try {
    return JSON.parse(data);
  } catch (error) {
    return null;
    // throw error;
  }
}

// func.getSubKeyArrObj
function getSubKeyArrObj(i, key, sub) {
  const keyIsNumber = !isNaN(key);
  const dIsNumber = !isNaN(sub);

  if (keyIsNumber && dIsNumber) {
    return cleanKey(`[${key}][${i}][${sub}]`);
  } else if (keyIsNumber && !dIsNumber) {
    return cleanKey(`[${key}][${i}].${sub}`);
  } else if (!keyIsNumber && dIsNumber) {
    return cleanKey(`${key}[${i}][${sub}]`);
  }
  return cleanKey(`${key}[${i}].${sub}`);
}

function getDeepKeys(obj, limit = 1) {
  let temp = [];

  for (const key in obj) {
    // pure obj
    if (typeOf(obj[key]) === 'Object') {
      temp.push(`${key}`);

      const subsKey = getDeepKeys(obj[key], limit).map(d => {
        return key + '.' + d;
      });

      temp = temp.concat(subsKey);

      // pure array
    } else if (typeOf(obj[key]) === 'Array') {
      temp.push(`${key}`);

      for (var i = 0; i < obj[key].length; i++) {
        if (i > limit - 1) {
          continue;
        }

        // both Array & object
        if (typeof obj[key][i] !== 'object') {
          temp.push(key + '[' + i + ']');
        } else {
          const subsKey = getDeepKeys(obj[key][i], limit).map(sub => {
            sub = refSubKey(sub);
            return getSubKeyArrObj(i, key, sub);
          });

          temp = temp.concat(subsKey);
        }
      }
    } else {
      temp.push(key);
    }
  }
  return temp;
}

// func.cleanKey
function cleanKey(key) {
  return key
    .replace('[[', '[')
    .replace(']]', ']')
    .replace(/\]\.\[/g, '][');
}

// func.refSubKey
function refSubKey(str) {
  const re = /\d+\[\d+\]/g;
  return str.replace(re, function (m, p1, p2) {
    const ar = p2.split('[');
    ar[0] = '[' + ar[0] + '][';
    const res = ar.join('');
    return res;
  });
}

// func.getObjectKeys
function getObjectKeys(data, wrapper, separator) {
  if (typeOf(data) === 'Object' && Object.keys(data).length) {
    return Object.keys(data)
      .map(d => `${wrapper}${d}${wrapper}`)
      .join(separator);
  }
  if (typeOf(data) === 'Array' && data.length) {
    return data.map(d => `${wrapper}${d}${wrapper}`).join(separator);
  }
  return null;
}

// func.validateJsKey
function validateJsKey(str) {
  // if (/\w+\-\w+/.test(str)) {
  if (/(\w+\-\w+)|\.\d+.+/.test(str)) {
    const arr = str.split('.');
    const temp = [];
    for (let index = 0; index < arr.length; index++) {
      const el = arr[index];
      if (index === 0) {
        temp.push(el);
      } else {
        temp.push("['" + el + "']");
      }
    }
    return temp.join('');
  }

  return str;
}
// func.validatePyKey
function validatePyKey(k) {
  return k
    .split('.')
    .map(function (d) {
      const re = /\[\d+\]/g;
      // check if posible array
      if (re.test(d)) {
        const arrs = d.split(re);
        const arrm = d.match(re);

        return "['" + arrs[0] + "']" + arrm.join('');
      }
      return "['" + d + "']";
    })
    .join('');
}
// func.inArray
function inArray(val, arr) {
  return !!(arr.indexOf(val) > -1);
  // return arr.incluses(val);
}

const func = {
  getLastArray,
  camelCaseToDash,
  toCamelCase,
  toSnakeCase,
  cleanName,
  removeSpace,
  replaceString,
  typeOf,
  toJson,
  getDeepKeys,
  cleanKey,
  refSubKey,
  getObjectKeys,
  validateJsKey,
  validatePyKey,
  inArray
};

const isCollecttion = ['Array', 'Object', 'String', 'Boolean'];

for (let index = 0; index < isCollecttion.length; index++) {
  const el = isCollecttion[index];

  func['is' + el] = function (data) {
    return typeOf(data) === el;
  };
}

module.exports = func;

/**
 * func.getLastArray
 * Get last value in Array
 *
 * @category Function
 * @param {Array} array The array to inspect.
 * @returns {*} Returns the last value of array.
 * @example
 *
 * getLastArray([1, 2, 3]);
 * // => 3
 *
 */

/**
 * func.camelCaseToDash
 * Convert string camelCase to -
 *
 * @category Function
 * @param {String} value The value.
 * @returns {String} Returns the string.
 * @example
 *
 * camelCaseToDash("camelCaseToDash");
 * // => camel-case-to-dash
 *
 */

/**
 * func.toCamelCase
 * Convert string to toCamelCase
 *
 * @category Function
 * @param {String} value The value.
 * @returns {String} Returns the string.
 * @example
 *
 * toCamelCase("to_camel_case");
 * // => toCamelCase
 *
 * toCamelCase("to-camel-case");
 * // => toCamelCase
 *
 * toCamelCase("to camel case");
 * // => toCamelCase
 *
 */

/**
 * func.toSnakeCase
 * Convert string to to_snake_case
 *
 * @category Function
 * @param {String} value The value.
 * @returns {String} Returns the string.
 * @example
 *
 * toCamelCase("toSnakeCase");
 * // => to_snake_case
 *
 *
 */

/**
 * func.cleanName
 * Remove all char and number in string
 *
 * @category Function
 * @param {String} value The value.
 * @returns {String} Returns the string.
 * @example
 *
 * cleanName("@clean@Name1");
 * // =>  clean Name
 *
 *
 */

/**
 * func.typeOf
 * Get the constuctor name of Prototype
 *
 * @category Function
 * @param {*} value The value to check.
 * @returns {String} Returns the string constuctor name.
 * @example
 *
 * typeOf([]);
 * // =>  Array
 *
 * typeOf({});
 * // =>  Object
 *
 *
 */

/**
 * func.inArray
 * Check value in Array
 *
 * @category Function
 * @param {*} value The value to check.
 * @param {Array} array The array
 * @returns {Boolean} Returns true if value in Array
 * @example
 *
 * inArray(1, [1]);
 * // =>  true
 *
 * inArray(1, []);
 * // =>  false
 *
 *
 */

/**
 * func.toJson
 * Convert to json, like JSON.parse but ignore error
 *
 * @category Function
 * @param {string} value The value
 * @returns {Object | null} Returns the json object
 * @example
 *
 * inArray('{"name" : "ken"}');
 * // =>  {"name" : "ken"}
 *
 *
 */

/**
 * func.replaceString
 * Replace string by RegeXp
 *
 * @category Function
 * @param {String} value The value.
 * @param {String} string convert to RegExp
 * @returns {String} Returns the string.
 * @example
 *
 * replaceString('@abc@', '@');
 * * // => abc
 * replaceString('@abc@', '@', '_');
 * // => _abc_
 *
 */
