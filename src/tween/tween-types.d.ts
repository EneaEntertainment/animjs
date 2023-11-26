import type { Runner } from '@enea-entertainment/runner';
import type { IStringEasings } from '../easing/easing-types';

export interface IDefaultTweenData
{
    paused: boolean;
    protected: boolean;
    autoUpdate: boolean;

    delay: number;
    duration: number;
    group?: string | number;
    yoyo: boolean;
    repeat: number;
    repeatDelay: number;
    ease: IStringEasings | ((time: number)=> number);
    yoyoEase?: IStringEasings | ((time: number)=> number);
}

export interface ITweenData extends IDefaultTweenData
{
    onStart: ()=> void;
    onUpdate: (target: unknown, progress: number)=> void;
    onRepeat: (currentLoop: number)=> void;
    onComplete: (...args: Array<any>)=> void;

    [key: string]: any;
}

export type ITweenValue = [string, number | Array<number>, number | Array<number>];

export interface ITweenRunners
    {
        start: Runner;
        update: Runner;
        repeat: Runner;
        complete: Runner;
    }
