import DialogScene from "./DialogScene";

export default class NextSceneProviderCallback
{
    private nextSceneCallback: getNextSceneCallback;

    constructor(nextSceneCallback: getNextSceneCallback)
    {
        this.nextSceneCallback = nextSceneCallback;
    }

    getNexScene(...args: any[]): DialogScene | null
    {
        return this.nextSceneCallback(...args);
    }
}

interface getNextSceneCallback{
    (...args: any[]): DialogScene | null;
}