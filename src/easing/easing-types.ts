import type { Easing } from './easing';

type EasingKeys = keyof typeof Easing;

export type IStringEasings =
    EasingKeys &
        Exclude<EasingKeys, 'Function' | 'prototype'> &
        Exclude<EasingKeys, 'back' | 'bounce' | 'circ' | 'cubic' | 'elastic' | 'expo' | 'quad' | 'quart' | 'quint' | 'sine'>;
