const str = Object.prototype.toString;

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

    for (const key in data)
    {
        if (key in element)
        {
            const startValue = element[key];
            const endValue = data[key];

            if (isNumber(startValue) && isNumber(endValue))
            {
                result.push([
                    key,
                    startValue,
                    endValue
                ]);
            }
            else if (isArray(startValue) && isArray(endValue))
            {
                result.push([
                    key,
                    startValue.slice(),
                    mergeArrays(startValue, endValue)
                ]);
            }
        }
    }

    return result;
}

/**
 *
 * isNumber
 *
 * @export
 * @param {any} value
 * @returns {boolean}
 */
export function isNumber(value)
{
    return typeof value === 'number' && isFinite(value);
}

/**
 *
 * isArray
 *
 * @export
 * @param {any} value
 * @returns {boolean}
 */
export function isArray(value)
{
    return (value.BYTES_PER_ELEMENT && str.call(value.buffer) === '[object ArrayBuffer]') || Array.isArray(value);
}

/**
 *
 * arraysEqual
 *
 * @export
 * @param {array} a
 * @param {array} b
 * @returns {boolean}
 */
export function arraysEqual(a, b)
{
    for (let i = 0; i < a.length; i++)
    {
        if (a[i] !== b[i])
        {
            return false;
        }
    }

    return true;
}

/**
 *
 * mergeArrays
 *
 * @export
 * @param {array} a
 * @param {array} b
 * @returns {array}
 */
export function mergeArrays(a, b)
{
    const result = a.slice();

    for (let i = 0; i < Math.min(a.length, b.length); i++)
    {
        result[i] = b[i];
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
