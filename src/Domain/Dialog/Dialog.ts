import DialogScene from "./DialogScene"

export default class Dialog
{
    private firstScene: DialogScene;
    private currentScene: DialogScene;

    constructor(firstScene: DialogScene) {
        this.firstScene = firstScene;
        this.currentScene = firstScene;
    }
}