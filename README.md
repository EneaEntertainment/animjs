# AnimJS

Lighweight library which lets you tween multiple object's properties

---
## Features

- tween, timeline, delay
- ```onStart(), onUpdate(), onRepeat(), onComplete()``` callbacks
- manual tick
- tweening array of numbers
- seek time
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

It is also possible to create groups in timeline by providing 3rd parameter ```{string}```<br>
Second group in timeline will start after all tweens of first group have finished.

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
    }, 'groupA');

// a2 will finish after two seconds
timeline.to(myObject,
    {
        duration : 2,
        a2       : 1,

        onComplete: () =>
        {
            console.log('a2 complete');
        }
    }, 'groupA');

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
    }, 'groupB');

// b2 will finish 2 seconds after groupA has finished
timeline.to(myObject,
    {
        duration : 2,
        b2       : 1,

        onComplete: () =>
        {
            console.log('b2 complete');
        }
    }, 'groupB');
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
## Easing

could be written in different ways, all of them are valid
```js
ease: 'sineIn'
ease: 'sineOut'
ease: 'sineInOut'
```

```js
ease: 'sine.in'
ease: 'sine.out'
ease: 'sine.inOut'
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
## Built-in easing functions

Click [here](eases.md) to see complete list

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


Sometimes you might want to use AnimJS instead of ```setTimeout();``` to delay code execution.<br>

Either using ```anim.delay();``` as ```Promise```

```js
import { anim } from '@enea-entertainment/animjs';

async myMethod()
{
    // some code

    await anim.delay(1);

    // some other code, that will be excuted 1 second later
}
```

or as a callback, where 2nd parameter is required delay

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
