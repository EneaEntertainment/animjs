export interface IDelayData
{
    protected: boolean;
    autoUpdate: boolean;
    duration: number;
    group: string | number;

    onComplete: (...args: Array<any>)=> void;
}
