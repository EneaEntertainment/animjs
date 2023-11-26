# AnimJS

Lighweight library which lets you tween multiple object's properties

##### Dependency: [Runner](https://github.com/EneaEntertainment/runner)

---
## Features

- tween, timeline, delay, wait
- ```onStart(), onUpdate(), onRepeat(), onComplete()``` callbacks
- manual tick
- tweening array of numbers
- seek time
- time scale
- animation groups
- ability to provide custom easing functions

---
## Installation

```js
npm install --save-dev @enea-entertainment/animjs
```

[![NPM](https://nodei.co/npm/@enea-entertainment/animjs.png?compact=true)](https://nodei.co/npm/@enea-entertainment/animjs/)

---
## Basic usage example

```js
import { anim } from '@enea-entertainment/animjs';

const myObject =
    {
        alpha    : 0,
        rotation : Math.PI
    };

anim.to(myObject,
    {
        duration : 1,
        alpha    : 1,
        rotation : 0,
        ease     : 'sineInOut'
    });
```

---
## Update loop

AnimJS doesn't come with built-in update loop, instead it encourages you to call ```anim.tick();``` manually.
Whenever you want to.


```js
import { anim } from '@enea-entertainment/animjs';

mainUpdateLoop(deltaTime)
{
    // request animation frame

    anim.tick(deltaTime); // in seconds

    // update scene
    // render scene
}
```

or simply via ```setInterval();```

```js
import { anim } from '@enea-entertainment/animjs';

const delta = 16.7;

setInterval(()=>
{
    anim.tick(delta / 1000); // in seconds
}, delta);
```

---
## Tween example

```js
import { anim } from '@enea-entertainment/animjs';

const myObject =
    {
        x : 0,
        y : 50
    };

// by setting 'paused: true' we tell tween not to start immediately
const firstTween = anim.from(myObject,
    {
        paused : true,
        delay  : 1,
        y      : 0,

        onStart: () =>
        {
            console.log('First tween start');
        },

        onComplete: () =>
        {
            console.log('First tween complete');
        }
    });

anim.to(myObject,
    {
        duration    : 2,
        x           : 100,
        repeat      : 1,
        repeatDelay : 0.5,
        ease        : 'cubicOut',
        yoyoEase    : 'backInOut',

        onStart: () =>
        {
            console.log('Second tween start');
        },

        onUpdate: (target, progress) =>
        {
            // target   : returns tweened object (myObject in this case)
            // progress : returns value between 0 and 1
            console.log('Second tween update:', progress);
        },

        onComplete: () =>
        {
            console.log('Second tween complete');

            // now we run firstTween
            firstTween.paused = false;
        }
    });
```

For 'infinite' tween loop, provide
```js
repeat: -1
```
Note: loop isn't really infinite, AnimJS internally uses very large number.

```anim.fromTo();``` method allows you to override object's start values

```js
import { anim } from '@enea-entertainment/animjs';

const myObject =
    {
        x : 0,
        y : 1
    };

// myObject's x and y values will both start from 2
anim.fromTo(myObject,
    {
        x : 2,
        y : 2
    },
    {
        duration : 1,
        x        : 4,
        y        : 4,
        ease     : 'none'
    });
```
---
## Timeline example

above shown tween example could be written in simpler form without pausing and resuming first tween by using ```anim.timeline();```<br>
Tweens in timeline are chained and second tween will start after first one has finished.<br>

```js
import { anim } from '@enea-entertainment/animjs';

const myObject =
    {
        x : 0,
        y : 50
    };

const timeline = anim.timeline({
    onStart: () =>
    {
        console.log('timeline start');
    },

    onComplete: () =>
    {
        console.log('timeline complete');
    }
});

timeline.to(myObject,
    {
        duration    : 2,
        x           : 100,
        repeat      : 1,
        repeatDelay : 0.5,
        ease        : 'cubicOut',
        yoyoEase    : 'backInOut',

        onStart: () =>
        {
            console.log('First tween start');
        },

        onComplete: () =>
        {
            console.log('First tween complete');
        }
    });

timeline.to(myObject,
    {
        delay : 1,
        y     : 10,

        onStart: () =>
        {
            console.log('Second tween start');
        },

        onComplete: () =>
        {
            console.log('Second tween complete');
        }
    });    
```

It is also possible to start tweens in timeline at the same time by providing 3rd parameter - label```{string}```

All tweens groupped by ```labelB``` will start after all tweens in label ```labelA``` have finished.

```js
import { anim } from '@enea-entertainment/animjs';

const myObject =
    {
        a1 : 0,
        a2 : 0,

        b1 : 0,
        b2 : 0
    };

const timeline = anim.timeline({
    onStart: () =>
    {
        console.log('timeline start');
    },

    onComplete: () =>
    {
        console.log('timeline complete');
    }
});

// a1 will finish after one second
timeline.to(myObject,
    {
        duration : 1,
        a1       : 1,

        onComplete: () =>
        {
            console.log('a1 complete');
        }
    }, 'labelA');

// a2 will finish after two seconds
timeline.to(myObject,
    {
        duration : 2,
        a2       : 1,

        onComplete: () =>
        {
            console.log('a2 complete');
        }
    }, 'labelA');

// then b1 will start
// b1 will finish after 4 seconds, notice repeat param
timeline.to(myObject,
    {
        duration : 1,
        b1       : 1,
        repeat   : 3,

        onComplete: () =>
        {
            console.log('b1 complete');
        }
    }, 'labelB');

// b2 will finish 2 seconds after labelA has finished
timeline.to(myObject,
    {
        duration : 2,
        b2       : 1,

        onComplete: () =>
        {
            console.log('b2 complete');
        }
    }, 'labelB');
```

---
## Tweening array of numbers

Just like numbers, you can also tween arrays

```js
import { anim } from '@enea-entertainment/animjs';

const myObject =
    {
        a : [3, 2, 1],
        b : new Float32Array(3),
        c : [0, 8, 9],
        d : 0
    };

anim.to(myObject,
    {
        a : [1, 2, 3],
        b : [4, 5, 6],
        c : [7], // only first value will be tweened
        d : 10,

        onComplete: () =>
        {
            console.log(myObject.a);
            console.log(myObject.b);
            console.log(myObject.c);
            console.log(myObject.d);

            // outputs {object}

            // myObject.a [1, 2, 3]
            // myObject.b [4, 5, 6]
            // myObject.c [7, 8, 9]
            // myObject.d 10
        }
    });
```

---
## Tween seek

Jumps to a specific time

```js
import { anim } from '@enea-entertainment/animjs';

const myTween = anim.to({ value: 0 },
    {
        paused   : true,
        duration : 4,
        value    : 10,

        onUpdate: (target) =>
        {
            console.log(target.value);
        }
    });

// outputs: 5
myTween.seek(2);
```
---
## Time scale

time scale can be used to speed up or slow down tweens. You can either set it globally or per tween
    
```js
import { anim } from '@enea-entertainment/animjs';

// global time scale
// all tweens will be affected, playing at double speed
anim.timeScale = 2;
```
or individually
```js
import { anim } from '@enea-entertainment/animjs';

const tween = anim.to({ value: 0 },
    {
        duration : 1,
        value    : 1,
    });

// tween will play at double speed
// and will finish in 0.5 seconds
tween.timeScale = 2;
```

---
## Built-in easing functions

'none' == 'linear' | 'back' | 'bounce' | 'circ' | 'cubic' | 'elastic' | 'expo' | 'quad' | 'quart' | 'quint' | 'sine'

---

## Easing

could be written in different ways, all of them are valid

```js
ease: 'sineIn'
ease: 'sineOut'
ease: 'sineInOut'
```

```js
import { Easing } from '@enea-entertainment/animjs';

ease: Easing.sineIn
ease: Easing.sineOut
ease: Easing.sineInOut
```

```js
import { Easing } from '@enea-entertainment/animjs';

ease: Easing.sine.in
ease: Easing.sine.out
ease: Easing.sine.inOut
```

---

## Custom easing function

```js
import { anim } from '@enea-entertainment/animjs';

function stepped(time, steps)
{
    return Math.max(0, Math.min(1, (((steps * time) | 0) + 1) * (1 / steps)));
}

const myObject =
    {
        x : 0
    };

anim.to(myObject,
    {
        x    : 10,
        ease : (time) => { return stepped(time, 5); },

        onUpdate: () =>
        {
            // outputs: 2, 4, 6, 8, 10
            console.log(myObject.x);
        }
    });
```

---
## Delaying code execution


Because AnimJS ```tick();``` is updated manually, sometimes you might want to use AnimJS instead of ```setTimeout();``` to delay code execution.<br>

Either using ```anim.delay();``` where 1st parameter is callback and 2nd parameter is required delay (in seconds)

```js
import { anim } from '@enea-entertainment/animjs';

myMethod()
{
    anim.delay(()=>
    {
        // some code
    }, 1);
}
```

or by using ```anim.wait();``` which returns promise

```js
import { anim } from '@enea-entertainment/animjs';

anim.wait(1).then(()=>
{
    // some code
});
```

or

```js
import { anim } from '@enea-entertainment/animjs';

async myMethod()
{
    await anim.wait(1);

    // some code
}
```
---
### Animation groups

Tweens, timelines and delays can be grouped together and then paused, resumed or killed at once

```js
import { anim } from '@enea-entertainment/animjs';

const enum TweenGroup
    {
        INTRO,
        GAME
    }

const introTween1 = anim.to({value : 0},
    {
        duration : 1,
        group    : TweenGroup.INTRO
        value    : 1,
    });
 
const introTween2 = anim.to({value : 2},
    {
        duration : 1,
        group    : TweenGroup.INTRO
        value    : 3,
    });   

// kills all tweens in TweenGroup.INTRO
anim.group.get(TweenGroup.INTRO)?.kill();
```

---
## Stopping tween, timeline, delay


```js
import { anim } from '@enea-entertainment/animjs';

const myObject =
    {
        x : 0,
        y : 0,

        scale:
            {
                x : 1,
                y : 1
            }
    };

const tween1 = anim.to(myObject,
    {
        x : 1,
        y : 1
    });

// kills tween1
tween1.kill();

const tween2 = anim.to(myObject.scale,
    {
        x : 2,
        y : 2
    });

// kills all running tweens of myObject.scale
anim.killTweensOf(myObject.scale);

// or
// tween2.kill();
```

similarly you can kill entire timeline (which will also kill all its tweens) 
```js
timeline.kill();
```

Killing all tweens, timelines, delays at once:
```js
anim.killAll();
```

Tween or timeline can be marked as ```protected```<br>
Such tweens/timlines will not be killed by ```anim.killAll();``` or ```tween.kill();```

```js
import { anim } from '@enea-entertainment/animjs';

const tween = anim.to(myObject,
    {
        protected : true,

        onComplete: ()=>
        {
            console.log('tween complete');
        }
    });

// tween will not be stopped    
anim.killAll();
tween.kill();
```

To protect ```anim.delay();``` set its ```protected``` property after initialization
```js
import { anim } from '@enea-entertainment/animjs';

const myDelay = anim.delay(()=>
    {
        console.log('delay complete');
    }, 1);

myDelay.protected = true;


// delay will not be stopped    
anim.killAll();
myDelay.kill();
```

However, if you later decide to stop also ```protected``` tweens, timelines or delays, pass ```true``` to ```kill();``` method
```js
    anim.killAll(true);

    // or

    tween.kill(true);
    timeline.kill(true);
    myDelay.kill(true);
```


---
## AnimJS default settings

feel free to override any of these

```js
import { anim } from '@enea-entertainment/animjs';

console.log(anim.defaults);

// outputs {object}:

// delay: 0
// duration: 1
// ease: "none"
// paused: false
// protected: false
// repeat: 0
// repeatDelay: 0
// yoyo: false
```
---
## Webpack ProvidePlugin

Provides ```anim``` so you don't have to import it everywhere

```js
const webpack = require('webpack');

plugins:
[
    new webpack.ProvidePlugin({
        anim : ['@enea-entertainment/animjs', 'anim']
    })
]
```

---
## TODO

- repeat whole timeline
- timeline.seek()
- timeline.restart()

---
## Thank you

- AnimJS is based on [tweenr](https://github.com/mattdesl/tweenr) by Matt DesLauriers (@mattdesl)
- Robert Penner for easing functions see [terms of use](http://www.robertpenner.com/easing_terms_of_use.html)
- Hugh Kennedy (@hughsk) for [an-array](https://www.npmjs.com/package/an-array) check

---
## License

MIT, see [LICENSE](LICENSE) for details.
