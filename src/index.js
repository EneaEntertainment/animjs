import Easing from './easing';
import Ticker from './ticker';
import { defaults } from './defaults';

const ticker = new Ticker();

ticker.defaults = defaults;

export { ticker as anim };
export { Easing };
