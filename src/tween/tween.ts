import type { ITweenData, ITweenRunners, ITweenValue } from './tween-types';
import { animGroup, defaultSettings } from '../shared';

import Group from '../group/group';
import type { IStringEasings } from '../easing/easing-types';
import { Runner } from '@enea-entertainment/runner';
import { getEasing } from '../easing/easing';
import { getTargets } from '../utils';

const enum ValueIndex { key, start, end }

export default class Tween
{
    protected values: Array<ITweenValue> = [];
    protected valuesInitial: Array<ITweenValue> = [];

    active = true;
    cancelling = false;
    _isReversed = false;
    started = false;
    destroyed = false;

    paused: boolean;
    protected: boolean;
    autoUpdate: boolean;

    protected delay: number;
    protected duration: number;
    protected groupName: string | number;
    protected repeat: number;
    protected repeatDelay: number;
    protected yoyo: boolean;
    protected ease: IStringEasings | ((time: number)=> number);
    protected yoyoEase: IStringEasings | ((time: number)=> number);
    protected easing: (...args: Array<any>)=> number;

    protected time: number;
    protected loop: number;
    protected progress = 0;
    private _totalDuration: number;

    timeScale = 1;

    protected runners: ITweenRunners =
        {
            start    : new Runner('onStart|1'),
            update   : new Runner('onUpdate|2'),
            repeat   : new Runner('onRepeat|1'),
            complete : new Runner('onComplete')
        };

    constructor(public target: unknown, protected data: Partial<ITweenData>)
    {
        this.paused = data?.paused ?? defaultSettings.paused;
        this.protected = data?.protected ?? defaultSettings.protected;
        this.autoUpdate = data?.autoUpdate ?? defaultSettings.autoUpdate;
        this.delay = data?.delay ?? defaultSettings.delay;
        this.duration = data?.duration ?? defaultSettings.duration;
        this.repeat = data?.repeat ?? defaultSettings.repeat;
        this.repeatDelay = data?.repeatDelay ?? defaultSettings.repeatDelay;
        this.yoyo = data?.yoyo ?? defaultSettings.yoyo;
        this.ease = getEasing(data?.ease ?? defaultSettings.ease);
        this.yoyoEase = getEasing(data?.yoyoEase ?? this.ease);
        this.easing = this.ease as (...args: Array<any>)=> number;

        if (typeof data?.group !== 'undefined')
        {
            const groupName = data.group;

            if (!animGroup.has(groupName))
                animGroup.set(groupName, new Group());

            animGroup.get(groupName)!.push(this);

            this.groupName = groupName;
        }

        // set repeat to some large number if repeat is set to 'infinite'
        if (this.repeat < 0)
            this.repeat = 1e10;

        this.time = -this.delay;
        this.loop = this.repeat;
        this._totalDuration = ((this.duration * (this.repeat + 1)) + (this.repeat * this.repeatDelay)) + this.delay;

        if (data?.onStart) this.runners.start.add(data);
        if (data?.onUpdate) this.runners.update.add(data);
        if (data?.onRepeat) this.runners.repeat.add(data);
        if (data?.onComplete) this.runners.complete.add(data);
    }

    private copyValues(isReversed: boolean)
    {
        this.values = [];

        for (let i = 0; i < this.valuesInitial.length; i++)
        {
            const value = this.valuesInitial[i];
            const startValue = isReversed ? value[ValueIndex.end] : value[ValueIndex.start];
            const endValue = isReversed ? value[ValueIndex.start] : value[ValueIndex.end];

            this.values.push([value[ValueIndex.key], startValue, endValue]);
        }
    }

    private setValues(valueKey: number)
    {
        for (let i = 0, j = this.values.length; i < j; i++)
        {
            const target = this.values[i];
            const key = target[ValueIndex.key];
            const value = target[valueKey];

            if (typeof value === 'number')
                (this.target as any)[key] = value;
            else
            {
                for (let k = 0, l = value.length; k < l; k++)
                    (this.target as any)[key][k] = value[k];
            }
        }
    }

    prepare()
    {
        this.valuesInitial = getTargets(this.target, this.data);

        this.copyValues(this._isReversed);
        this.setValues(ValueIndex.start);
    }

    protected restart()
    {
        if (this.destroyed)
            return;

        this.time = -this.delay;
        this.active = true;
        this.started = false;
        this.loop = this.repeat;

        this.seek(0);
    }

    private updateValues()
    {
        const alpha = this.easing(this.progress);

        for (let i = 0, j = this.values.length; i < j; i++)
        {
            const [key, start, end] = this.values[i];

            if (typeof start === 'number')
                (this.target as any)[key] = start + (((end as number) - start) * alpha);
            else
            {
                for (let k = 0, l = (end as Array<number>).length; k < l; k++)
                    (this.target as any)[key][k] = start[k] + (((end as Array<number>)[k] - start[k]) * alpha);
            }
        }
    }

    private updateDirection(currentLoop: number)
    {
        const isReversed = currentLoop % 2 === (this._isReversed ? 0 : 1);

        this.copyValues(isReversed);
        this.easing = (isReversed ? this.yoyoEase : this.ease) as (...args: Array<any>)=> number;
    }

    tick(elapsedSEC: number)
    {
        if (!this.active || this.paused || this.cancelling)
            return;

        this.time += elapsedSEC * this.timeScale;

        if (this.time < 0)
            return;

        if (!this.started)
        {
            this.started = true;
            this.runners.start.dispatch();
        }

        this.progress = this.time / this.duration;

        // clamp progress
        if (this.progress > 1)
            this.progress = 1;

        this.updateValues();
        this.runners.update.dispatch(this.target, this.progress);

        if (this.time >= this.duration)
        {
            if (this.loop > 0)
            {
                this.loop--;
                this.setValues(ValueIndex.end);

                const currentLoop = this.repeat - this.loop;

                this.runners.repeat.dispatch(currentLoop);

                if (this.yoyo)
                    this.updateDirection(currentLoop);

                // adjust time for repeat
                this.time -= this.duration + this.repeatDelay;
            }
            else
            {
                this.active = false;
                this.cancelling = true;
                this.setValues(ValueIndex.end);
                this.runners.complete.dispatch();
            }
        }
    }

    seek(time: number)
    {
        time = Math.max(0, Math.min(time, this._totalDuration)) - this.delay;

        let currentLoop = 0;

        while (time > this.duration)
        {
            time -= this.duration + this.repeatDelay;
            currentLoop++;
        }

        if (this.yoyo)
            this.updateDirection(currentLoop);

        this.time = time;
        this.loop = this.repeat - currentLoop;
        this.progress = time / this.duration;

        const isRepeatDelay = time < 0 && currentLoop !== 0;

        if (!this.yoyo && isRepeatDelay)
            this.progress = 1;

        this.progress = Math.max(0, Math.min(this.progress, 1));
        this.updateValues();
        this.runners.update.dispatch(this.target, this.progress, 0);
    }

    kill(force = false)
    {
        if (this.protected && !force)
            return;

        this.cancelling = true;
    }

    destroy()
    {
        if (this.destroyed)
            return;

        this.kill(true);

        Object.keys(this.runners).forEach((key: string) => { this.runners[key as keyof ITweenRunners].detachAll(); });

        this.destroyed = true;
        this.target = null;

        animGroup.get(this.groupName)?.remove(this);
    }

    get totalDuration(): number
    {
        return this._totalDuration;
    }
}
