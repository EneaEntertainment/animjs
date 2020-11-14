/* eslint-disable no-nested-ternary */
/* eslint-disable no-mixed-operators */

const PI2 = Math.PI / 2;

/**
 *
 * Easing
 *
 * @export
 * @class Easing
 */
export default class Easing
{
    /**
     *
     * linear
     *
     * @static
     * @param {number} t
     * @returns {number}
     */
    static linear(t)
    {
        return t;
    }

    /**
     *
     * back
     *
     * @static
     * @param {number} t
     * @returns {number}
     */

    /**
     *
     * backIn
     *
     * @static
     * @param {number} t
     * @returns {number}
     */
    static backIn(t)
    {
        const s = 1.70158;

        return t * t * ((s + 1) * t - s);
    }

    /**
     *
     * backOut
     *
     * @static
     * @param {number} t
     * @returns {number}
     */
    static backOut(t)
    {
        const s = 1.70158;

        return --t * t * ((s + 1) * t + s) + 1;
    }

    /**
     *
     * backInOut
     *
     * @static
     * @param {number} t
     * @returns {number}
     */
    static backInOut(t)
    {
        const s = 1.70158 * 1.525;

        if ((t *= 2) < 1)
        {
            return 0.5 * (t * t * ((s + 1) * t - s));
        }

        return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2);
    }

    /**
     *
     * bounceIn
     *
     * @static
     * @param {number} t
     * @returns {number}
     */
    static bounceIn(t)
    {
        return 1.0 - Easing.bounceOut(1.0 - t);
    }

    /**
     *
     * bounceOut
     *
     * @static
     * @param {number} t
     * @returns {number}
     */
    static bounceOut(t)
    {
        const a = 4.0 / 11.0;
        const b = 8.0 / 11.0;
        const c = 9.0 / 10.0;
        const ca = 4356.0 / 361.0;
        const cb = 35442.0 / 1805.0;
        const cc = 16061.0 / 1805.0;
        const t2 = t * t;

        return t < a ?
            7.5625 * t2 :
            t < b ?
                9.075 * t2 - 9.9 * t + 3.4 :
                t < c ?
                    ca * t2 - cb * t + cc :
                    10.8 * t * t - 20.52 * t + 10.72;
    }

    /**
     *
     * bounceInOut
     *
     * @static
     * @param {number} t
     * @returns {number}
     */
    static bounceInOut(t)
    {
        return t < 0.5 ?
            0.5 * (1.0 - Easing.bounceOut(1.0 - t * 2.0)) :
            0.5 * Easing.bounceOut(t * 2.0 - 1.0) + 0.5;
    }

    /**
     *
     * circIn
     *
     * @static
     * @param {number} t
     * @returns {number}
     */
    static circIn(t)
    {
        return 1.0 - Math.sqrt(1.0 - t * t);
    }

    /**
     *
     * circOut
     *
     * @static
     * @param {number} t
     * @returns {number}
     */
    static circOut(t)
    {
        return Math.sqrt(1 - (--t * t));
    }

    /**
     *
     * circInOut
     *
     * @static
     * @param {number} t
     * @returns {number}
     */
    static circInOut(t)
    {
        if ((t *= 2) < 1) return -0.5 * (Math.sqrt(1 - t * t) - 1);

        return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
    }

    /**
     *
     * cubicIn
     *
     * @static
     * @param {number} t
     * @returns {number}
     */
    static cubicIn(t)
    {
        return t * t * t;
    }

    /**
     *
     * cubicOut
     *
     * @static
     * @param {number} t
     * @returns {number}
     */
    static cubicOut(t)
    {
        const f = t - 1.0;

        return f * f * f + 1.0;
    }

    /**
     *
     * cubicInOut
     *
     * @static
     * @param {number} t
     * @returns {number}
     */
    static cubicInOut(t)
    {
        return t < 0.5 ?
            4.0 * t * t * t :
            0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;
    }

    /**
     *
     * elasticIn
     *
     * @static
     * @param {number} t
     * @returns {number}
     */
    static elasticIn(t)
    {
        return Math.sin(13.0 * t * PI2) * Math.pow(2.0, 10.0 * (t - 1.0));
    }

    /**
     *
     * elasticOut
     *
     * @static
     * @param {number} t
     * @returns {number}
     */
    static elasticOut(t)
    {
        return Math.sin(-13.0 * (t + 1.0) * PI2) * Math.pow(2.0, -10.0 * t) + 1.0;
    }

    /**
     *
     * elasticInOut
     *
     * @static
     * @param {number} t
     * @returns {number}
     */
    static elasticInOut(t)
    {
        return t < 0.5 ?
            0.5 * Math.sin(+13.0 * PI2 * 2.0 * t) * Math.pow(2.0, 10.0 * (2.0 * t - 1.0)) :
            0.5 * Math.sin(-13.0 * PI2 * ((2.0 * t - 1.0) + 1.0)) * Math.pow(2.0, -10.0 * (2.0 * t - 1.0)) + 1.0;
    }

    /**
     *
     * expoIn
     *
     * @static
     * @param {number} t
     * @returns {number}
     */
    static expoIn(t)
    {
        return t === 0.0 ? t : Math.pow(2.0, 10.0 * (t - 1.0));
    }

    /**
     *
     * expoOut
     *
     * @static
     * @param {number} t
     * @returns {number}
     */
    static expoOut(t)
    {
        return t === 1.0 ? t : 1.0 - Math.pow(2.0, -10.0 * t);
    }

    /**
     *
     * expoInOut
     *
     * @static
     * @param {number} t
     * @returns {number}
     */
    static expoInOut(t)
    {
        return (t === 0.0 || t === 1.0) ?
            t :
            t < 0.5 ?
                +0.5 * Math.pow(2.0, (20.0 * t) - 10.0) :
                -0.5 * Math.pow(2.0, 10.0 - (t * 20.0)) + 1.0;
    }

    /**
     *
     * quadIn
     *
     * @static
     * @param {number} t
     * @returns {number}
     */
    static quadIn(t)
    {
        return t * t;
    }

    /**
     *
     * quadOut
     *
     * @static
     * @param {number} t
     * @returns {number}
     */
    static quadOut(t)
    {
        return -t * (t - 2.0);
    }

    /**
     *
     * quadInOut
     *
     * @static
     * @param {number} t
     * @returns {number}
     */
    static quadInOut(t)
    {
        t /= 0.5;

        if (t < 1) return 0.5 * t * t;

        t--;

        return -0.5 * (t * (t - 2) - 1);
    }

    /**
     *
     * quartIn
     *
     * @static
     * @param {number} t
     * @returns {number}
     */
    static quartIn(t)
    {
        return Math.pow(t, 4.0);
    }

    /**
     *
     * quartOut
     *
     * @static
     * @param {number} t
     * @returns {number}
     */
    static quartOut(t)
    {
        return Math.pow(t - 1.0, 3.0) * (1.0 - t) + 1.0;
    }

    /**
     *
     * quartInOut
     *
     * @static
     * @param {number} t
     * @returns {number}
     */
    static quartInOut(t)
    {
        return t < 0.5 ?
            +8.0 * Math.pow(t, 4.0) :
            -8.0 * Math.pow(t - 1.0, 4.0) + 1.0;
    }

    /**
     *
     * quintIn
     *
     * @static
     * @param {number} t
     * @returns {number}
     */
    static quintIn(t)
    {
        return t * t * t * t * t;
    }

    /**
     *
     * quintOut
     *
     * @static
     * @param {number} t
     * @returns {number}
     */
    static quintOut(t)
    {
        return --t * t * t * t * t + 1;
    }

    /**
     *
     * quintInOut
     *
     * @static
     * @param {number} t
     * @returns {number}
     */
    static quintInOut(t)
    {
        if ((t *= 2) < 1) return 0.5 * t * t * t * t * t;

        return 0.5 * ((t -= 2) * t * t * t * t + 2);
    }

    /**
     *
     * sineIn
     *
     * @static
     * @param {number} t
     * @returns {number}
     */
    static sineIn (t)
    {
        const v = Math.cos(t * Math.PI * 0.5);

        if (Math.abs(v) < 1e-14) return 1;

        return 1 - v;
    }

    /**
     *
     * sineOut
     *
     * @static
     * @param {number} t
     * @returns {number}
     */
    static sineOut(t)
    {
        return Math.sin(t * PI2);
    }

    /**
     *
     * sineInOut
     *
     * @static
     * @param {number} t
     * @returns {number}
     */
    static sineInOut(t)
    {
        return -0.5 * (Math.cos(Math.PI * t) - 1);
    }
}

Easing.none = Easing.linear;

Easing.back =
    {
        in    : Easing.backIn,
        out   : Easing.backOut,
        inOut : Easing.backInOut
    };

Easing.bounce =
    {
        in    : Easing.bounceIn,
        out   : Easing.bounceOut,
        inOut : Easing.bounceInOut
    };

Easing.circ =
    {
        in    : Easing.circIn,
        out   : Easing.circOut,
        inOut : Easing.circInOut
    };

Easing.cubic =
    {
        in    : Easing.cubicIn,
        out   : Easing.cubicOut,
        inOut : Easing.cubicInOut
    };

Easing.elastic =
    {
        in    : Easing.elasticIn,
        out   : Easing.elasticOut,
        inOut : Easing.elasticInOut
    };

Easing.expo =
    {
        in    : Easing.expoIn,
        out   : Easing.expoOut,
        inOut : Easing.expoInOut
    };

Easing.quad =
    {
        in    : Easing.quadIn,
        out   : Easing.quadOut,
        inOut : Easing.quadInOut
    };

Easing.quart =
    {
        in    : Easing.quartIn,
        out   : Easing.quartOut,
        inOut : Easing.quartInOut
    };

Easing.quint =
    {
        in    : Easing.quintIn,
        out   : Easing.quintOut,
        inOut : Easing.quintInOut
    };

Easing.sine =
    {
        in    : Easing.sineIn,
        out   : Easing.sineOut,
        inOut : Easing.sineInOut
    };

/**
 *
 * getEasing
 *
 * @export
 * @param {string|function} easing
 * @returns {function}
 */
export function getEasing(easing)
{
    if (typeof easing === 'string' || easing instanceof String)
    {
        // eslint-disable-next-line no-prototype-builtins
        if (Easing.hasOwnProperty(easing))
        {
            return Easing[easing];
        }

        const result = getDeep(Easing, easing);

        if (typeof result === 'function')
        {
            return result;
        }

        // eslint-disable-next-line no-throw-literal
        throw `Unknown easing: ${easing}`;
    }

    return easing;
}

/**
 *
 * getDeep
 *
 * @param {object} obj
 * @param {string} path
 * @returns {object}
 */
function getDeep(obj, path)
{
    path = path.replace(/\[(\w+)\]/g, '.$1');
    path = path.replace(/^\./, '');

    const tmp = path.split('.');

    for (let i = 0, l = tmp.length; i < l; ++i)
    {
        const n = tmp[i];

        if (n in obj)
        {
            obj = obj[n];
        }
        else
        {
            return null;
        }
    }

    return obj;
}
