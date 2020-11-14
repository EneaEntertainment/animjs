import Base from './base';
import { defaults } from './defaults';
import { getEasing } from './easing';
import { getTargets } from './utils';

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
            // force end values and swap start/end values
            this.setEndValues();
            this.swapValues();
        }
    }

    /**
     *
     * onBaseStart
     *
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
     */
    onBaseUpdate(base, progress)
    {
        const alpha = this.easing(progress);

        // update object properties
        for (let i = 0, j = this.values.length; i < j; i++)
        {
            const value = this.values[i];
            const key = value.key;

            this.target[key] = (value.start * (1 - alpha)) + (value.end * alpha);
        }

        // update callback
        this.onUpdate(progress, alpha);
    }

    /**
     *
     * onBaseRepeat
     *
     */
    onBaseRepeat()
    {
        this.setEndValues();

        // repeat callback
        this.onRepeat();

        // swap easing functions
        this.easing = this.repeat % 2 === 0 ? this.yoyoEase : this.ease;

        this.swapValues();
    }

    /**
     *
     * onBaseComplete
     *
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
