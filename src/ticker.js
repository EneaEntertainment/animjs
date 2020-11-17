import Base from './base';
import Timeline from './timeline';
import Tween from './tween';
import { defaults } from './defaults';
import { mixins } from './mixins';

/**
 *
 * Ticker
 *
 * @export
 * @class Ticker
 */
export default class Ticker
{
    /**
     * Creates an instance of Ticker.
     */
    constructor()
    {
        this.tweens = [];
    }

    /**
     *
     * to
     *
     * @param {object} target
     * @param {object} data
     * @returns {Tween}
     */
    to(target, data)
    {
        const tween = new Tween(target, data);

        tween.prepare();

        this.tweens.push(tween);

        return tween;
    }

    /**
     *
     * from
     *
     * @param {object} target
     * @param {object} data
     * @returns {Tween}
     */
    from(target, data)
    {
        const tween = new Tween(target, data);

        tween._isReversed = true;
        tween.prepare();

        this.tweens.push(tween);

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
     * timeline
     *
     * @param {object} target
     * @param {object} data
     * @returns {Tween}
     */
    timeline(target, data)
    {
        const timeline = new Timeline(target, data);

        this.tweens.push(timeline);

        return timeline;
    }

    /**
     *
     * delay
     *
     * @param {function} callback
     * @param {number} duration
     * @returns {Base|Promise}
     */
    delay(callback, duration = callback)
    {
        const data =
            {
                duration : duration || defaults.duration,
                delay    : 0
            };

        const base = new Base(data);

        this.tweens.push(base);

        if (typeof callback === 'function')
        {
            base.onBaseComplete = callback;
            base.baseComplete.add(base);

            return base;
        }

        return new Promise((resolve) =>
        {
            base.onBaseComplete = resolve;
            base.baseComplete.add(base);
        });
    }

    /**
     *
     * tick
     *
     * @param {number} deltaTime
     */
    tick(deltaTime)
    {
        for (let i = 0; i < this.tweens.length; i++)
        {
            const tween = this.tweens[i];

            tween.tick(deltaTime);
        }

        // destroy inactive tweens
        for (let i = this.tweens.length - 1; i >= 0; i--)
        {
            let tween = this.tweens[i];

            if (tween.cancelling)
            {
                this.tweens.splice(i, 1);

                tween.destroy();
                tween = null;
            }
        }
    }
}

Object.assign(Ticker.prototype, mixins);
