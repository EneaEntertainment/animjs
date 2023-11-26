import type Group from './group/group';
import type { IDefaultTweenData } from './tween/tween-types';

export type IGroupLabel = string | number;

export const animGroup = new Map<IGroupLabel, Group>();

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
