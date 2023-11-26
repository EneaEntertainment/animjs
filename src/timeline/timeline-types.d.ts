import type { Runner } from '@enea-entertainment/runner';
import type Tween from '../tween/tween';

export interface ITimelineData
{
    paused: boolean;
    protected: boolean;
    autoUpdate: boolean;
    delay: number;
    group: string | number;

    onStart: ()=> void;
    onUpdate: (activeLabelIndex: number, progress: number)=> void;
    onComplete: (...args: Array<any>)=> void;
}

export interface ITimelineLabelData
{
    duration: number;
    tweens: Array<Tween>
}

export interface ITimelineRunners
    {
        start: Runner;
        update: Runner;
        complete: Runner;
    }
