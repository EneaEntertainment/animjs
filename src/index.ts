import { Easing, cubicBezier, stepped } from './easing/easing';
import { animGroup, defaultSettings } from './shared';

import Delay from './delay/delay';
import Ticker from './ticker/ticker';
import Timeline from './timeline/timeline';
import Tween from './tween/tween';

const ticker = new Ticker();

ticker.defaults = defaultSettings;
ticker.group = animGroup;

export { ticker as anim };
export { Easing, stepped, cubicBezier };
export { Tween };
export { Timeline };
export { Delay };
export { animGroup };
