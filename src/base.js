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

        this.loop = this.repeat;

        this.progressDuration = this.duration + this.delay;
        this.totalDuration = ((this.duration * (this.repeat + 1)) + (this.repeat * this.repeatDelay)) + this.delay;

        // runners
        this.baseStart = new Runner('onBaseStart');
        this.baseUpdate = new Runner('onBaseUpdate');
        this.baseRepeat = new Runner('onBaseRepeat');
        this.baseDirection = new Runner('onBaseDirection');
        this.baseComplete = new Runner('onBaseComplete');
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

        this.time = 0;
        this.active = true;
        this.started = false;
        this.loop = this.repeat;

        this.seek(0);
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
            progress = Math.max(0, Math.min(progress, 1));

            // dispatch update
            this.baseUpdate.dispatch(this, progress, deltaTime);
        }

        if (this.time >= this.progressDuration)
        {
            if (this.loop > 0)
            {
                this.loop--;

                // dispatch repeat
                this.baseRepeat.dispatch(this, this.repeat - this.loop);

                const isReversed = this.loop % 2 === 1;

                // dispatch direction
                this.baseDirection.dispatch(this, isReversed);

                // adjust time for repeat
                this.time -= this.duration + this.repeatDelay;
            }
            else
            {
                this.active = false;
                this.cancelling = true;

                // dispatch complete
                this.baseComplete.dispatch(this);
            }
        }
    }

    /**
     *
     * seek
     *
     * @param {number} elapsedTime
     */
    seek(elapsedTime)
    {
        elapsedTime = Math.max(0, Math.min(elapsedTime, this.totalDuration)) - this.delay;

        let numLoops = 0;

        while (elapsedTime > this.duration)
        {
            elapsedTime -= this.duration + this.repeatDelay;

            numLoops++;
        }

        const isReversed = numLoops % 2 === 1;

        // dispatch direction
        this.baseDirection.dispatch(this, isReversed);

        // set time
        this.time = elapsedTime + this.delay;

        let progress = elapsedTime / this.duration;

        // clamp progress
        progress = Math.max(0, Math.min(progress, 1));

        // dispatch update
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

        this.baseDirection.destroy();
        this.baseDirection = null;

        this.baseComplete.destroy();
        this.baseComplete = null;
    }
}
