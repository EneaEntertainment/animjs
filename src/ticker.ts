import Delay from './delay';
import type Group from './group';
import type { IDelayData } from './delay';
import type { ITimelineData } from './timeline';
import type { ITweenData } from './tween';
import Timeline from './timeline';
import Tween from './tween';
import { defaultSettings } from './shared';

export default class Ticker
{
    defaults: Partial<ITweenData>;
    group: Record<string, Group> = {};
    readonly tweens: Array<Delay | Timeline | Tween> = [];

    timeScale = 1;

    to(target: unknown, data: Partial<ITweenData>): Tween
    {
        const tween = new Tween(target, data);

        tween.prepare();
        this.tweens.push(tween);

        return tween;
    }

    from(target: unknown, data: Partial<ITweenData>): Tween
    {
        const tween = new Tween(target, data);

        tween._isReversed = true;
        tween.prepare();
        this.tweens.push(tween);

        return tween;
    }

    fromTo(target: unknown, fromData: Partial<ITweenData>, toData: Partial<ITweenData>): Tween
    {
        for (const i in fromData)
            (target as any)[i] = fromData[i];

        const tween = new Tween(target, toData);

        tween.prepare();
        this.tweens.push(tween);

        return tween;
    }

    timeline(data?: Partial<ITimelineData>): Timeline
    {
        const timeline = new Timeline(data);

        this.tweens.push(timeline);

        return timeline;
    }

    delay(callback: (...args: Array<any>)=> void, duration?: any, groupName?: string | number): Delay
    {
        const data: Partial<IDelayData> =
                {
                    duration   : duration ?? defaultSettings.duration,
                    group      : groupName,
                    onComplete : callback
                };

        const delay = new Delay(data);

        this.tweens.push(delay);

        return delay;
    }

    wait(duration: number, groupName?: string | number): Promise<Delay>
    {
        return new Promise((resolve) =>
        {
            const data: Partial<IDelayData> =
                {
                    duration : duration || defaultSettings.duration,
                    group    : groupName,

                    onComplete: () =>
                    {
                        resolve(delay);
                    }
                };

            const delay = new Delay(data);

            this.tweens.push(delay);
        });
    }

    tick(elapsedSEC: number)
    {
        for (let i = 0, j = this.tweens.length; i < j; i++)
        {
            const tween = this.tweens[i];

            if (tween.autoUpdate)
                tween.tick(elapsedSEC * this.timeScale);
        }

        // destroy inactive tweens
        for (let i = this.tweens.length - 1; i >= 0; i--)
        {
            const tween = this.tweens[i];

            if (tween.cancelling)
            {
                tween.destroy();

                this.tweens.splice(i, 1);
            }
        }
    }

    killTweensOf(target: unknown, force = false)
    {
        for (let i = 0; i < this.tweens.length; i++)
        {
            const tween = this.tweens[i];

            if (tween instanceof Tween && tween.target === target)
                tween.kill(force);
        }
    }

    killAll(force = false)
    {
        for (let i = this.tweens.length - 1; i >= 0; i--)
            this.tweens[i].kill(force);
    }
}
