import { arraysEqual, getTargets } from './utils';

import Runner from './runner';
import { defaults } from './defaults';
import { getEasing } from './easing';

const KEY = 0;
const START = 1;
const END = 2;
const SSTART = 3;

/**
 *
 * Tween
 *
 * @export
 * @class Tween
 */
export default class Tween
{
    /**
     * Creates an instance of Tween.
     *
     * @param {object} target
     * @param {object} data
     * @param {boolean} [ignoreRunners=false]
     */
    constructor(target, data = {}, ignoreRunners = false)
    {
        this.target = target;
        this.data = data;
        this.values = [];
        this.active = true;
        this.cancelling = false;
        this.paused = data?.paused ?? defaults.paused;
        this.protected = data?.protected ?? defaults.protected;
        this.autoUpdate = data?.autoUpdate ?? defaults.autoUpdate;
        this.started = false;
        this._isReversed = false;

        this.delay = data?.delay ?? defaults.delay;
        this.duration = data?.duration ?? defaults.duration;
        this.repeat = data?.repeat ?? defaults.repeat;
        this.repeatDelay = data?.repeatDelay ?? defaults.repeatDelay;

        // set repeat to some large number if repeat is set to 'infinite'
        if (this.repeat < 0)
        {
            this.repeat = 1e10;
        }

        this.time = -this.delay;
        this.loop = this.repeat;

        this.progress = 0;

        this.totalDuration = ((this.duration * (this.repeat + 1)) + (this.repeat * this.repeatDelay)) + this.delay;

        this.yoyo = data?.yoyo ?? defaults.yoyo;
        this.ease = getEasing(data?.ease ?? defaults.ease);
        this.yoyoEase = getEasing(data?.yoyoEase ?? this.ease);
        this.easing = this.ease;

        // runners
        this.runnerStart = new Runner('onStart');
        this.runnerUpdate = new Runner('onUpdate');
        this.runnerRepeat = new Runner('onRepeat');
        this.runnerComplete = new Runner('onComplete');

        if (data?.onStart && !ignoreRunners)
        {
            this.runnerStart.add(data);
        }

        if (data?.onUpdate && !ignoreRunners)
        {
            this.runnerUpdate.add(data);
        }

        if (data?.onRepeat && !ignoreRunners)
        {
            this.runnerRepeat.add(data);
        }

        if (data?.onComplete && !ignoreRunners)
        {
            this.runnerComplete.add(data);
        }
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
            const startValue = this.values[0][START];

            this.values[0].push(typeof startValue === 'number' ? startValue : startValue.slice());
        }
    }

    /**
     *
     * restart
     *
     */
    restart()
    {
        if (this.cancelling)
        {
            return;
        }

        this.time = -this.delay;
        this.active = true;
        this.started = false;
        this.loop = this.repeat;

        this.seek(0);
    }

    /**
     *
     * updateValues
     *
     */
    updateValues()
    {
        const alpha = this.easing(this.progress);

        // update object properties
        for (let i = 0, j = this.values.length; i < j; i++)
        {
            const value = this.values[i];

            const key = value[KEY];
            const start = value[START];
            const end = value[END];

            if (typeof start === 'number')
            {
                this.target[key] = start + ((end - start) * alpha);
            }
            else
            {
                for (let k = 0, l = end.length; k < l; k++)
                {
                    this.target[key][k] = start[k] + ((end[k] - start[k]) * alpha);
                }
            }
        }
    }

    /**
     *
     * isCorrectDirection
     *
     * @param {boolean} isReversed
     * @returns {boolean}
     */
    isCorrectDirection(isReversed)
    {
        const start = this.values[0][START];
        const sStart = this.values[0][SSTART];

        if (typeof start === 'number')
        {
            if (((start === sStart) && !isReversed) || ((start !== sStart) && isReversed))
            {
                return true;
            }
        }
        else if ((arraysEqual(start, sStart) && !isReversed) || (!arraysEqual(start, sStart) && isReversed))
        {
            return true;
        }

        return false;
    }

    /**
     *
     * updateDirection
     *
     * @param {boolean} isReversed
     */
    updateDirection(isReversed)
    {
        // return if direction is correct
        if (this.isCorrectDirection(isReversed))
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
     * tick
     *
     * @param {number} deltaTime
     */
    tick(deltaTime)
    {
        if (!this.active || this.paused || this.cancelling)
        {
            return;
        }

        this.time += deltaTime;

        if (this.time < 0)
        {
            return;
        }

        if (!this.started)
        {
            this.started = true;

            this.runnerStart.dispatch();
        }

        this.progress = this.time / this.duration;

        // clamp progress
        if (this.progress > 1)
        {
            this.progress = 1;
        }

        this.updateValues();

        this.runnerUpdate.dispatch(this.target, this.progress, deltaTime);

        if (this.time >= this.duration)
        {
            if (this.loop > 0)
            {
                this.loop--;

                this.setEndValues();

                const currentLoop = this.repeat - this.loop;

                this.runnerRepeat.dispatch(currentLoop);

                // direction
                const isReversed = currentLoop % 2 === 1;

                if (this.yoyo)
                {
                    this.updateDirection(isReversed);
                }

                // adjust time for repeat
                this.time -= this.duration + this.repeatDelay;
            }
            else
            {
                this.active = false;
                this.cancelling = true;

                this.setEndValues();

                this.runnerComplete.dispatch();
            }
        }
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

            if (typeof value[START] === 'number')
            {
                [value[START], value[END]] = [value[END], value[START]];
            }
            else
            {
                for (let k = 0, l = value[START].length; k < l; k++)
                {
                    [value[START][k], value[END][k]] = [value[END][k], value[START][k]];
                }
            }
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

            const key = target[KEY];
            const end = target[END];

            if (typeof end === 'number')
            {
                this.target[key] = end;
            }
            else
            {
                for (let k = 0, l = end.length; k < l; k++)
                {
                    this.target[key][k] = end[k];
                }
            }
        }
    }

    /**
     *
     * seek
     *
     * @param {number} time
     */
    seek(time)
    {
        time = Math.max(0, Math.min(time, this.totalDuration)) - this.delay;

        let currentLoop = 0;

        while (time > this.duration)
        {
            time -= this.duration + this.repeatDelay;

            currentLoop++;
        }

        // direction
        const isReversed = currentLoop % 2 === 1;

        if (this.yoyo)
        {
            this.updateDirection(isReversed);
        }

        // time
        this.time = time;

        // progress
        this.progress = time / this.duration;

        const isRepeatDelay = time < 0 && currentLoop !== 0;

        if (!this.yoyo && isRepeatDelay)
        {
            this.progress = 1;
        }

        this.progress = Math.max(0, Math.min(this.progress, 1));

        // update
        this.updateValues();

        // dispatch update
        this.runnerUpdate.dispatch(this.target, this.progress, 0);
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

        this.cancelling = true;
    }

    /**
     *
     * destroy
     *
     */
    destroy()
    {
        this.active = null;
        this.cancelling = null;
        this.paused = null;
        this.protected = null;
        this.started = null;
        this.time = null;
        this._isReversed = null;

        this.delay = null;
        this.duration = null;
        this.repeat = null;
        this.repeatDelay = null;
        this.totalDuration = null;
        this.yoyo = null;
        this.ease = null;
        this.yoyoEase = null;
        this.easing = null;

        this.runnerStart.destroy();
        this.runnerStart = null;

        this.runnerUpdate.destroy();
        this.runnerUpdate = null;

        this.runnerRepeat.destroy();
        this.runnerRepeat = null;

        this.runnerComplete.destroy();
        this.runnerComplete = null;
    }
}
