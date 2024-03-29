import DialogScene from "./DialogScene";

export default class NextSceneProviderStatic
{
    private scene:DialogScene | null;

    constructor(scene: DialogScene | null)
    {
        this.scene = scene;
    }

    getNexScene(): DialogScene | null
    {
        return this.scene;
    }
}