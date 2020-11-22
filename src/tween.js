import { getTargets, isNumber } from './utils';

import Base from './base';
import { defaults } from './defaults';
import { getEasing } from './easing';

// eslint-disable-next-line no-empty-function
const noop = () => {};

/**
 *
 * Tween
 *
 * @export
 * @class Tween
 * @extends {Base}
 */
export default class Tween extends Base
{
    /**
     * Creates an instance of Tween.
     *
     * @param {object} target
     * @param {object} [data={}]
     */
    constructor(target, data = {})
    {
        super(data);

        this.target = target;
        this.data = data;
        this.values = undefined;

        this.yoyo = data?.yoyo ?? defaults.yoyo;
        this.ease = getEasing(data?.ease ?? defaults.ease);
        this.yoyoEase = getEasing(data?.yoyoEase ?? this.ease);
        this.easing = this.ease;

        // callbacks
        this.onStart = data?.onStart ?? noop;
        this.onUpdate = data?.onUpdate ?? noop;
        this.onRepeat = data?.onRepeat ?? noop;
        this.onComplete = data?.onComplete ?? noop;

        // base runners
        this.baseStart.add(this);
        this.baseUpdate.add(this);
        this.baseRepeat.add(this);
        this.baseDirection.add(this);
        this.baseComplete.add(this);
    }

    /**
     *
     * prepare
     *
     */
    prepare()
    {
        this.values = getTargets(this.target, this.data);

        if (this._isReversed)
        {
            this.setEndValues();

            this.swapValues();
        }

        // store start value
        if (this.values.length > 0)
        {
            this.values[0].sStart = this.values[0].start;
        }
    }

    /**
     *
     * onBaseStart
     *
     * @param {Base} base
     */
    onBaseStart()
    {
        // start callback
        this.onStart();
    }

    /**
     *
     * onBaseUpdate
     *
     * @param {Base} base
     * @param {number} progress
     * @param {number} deltaTime
     */
    onBaseUpdate(base, progress)
    {
        const alpha = this.easing(progress);

        // update object properties
        for (let i = 0, j = this.values.length; i < j; i++)
        {
            const value = this.values[i];
            const key = value.key;

            if (isNumber(value.start))
            {
                this.target[key] = (value.start * (1 - alpha)) + (value.end * alpha);
            }
            else
            {
                for (let k = 0, l = value.end.length; k < l; k++)
                {
                    const valueStart = value.start[k];
                    const valueEnd = value.end[k];

                    this.target[key][k] = (valueStart * (1 - alpha)) + (valueEnd * alpha);
                }
            }
        }

        // update callback
        this.onUpdate(this.target, progress);
    }

    /**
     *
     * onBaseRepeat
     *
     * @param {Base} base
     * @param {number} currentLoop
     */
    onBaseRepeat(base, currentLoop)
    {
        this.setEndValues();

        this.onRepeat(currentLoop);
    }

    /**
     *
     * onBaseDirection
     *
     * @param {Base} base
     * @param {boolean} isReversed
     */
    onBaseDirection(base, isReversed)
    {
        const start = this.values[0].start;
        const sStart = this.values[0].sStart;

        // return if direction is correct
        if (((start === sStart) && !isReversed) || ((start !== sStart) && isReversed))
        {
            return;
        }

        // swap easing functions
        this.easing = isReversed ? this.yoyoEase : this.ease;

        // swap values
        this.swapValues();
    }

    /**
     *
     * onBaseComplete
     *
     * @param {Base} base
     */
    onBaseComplete()
    {
        this.setEndValues();

        // complete callback
        this.onComplete();
    }

    /**
     *
     * swapValues
     *
     */
    swapValues()
    {
        for (let i = 0, j = this.values.length; i < j; i++)
        {
            const value = this.values[i];

            const tmp = value.start;

            value.start = value.end;
            value.end = tmp;
        }
    }

    /**
     *
     * setEndValues
     *
     */
    setEndValues()
    {
        for (let i = 0, j = this.values.length; i < j; i++)
        {
            const target = this.values[i];
            const key = target.key;

            this.target[key] = target.end;
        }
    }

    /**
     *
     * kill
     *
     * @param {boolean} [force=false]
     */
    kill(force = false)
    {
        if (this.protected && !force)
        {
            return;
        }

        this.yoyo = null;
        this.ease = null;
        this.yoyoEase = null;
        this.easing = null;

        this.onStart = null;
        this.onUpdate = null;
        this.onRepeat = null;
        this.onComplete = null;

        super.kill();
    }
}
