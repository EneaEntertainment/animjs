import Base from './base';

const propIsEnumerable = Object.prototype.propertyIsEnumerable;
const ignores = ownEnumerableKeys(new Base());

/**
 *
 * ownEnumerableKeys
 *
 * @export
 * @param {object} obj
 * @returns {object}
 */
export function ownEnumerableKeys(obj)
{
    let keys = Object.getOwnPropertyNames(obj);

    if (Object.getOwnPropertySymbols)
    {
        keys = keys.concat(Object.getOwnPropertySymbols(obj));
    }

    return keys.filter((key) =>
    {
        return propIsEnumerable.call(obj, key);
    });
}

/**
 *
 * getTargets
 *
 * @export
 * @param {object} element
 * @param {object} data
 * @returns {array<object>}
 */
export function getTargets(element, data)
{
    const result = [];
    const dataKeys = ownEnumerableKeys(data);

    for (const key in data)
    {
        // copy properties as needed
        if (dataKeys.indexOf(key) >= 0 && key in element && ignores.indexOf(key) === -1)
        {
            const startValue = element[key];
            const endValue = data[key];

            result.push({
                key   : key,
                start : startValue,
                end   : endValue
            });
        }
    }

    return result;
}

/**
 *
 * randomString
 *
 * @export
 * @param {number} [length=10]
 * @returns {string}
 */
export function randomString(length = 10)
{
    let result = '';

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++)
    {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
