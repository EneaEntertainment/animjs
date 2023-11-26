import type Group from './group/group';
import type { IDefaultTweenData } from './tween/tween-types';

export const animGroup: Record<string, Group> = {};

export const defaultSettings: IDefaultTweenData =
    {
        paused     : false,
        protected  : false,
        autoUpdate : true,

        delay       : 0,
        duration    : 1,
        yoyo        : false,
        repeat      : 0,
        repeatDelay : 0,

        ease: 'none'
    };
