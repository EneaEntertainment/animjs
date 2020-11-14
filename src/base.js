import Runner from './runner';
import { defaults } from './defaults';

/**
 *
 * Base
 *
 * @export
 * @class Base
 */
export default class Base
{
    /**
     * Creates an instance of Base.
     *
     * @param {object} data
     */
    constructor(data)
    {
        this.active = true;
        this.cancelling = false;
        this.paused = data?.paused ?? defaults.paused;
        this.protected = data?.protected ?? defaults.protected;
        this.started = false;
        this.time = 0;
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

        this.progressDuration = this.duration + this.delay;
        this.totalDuration = ((this.duration * (this.repeat + 1)) + (this.repeat * this.repeatDelay)) + this.delay;

        // runners
        this.baseStart = new Runner('onBaseStart');
        this.baseUpdate = new Runner('onBaseUpdate');
        this.baseRepeat = new Runner('onBaseRepeat');
        this.baseComplete = new Runner('onBaseComplete');
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

        const elapsedTime = this.time - this.delay;

        let progress = elapsedTime / this.duration;

        if (elapsedTime > 0)
        {
            if (!this.started)
            {
                this.started = true;

                this.baseStart.dispatch(this);
            }

            // clamp progress
            if (progress < 0)
            {
                progress = 0;
            }
            else if (progress > 1)
            {
                progress = 1;
            }

            this.baseUpdate.dispatch(this, progress, deltaTime);
        }

        if (this.time >= this.progressDuration)
        {
            if (this.repeat > 0)
            {
                this.repeat--;

                this.baseRepeat.dispatch(this);

                // adjust time for repeat
                this.time -= this.duration + this.repeatDelay;
            }
            else
            {
                this.active = false;
                this.cancelling = true;

                this.baseComplete.dispatch(this);
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
        // TODO: count in repeat/repeatDelay
        this.time = Math.max(0, Math.min(time, this.progressDuration));

        const elapsedTime = Math.max(0, this.time - this.delay);
        const progress = elapsedTime / this.duration;

        this.baseUpdate.dispatch(this, progress, 0);
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

        this.progressDuration = null;
        this.totalDuration = null;

        this.baseStart.destroy();
        this.baseStart = null;

        this.baseUpdate.destroy();
        this.baseUpdate = null;

        this.baseRepeat.destroy();
        this.baseRepeat = null;

        this.baseComplete.destroy();
        this.baseComplete = null;
    }
}
