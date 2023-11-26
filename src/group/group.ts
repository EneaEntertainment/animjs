import Delay from '../delay/delay';
import Timeline from '../timeline/timeline';
import Tween from '../tween/tween';

export default class Group
{
    private list: Array<Delay | Timeline | Tween> = [];

    push(t: Delay | Timeline | Tween)
    {
        if (!(t instanceof Delay) && !(t instanceof Timeline) && !(t instanceof Tween))
            return;

        this.list.push(t);
    }

    concat(tArr: Array<Delay | Timeline | Tween>)
    {
        for (let i = 0; i < tArr.length; i++)
            this.push(tArr[i]);
    }

    remove(t: Delay | Timeline | Tween)
    {
        const idx = this.list.indexOf(t);

        if (idx !== 1)
            this.list.splice(idx, 1);
    }

    pause()
    {
        for (let i = 0; i < this.list.length; i++)
        {
            const tween = this.list[i];

            if (tween?.active && !tween?.destroyed)
                tween.paused = true;
        }
    }

    resume()
    {
        for (let i = 0; i < this.list.length; i++)
        {
            const tween = this.list[i];

            if (tween?.active && !tween?.destroyed && tween?.paused)
                tween.paused = false;
        }
    }

    kill()
    {
        for (let i = 0; i < this.list.length; i++)
            this.list[i].kill();

        this.list.length = 0;
    }
}
