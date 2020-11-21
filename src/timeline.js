import Base from './base';
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
 * @extends {Base}
 */
export default class Timeline extends Base
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

        super(data);

        this.onStart = data?.onStart ?? noop;
        this.onUpdate = data?.onUpdate ?? noop;
        this.onComplete = data?.onComplete ?? noop;

        this.tweens = [];
        this.groups = new Map();
        this.activeGroup = 0;

        // base runners
        this.baseStart.add(this);
        this.baseUpdate.add(this);
        this.baseComplete.add(this);
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
            this.progressDuration = this.duration + this.delay;

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
    onBaseUpdate(base, progress, deltaTime)
    {
        // update tweens
        for (let i = 0, j = this.tweens.length; i < j; i++)
        {
            const tween = this.tweens[i];

            tween.tick(deltaTime);
        }

        // update callback
        this.onUpdate(this.activeGroup, progress);
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
        this.progressDuration = this.duration;
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
     * onBaseComplete
     *
     * @param {Base} base
     */
    onBaseComplete()
    {
        this.activeGroup++;

        // complete callback; also when there are no tweens attached
        if (this.activeGroup >= this.groups.size)
        {
            this.onComplete();

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
        let index = 0;

        if (this.groups)
        {
            this.groups.forEach((value) =>
            {
                let tweens = value.tweens;

                if (index === this.activeGroup)
                {
                    return;
                }

                index++;

                for (let i = 0; i < tweens.length; i++)
                {
                    let tween = tweens[i];

                    tween.destroy();
                    tween = null;
                }

                tweens = [];
            });

            this.killAll(true);

            this.groups = null;
        }

        super.kill();
    }
}

Object.assign(Timeline.prototype, mixins);
