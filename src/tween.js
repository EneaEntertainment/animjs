import Runner from './runner';
import { defaults } from './defaults';
import { getEasing } from './easing';
import { getTargets } from './utils';

const KEY = 0;
const START = 1;
const END = 2;

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
        this.valuesStored = [];
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
     * copyValues
     *
     * @param {boolean} isReversed
     */
    copyValues(isReversed)
    {
        this.values = [];

        for (let i = 0; i < this.valuesStored.length; i++)
        {
            const valueStored = this.valuesStored[i];

            const startValue = isReversed ? valueStored[END] : valueStored[START];
            const endValue = isReversed ? valueStored[START] : valueStored[END];

            this.values.push([valueStored[KEY], startValue, endValue]);
        }
    }

    /**
      *
      * setValues
      *
      * @param {number} valueKey
      */
    setValues(valueKey)
    {
        for (let i = 0, j = this.values.length; i < j; i++)
        {
            const target = this.values[i];

            const key = target[KEY];
            const value = target[valueKey];

            if (typeof value === 'number')
            {
                this.target[key] = value;
            }
            else
            {
                for (let k = 0, l = value.length; k < l; k++)
                {
                    this.target[key][k] = value[k];
                }
            }
        }
    }

    /**
     *
     * prepare
     *
     */
    prepare()
    {
        this.valuesStored = getTargets(this.target, this.data);

        this.copyValues(this._isReversed);

        this.setValues(START);
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
     * updateDirection
     *
     * @param {boolean} isReversed
     */
    updateDirection(isReversed)
    {
        this.copyValues(isReversed);

        this.easing = isReversed ? this.yoyoEase : this.ease;
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

                this.setValues(END);

                const currentLoop = this.repeat - this.loop;

                this.runnerRepeat.dispatch(currentLoop);

                // direction
                if (this.yoyo)
                {
                    const isReversed = currentLoop % 2 === (this._isReversed ? 0 : 1);

                    this.updateDirection(isReversed);
                }

                // adjust time for repeat
                this.time -= this.duration + this.repeatDelay;
            }
            else
            {
                this.active = false;
                this.cancelling = true;

                this.setValues(END);

                this.runnerComplete.dispatch();
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
        if (this.yoyo)
        {
            const isReversed = currentLoop % 2 === (this._isReversed ? 0 : 1);

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
