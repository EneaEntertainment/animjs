/**
 *
 * Runner
 *
 * @export
 * @class Runner
 */
export default class Runner
{
    /**
     * Creates an instance of Runner.
     *
     * @param {string} name
     */
    constructor(name)
    {
        this.name = name;
        this.items = [];
    }

    /**
     *
     * dispatch
     *
     * @param {any} argument0
     * @param {any} argument1
     * @param {any} argument2
     */
    dispatch(argument0, argument1, argument2)
    {
        for (let i = 0; i < this.items.length; i++)
        {
            this.items[i][this.name](argument0, argument1, argument2);
        }
    }

    /**
     *
     * add
     *
     * @param {object} item
     * @param {number} index
     */
    add(item, index)
    {
        if (item[this.name])
        {
            this.detach(item);

            if (typeof index === 'undefined')
            {
                this.items.push(item);
            }
            else
            {
                this.items.splice(index, 0, item);
            }
        }
    }

    /**
     *
     * detach
     *
     * @param {object} item
     */
    detach(item)
    {
        const index = this.items.indexOf(item);

        if (index !== -1)
        {
            this.items.splice(index, 1);
        }
    }

    /**
     *
     * detachAll
     *
     */
    detachAll()
    {
        this.items.length = 0;
    }

    /**
     *
     * destroy
     *
     */
    destroy()
    {
        this.detachAll();

        this.name = null;
        this.items = null;
    }
}
