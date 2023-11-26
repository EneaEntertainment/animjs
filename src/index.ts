import { Easing, cubicBezier, stepped } from './easing';
import { animGroup, defaultSettings } from './shared';

import Delay from './delay';
import Ticker from './ticker';
import Timeline from './timeline';
import Tween from './tween';

const ticker = new Ticker();

ticker.defaults = defaultSettings;
ticker.group = animGroup;

export { ticker as anim };
export { Easing, stepped, cubicBezier };
export { Tween };
export { Timeline };
export { Delay };
export { animGroup };
