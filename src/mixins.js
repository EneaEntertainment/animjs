export const mixins =
    {
        /**
         *
         * killTweensOf
         *
         * @param {object} target
         * @param {boolean} [force=false]
         */
        killTweensOf(target, force = false)
        {
            for (let i = 0; i < this.tweens.length; i++)
            {
                const tween = this.tweens[i];

                if (tween.target === target)
                {
                    tween.kill(force);
                }
            }
        },

        /**
         *
         * killAll
         *
         * @param {boolean} [force=false]
         */
        killAll(force = false)
        {
            for (let i = this.tweens.length - 1; i >= 0; i--)
            {
                const tween = this.tweens[i];

                tween.kill(force);
            }
        }
    };
