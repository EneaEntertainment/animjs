import { animGroup, defaultSettings } from '../shared';

import Group from '../group/group';
import type { IDelayData } from './delay-types';
import { Runner } from '@enea-entertainment/runner';

export default class Delay
{
    active = true;
    cancelling = false;
    destroyed = false;

    paused = false;
    groupName: string | number;
    protected: boolean;
    autoUpdate: boolean;
    duration: number;
    time: number;

    timeScale = 1;

    protected complete: Runner;

    constructor(protected data: Partial<IDelayData> = {})
    {
        this.protected = data?.protected ?? defaultSettings.protected;
        this.autoUpdate = data?.autoUpdate ?? defaultSettings.autoUpdate;
        this.duration = data?.duration ?? defaultSettings.duration;
        this.time = 0;

        if (typeof data?.group !== 'undefined')
        {
            const groupName = data.group;

            if (!animGroup.has(groupName))
                animGroup.set(groupName, new Group());

            animGroup.get(groupName)!.push(this);

            this.groupName = groupName;
        }

        if (data?.onComplete)
        {
            this.complete = new Runner('onComplete');

            this.complete.add(data);
        }
    }

    tick(elapsedSEC: number)
    {
        if (!this.active || this.paused || this.cancelling)
            return;

        this.time += elapsedSEC * this.timeScale;

        if (this.time >= this.duration)
        {
            this.active = false;
            this.cancelling = true;

            this.complete.dispatch();
        }
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

        this.complete?.detachAll();

        this.destroyed = true;

        animGroup.get(this.groupName)?.remove(this);
    }
}
