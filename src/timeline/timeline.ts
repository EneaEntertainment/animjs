import type { ITimelineData, ITimelineLabelData, ITimelineRunners } from './timeline-types';
import { animGroup, defaultSettings } from '../shared';

import Group from '../group/group';
import type { ITweenData } from '../tween/tween-types';
import { Runner } from '@enea-entertainment/runner';
import Tween from '../tween/tween';
import { randomString } from '../utils';

export default class Timeline
{
    active = true;
    cancelling = false;
    started = false;
    destroyed = false;

    paused: boolean;
    protected: boolean;
    autoUpdate: boolean;

    protected delay: number;
    private duration: number;
    protected groupName: string | number;

    protected time = 0;
    protected progress = 0;
    protected _totalDuration: number;

    tweens: Array<Tween> = [];
    private labels: Map<string, ITimelineLabelData> = new Map();
    private activeLabel = 0;

    timeScale = 1;

    protected runners: ITimelineRunners =
        {
            start    : new Runner('onStart'),
            update   : new Runner('onUpdate|2'),
            complete : new Runner('onComplete')
        };

    constructor(protected data: Partial<ITimelineData> = {})
    {
        this.paused = data?.paused ?? defaultSettings.paused;
        this.protected = data?.protected ?? defaultSettings.protected;
        this.autoUpdate = data?.autoUpdate ?? defaultSettings.autoUpdate;
        this.delay = data?.delay ?? defaultSettings.delay;
        this.duration = 0;
        this.time = -this.delay;

        this.labels = new Map();
        this.activeLabel = 0;

        if (typeof data?.group !== 'undefined')
        {
            const groupName = data.group;

            if (!animGroup.has(groupName))
                animGroup.set(groupName, new Group());

            animGroup.get(groupName)!.push(this);

            this.groupName = groupName;
        }

        if (data?.onStart) this.runners.start.add(data);
        if (data?.onUpdate) this.runners.update.add(data);
        if (data?.onComplete) this.runners.complete.add(data);
    }

    to(target: unknown, data: Partial<ITweenData>, label?: string): Tween
    {
        const tween = new Tween(target, data);

        this.addTween(tween, label ?? randomString());

        return tween;
    }

    from(target: unknown, data: Partial<ITweenData>, label?: string): Tween
    {
        const tween = new Tween(target, data);

        tween._isReversed = true;

        this.addTween(tween, label ?? randomString());

        return tween;
    }

    fromTo(target: unknown, fromData: Partial<ITweenData> = {}, toData: Partial<ITweenData>, label?: string): Tween
    {
        for (const i in fromData)
            (target as any)[i] = fromData[i];

        const tween = new Tween(target, toData);

        this.addTween(tween, label ?? randomString());

        return tween;
    }

    private createLabel(key: string)
    {
        const data: ITimelineLabelData =
            {
                duration : 0,
                tweens   : []
            };

        this.labels.set(key, data);
    }

    private getLabelIndex(labelName: string): number
    {
        const keys = Array.from(this.labels.keys());

        return keys.indexOf(labelName);
    }

    private addTween(tween: Tween, labelName: string)
    {
        // force
        tween.paused = false;

        // create key if it doesn't exist
        if (!this.labels.has(labelName))
            this.createLabel(labelName);

        const label = this.labels.get(labelName)!;

        label.duration = Math.max(label.duration, tween.totalDuration);
        label.tweens.push(tween);

        const labelIndex = this.getLabelIndex(labelName);
        const isActiveLabel = labelIndex === this.activeLabel;

        if (isActiveLabel)
        {
            this.duration = Math.max(this.duration, label.duration);

            tween.prepare();

            this.tweens.push(tween);
        }
        else
            tween.active = false;

        // update total duration
        this._totalDuration = 0;

        this.labels.forEach((value) => { this._totalDuration += value.duration; });
    }

    tick(elapsedSEC: number)
    {
        if (!this.active || this.paused || this.cancelling)
            return;

        const scaledTime = elapsedSEC * this.timeScale;

        this.time += scaledTime;

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

        // update children
        for (let i = 0, j = this.tweens.length; i < j; i++)
            this.tweens[i].tick(scaledTime);

        this.runners.update.dispatch(this.activeLabel, this.progress);

        if (this.time >= this.duration)
        {
            this.active = false;

            this.onLabelFinished();
        }
    }

    private setActiveLabel()
    {
        const labels = Array.from(this.labels);
        const label = labels[this.activeLabel][1];

        this.active = true;
        this.time = 0;
        this.duration = label.duration;
        this.delay = 0;
        this.tweens = label.tweens;

        for (let i = 0; i < this.tweens.length; i++)
        {
            const tween = this.tweens[i];

            tween.prepare();
            tween.active = true;
        }
    }

    private onLabelFinished()
    {
        this.activeLabel++;

        // complete callback; also when there are no tweens attached
        if (this.activeLabel >= this.labels.size)
        {
            this.cancelling = true;
            this.runners.complete.dispatch();

            return;
        }

        // run next label
        this.setActiveLabel();
    }

    kill(force = false)
    {
        if (this.protected && !force)
            return;

        // kill tweens in all labels
        if (this.labels)
        {
            this.labels.forEach((value) =>
            {
                let tweens = value.tweens;

                for (let i = 0; i < tweens.length; i++)
                    tweens[i].destroy();

                tweens = [];
            });
        }

        this.tweens = [];
        this.cancelling = true;
    }

    destroy()
    {
        if (this.destroyed)
            return;

        this.destroyed = true;

        this.kill(true);

        Object.keys(this.runners).forEach((key: string) => { this.runners[key as keyof ITimelineRunners].detachAll(); });

        animGroup.get(this.groupName)?.remove(this);
    }

    get totalDuration(): number
    {
        return this._totalDuration;
    }
}
