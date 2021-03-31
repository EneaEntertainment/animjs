import Tween from './tween';
import { mixins } from './mixins';
import { randomString } from './utils';

// eslint-disable-next-line no-empty-function
const noop = () => {};

/**
 *
 * Timeline
 *
 * @export
 * @class Timeline
 * @extends {Tween}
 */
export default class Timeline extends Tween
{
    /**
     * Creates an instance of Timeline.
     *
     * @param {object} [data={}]
     */
    constructor(data = {})
    {
        // bypass defaults
        data.duration = 0;

        super({}, data, true);

        this.onTimelineStart = data?.onStart ?? noop;
        this.onTimelineUpdate = data?.onUpdate ?? noop;
        this.onTimelineRepeat = data?.onRepeat ?? noop;
        this.onTimelineComplete = data?.onComplete ?? noop;

        this.runnerStart.add(this);
        this.runnerUpdate.add(this);
        this.runnerRepeat.add(this);
        this.runnerComplete.add(this);

        this.tweens = [];
        this.groups = new Map();
        this.activeGroup = 0;
    }

    /**
     *
     * to
     *
     * @param {object} target
     * @param {object} data
     * @param {string} key
     * @returns {Tween}
     */
    to(target, data, key = randomString())
    {
        const tween = new Tween(target, data);

        this.addTween(tween, key);

        return tween;
    }

    /**
     *
     * from
     *
     * @param {object} target
     * @param {object} data
     * @param {string} key
     * @returns {Tween}
     */
    from(target, data, key = randomString())
    {
        const tween = new Tween(target, data);

        tween._isReversed = true;

        this.addTween(tween, key);

        return tween;
    }

    /**
     *
     * fromTo
     *
     * @param {object} target
     * @param {object} [fromData={}]
     * @param {object} toData
     * @returns {Tweens}
     */
    fromTo(target, fromData = {}, toData)
    {
        for (const i in fromData)
        {
            target[i] = fromData[i];
        }

        const tween = new Tween(target, toData);

        tween.prepare();

        this.tweens.push(tween);

        return tween;
    }

    /**
     *
     * seek
     *
     */
    seek()
    {
        // TODO
    }

    /**
     *
     * restart
     *
     */
    restart()
    {
        // TODO
    }

    /**
     *
     * createGroup
     *
     * @param {string} key
     */
    createGroup(key)
    {
        const data =
            {
                duration : 0,
                tweens   : []
            };

        this.groups.set(key, data);
    }

    /**
     *
     * addTween
     *
     * @param {Tween} tween
     * @param {string} key
     */
    addTween(tween, key)
    {
        // create key if it doesn't exist
        if (!this.groups.has(key))
        {
            this.createGroup(key);
        }

        // group
        const group = this.groups.get(key);

        group.duration = Math.max(group.duration, tween.totalDuration);
        group.tweens.push(tween);

        const keyIndex = this.getKeyIndex(key);
        const isActiveGroup = keyIndex === this.activeGroup;

        if (isActiveGroup)
        {
            this.duration = Math.max(this.duration, group.duration);

            tween.prepare();

            this.tweens.push(tween);
        }
        else
        {
            tween.active = false;
        }

        // update total duration
        this.totalDuration = 0;

        this.groups.forEach((value) => { this.totalDuration += value.duration; });
    }

    /**
     *
     * getKeyIndex
     *
     * @param {string} key
     * @returns {number}
     */
    getKeyIndex(key)
    {
        let result = 0;

        for (const group of this.groups.keys())
        {
            if (group === key)
            {
                break;
            }

            result++;
        }

        return result;
    }

    /**
     *
     * onStart
     *
     */
    onStart()
    {
        this.onTimelineStart();
    }

    /**
     *
     * onUpdate
     *
     * @param {object} target
     * @param {number} progress
     * @param {number} deltaTime
     */
    onUpdate(target, progress, deltaTime)
    {
        // update children
        for (let i = 0, j = this.tweens.length; i < j; i++)
        {
            const tween = this.tweens[i];

            if (tween.autoUpdate)
            {
                tween.tick(deltaTime);
            }
        }

        // update callback
        this.onTimelineUpdate(this.activeGroup, progress);
    }

    /**
     *
     * onRepeat
     *
     */
    onRepeat()
    {
        // TODO
    }

    /**
     *
     * setActiveGroup
     *
     */
    setActiveGroup()
    {
        const groups = Array.from(this.groups);
        const group = groups[this.activeGroup][1];

        this.active = true;
        this.cancelling = false;
        this.time = 0;
        this.duration = group.duration;
        this.delay = 0;
        this.tweens = group.tweens;

        for (let i = 0; i < this.tweens.length; i++)
        {
            const tween = this.tweens[i];

            tween.prepare();
            tween.active = true;
        }
    }

    /**
     *
     * onComplete
     *
     */
    onComplete()
    {
        this.activeGroup++;

        // complete callback; also when there are no tweens attached
        if (this.activeGroup >= this.groups.size)
        {
            this.onTimelineComplete();

            return;
        }

        // prepare next group
        this.setActiveGroup();
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

        // kill tweens in all groups
        if (this.groups)
        {
            this.groups.forEach((value) =>
            {
                let tweens = value.tweens;

                for (let i = 0; i < tweens.length; i++)
                {
                    let tween = tweens[i];

                    tween.destroy();
                    tween = null;
                }

                tweens = [];
            });

            this.groups = null;
        }

        this.tweens = [];

        super.kill();
    }

    /**
     *
     * destroy
     *
     */
    destroy()
    {
        this.kill(true);

        super.destroy();
    }
}

Object.assign(Timeline.prototype, mixins);
