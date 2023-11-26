/* eslint-disable no-nested-ternary */
/* eslint-disable no-mixed-operators */

import type { IStringEasings } from './easing-types';

const PI2 = Math.PI / 2;

export class Easing
{
    static linear(t: number): number
    {
        return t;
    }

    static none = Easing.linear;

    static back =
        {
            in    : Easing.backIn,
            out   : Easing.backOut,
            inOut : Easing.backInOut
        };

    static backIn(t: number): number
    {
        const s = 1.70158;

        return t * t * ((s + 1) * t - s);
    }

    static backOut(t: number): number
    {
        const s = 1.70158;

        return --t * t * ((s + 1) * t + s) + 1;
    }

    static backInOut(t: number): number
    {
        const s = 1.70158 * 1.525;

        if ((t *= 2) < 1)
            return 0.5 * (t * t * ((s + 1) * t - s));

        return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2);
    }

    static bounce =
        {
            in    : Easing.bounceIn,
            out   : Easing.bounceOut,
            inOut : Easing.bounceInOut
        };

    static bounceIn(t: number): number
    {
        return 1.0 - Easing.bounceOut(1.0 - t);
    }

    static bounceOut(t: number): number
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

    static bounceInOut(t: number): number
    {
        return t < 0.5 ?
            0.5 * (1.0 - Easing.bounceOut(1.0 - t * 2.0)) :
            0.5 * Easing.bounceOut(t * 2.0 - 1.0) + 0.5;
    }

    static circ =
        {
            in    : Easing.circIn,
            out   : Easing.circOut,
            inOut : Easing.circInOut
        };

    static circIn(t: number): number
    {
        return 1.0 - Math.sqrt(1.0 - t * t);
    }

    static circOut(t: number): number
    {
        return Math.sqrt(1 - (--t * t));
    }

    static circInOut(t: number): number
    {
        if ((t *= 2) < 1) return -0.5 * (Math.sqrt(1 - t * t) - 1);

        return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
    }

    static cubic =
        {
            in    : Easing.cubicIn,
            out   : Easing.cubicOut,
            inOut : Easing.cubicInOut
        };

    static cubicIn(t: number): number
    {
        return t * t * t;
    }

    static cubicOut(t: number): number
    {
        const f = t - 1.0;

        return f * f * f + 1.0;
    }

    static cubicInOut(t: number): number
    {
        return t < 0.5 ?
            4.0 * t * t * t :
            0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;
    }

    static elastic =
        {
            in    : Easing.elasticIn,
            out   : Easing.elasticOut,
            inOut : Easing.elasticInOut
        };

    static elasticIn(t: number): number
    {
        return Math.sin(13.0 * t * PI2) * Math.pow(2.0, 10.0 * (t - 1.0));
    }

    static elasticOut(t: number): number
    {
        return Math.sin(-13.0 * (t + 1.0) * PI2) * Math.pow(2.0, -10.0 * t) + 1.0;
    }

    static elasticInOut(t: number): number
    {
        return t < 0.5 ?
            0.5 * Math.sin(+13.0 * PI2 * 2.0 * t) * Math.pow(2.0, 10.0 * (2.0 * t - 1.0)) :
            0.5 * Math.sin(-13.0 * PI2 * ((2.0 * t - 1.0) + 1.0)) * Math.pow(2.0, -10.0 * (2.0 * t - 1.0)) + 1.0;
    }

    static expo =
        {
            in    : Easing.expoIn,
            out   : Easing.expoOut,
            inOut : Easing.expoInOut
        };

    static expoIn(t: number): number
    {
        return t === 0.0 ? t : Math.pow(2.0, 10.0 * (t - 1.0));
    }

    static expoOut(t: number): number
    {
        return t === 1.0 ? t : 1.0 - Math.pow(2.0, -10.0 * t);
    }

    static expoInOut(t: number): number
    {
        return (t === 0.0 || t === 1.0) ?
            t :
            t < 0.5 ?
                +0.5 * Math.pow(2.0, (20.0 * t) - 10.0) :
                -0.5 * Math.pow(2.0, 10.0 - (t * 20.0)) + 1.0;
    }

    static quad =
        {
            in    : Easing.quadIn,
            out   : Easing.quadOut,
            inOut : Easing.quadInOut
        };

    static quadIn(t: number): number
    {
        return t * t;
    }

    static quadOut(t: number): number
    {
        return -t * (t - 2.0);
    }

    static quadInOut(t: number): number
    {
        t /= 0.5;

        if (t < 1) return 0.5 * t * t;

        t--;

        return -0.5 * (t * (t - 2) - 1);
    }

    static quart =
        {
            in    : Easing.quartIn,
            out   : Easing.quartOut,
            inOut : Easing.quartInOut
        };

    static quartIn(t: number): number
    {
        return Math.pow(t, 4.0);
    }

    static quartOut(t: number): number
    {
        return Math.pow(t - 1.0, 3.0) * (1.0 - t) + 1.0;
    }

    static quartInOut(t: number): number
    {
        return t < 0.5 ?
            +8.0 * Math.pow(t, 4.0) :
            -8.0 * Math.pow(t - 1.0, 4.0) + 1.0;
    }

    static quint =
        {
            in    : Easing.quintIn,
            out   : Easing.quintOut,
            inOut : Easing.quintInOut
        };

    static quintIn(t: number): number
    {
        return t * t * t * t * t;
    }

    static quintOut(t: number): number
    {
        return --t * t * t * t * t + 1;
    }

    static quintInOut(t: number): number
    {
        if ((t *= 2) < 1) return 0.5 * t * t * t * t * t;

        return 0.5 * ((t -= 2) * t * t * t * t + 2);
    }

    static sine =
        {
            in    : Easing.sineIn,
            out   : Easing.sineOut,
            inOut : Easing.sineInOut
        };

    static sineIn(t: number): number
    {
        const v = Math.cos(t * Math.PI * 0.5);

        if (Math.abs(v) < 1e-14) return 1;

        return 1 - v;
    }

    static sineOut(t: number): number
    {
        return Math.sin(t * PI2);
    }

    static sineInOut(t: number): number
    {
        return -0.5 * (Math.cos(Math.PI * t) - 1);
    }
}

export function getEasing(easing: IStringEasings | ((time: number)=> number)): (time: number)=> number
{
    if (typeof easing === 'string' || easing instanceof String)
        return Easing[easing as keyof Easing];

    return easing;
}

/**
 *
 * stepped
 *
 * example:
 *
 *     anim.to(myObject,
 *      {
 *          x    : 100,
 *          ease : (time) => { return stepped(time, 5); },
 *      });
 *
 * @export
 * @param {number} time
 * @param {number} steps
 * @returns {number}
 */
export function stepped(time: number, steps: number): number
{
    return Math.max(0, Math.min(1, (((steps * time) | 0) + 1) * (1 / steps)));
}

/**
 *
 * cubicBezier
 *
 * thx: https://github.dev/thednp/CubicBezier
 * preview: https://cubic-bezier.com
 *
 * example:
 *
 *      const easingFunction = cubicBezier(0.44, 1.58, 0.63, 1);
 *
 *      anim.to(myObject,
 *          {
 *              x     : 100,
 *              ease  : (time: number) => { return easingFunction(time); }
 *          });
 *  }
 *
 * @export
 * @param {number} p1x
 * @param {number} p1y
 * @param {number} p2x
 * @param {number} p2y
 * @returns {(t: number)=> number}
 */
export function cubicBezier(p1x: number, p1y: number, p2x: number, p2y: number): (time: number)=> number
{
    function sampleCurveX(time: number): number
    {
        return ((((ax * time) + bx) * time) + cx) * time;
    }

    function sampleCurveY(time: number): number
    {
        return ((((ay * time) + by) * time) + cy) * time;
    }

    function sampleCurveDerivativeX(time: number): number
    {
        return (((3 * ax * time) + (2 * bx)) * time) + cx;
    }

    function solveCurveX(x: number): number
    {
        let t0;
        let t1;
        let t2;
        let x2;
        let d2;
        let i;

        // Precision
        const epsilon = 1e-5;

        // First try a few iterations of Newton's method -- normally very fast.
        for (t2 = x, i = 0; i < 32; i += 1)
        {
            x2 = sampleCurveX(t2) - x;

            if (Math.abs(x2) < epsilon) return t2;

            d2 = sampleCurveDerivativeX(t2);

            if (Math.abs(d2) < epsilon)
                break;

            t2 -= x2 / d2;
        }

        // No solution found - use bi-section
        t0 = 0;
        t1 = 1;
        t2 = x;

        if (t2 < t0) return t0;
        if (t2 > t1) return t1;

        while (t0 < t1)
        {
            x2 = sampleCurveX(t2);

            if (Math.abs(x2 - x) < epsilon) return t2;

            if (x > x2)
                t0 = t2;
            else
                t1 = t2;

            t2 = ((t1 - t0) * 0.5) + t0;
        }

        // Give up
        return t2;
    }

    // pre-calculate the polynomial coefficients
    // First and last control points are implied to be (0, 0) and (1, 1)
    const cx = 3 * p1x;
    const bx = (3 * (p2x - p1x)) - cx;
    const ax = 1 - cx - bx;
    const cy = 3 * p1y;
    const by = (3 * (p2y - p1y)) - cy;
    const ay = 1 - cy - by;

    const BezierEasing = (time: number) => sampleCurveY(solveCurveX(time));

    return BezierEasing;
}
