import type { ITweenData, ITweenValue } from './tween';

const str = Object.prototype.toString;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getTargets(element: any, data: Partial<ITweenData>): Array<ITweenValue>
{
    const result: Array<ITweenValue> = [];

    for (const key in data)
    {
        if (key in element)
        {
            const startValue = element[key];
            const endValue = (data as any)[key];

            if (isNumber(startValue) && isNumber(endValue))
                result.push([key, startValue, endValue]);
            else if (isArray(startValue) && isArray(endValue))
                result.push([key, startValue.slice(), mergeArrays(startValue, endValue)]);
        }
    }

    return result;
}

export function isNumber(value: number): boolean
{
    return typeof value === 'number' && isFinite(value);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isArray(value: any): boolean
{
    return (value.BYTES_PER_ELEMENT && str.call(value.buffer) === '[object ArrayBuffer]') || Array.isArray(value);
}

export function mergeArrays<T>(a: Array<T>, b: Array<T>): Array<T>
{
    const result = a.slice();

    for (let i = 0; i < Math.min(a.length, b.length); i++)
        result[i] = b[i];

    return result;
}

export function randomString(length = 10): string
{
    let result = '';

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++)
        result += characters.charAt(Math.floor(Math.random() * charactersLength));

    return result;
}
