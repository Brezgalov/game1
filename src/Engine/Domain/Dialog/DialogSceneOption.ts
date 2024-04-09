import DialogScene from "./DialogScene";

export default class DialogSceneOption
{
    private id: string;
    private text: string;
    private order: number;
    private parentScene: DialogScene | null;  
    private nextSceneProvider: getNextSceneCallback;
    private beforeSelectEvent: beforeSelectEventHandler;
    private afterSelectEvent: afterSelectEventHandler;

    constructor(
        id: string,
        text: string,
        order: number = 0,
    ) {
        this.id = id;
        this.text = text;
        this.order = order;

        this.parentScene = null;
        this.nextSceneProvider = () => { return null; };
        this.beforeSelectEvent = () => { };
        this.afterSelectEvent = () => { };
    }    

    public bindParentScene(parentScene: DialogScene): DialogSceneOption
    {
        this.parentScene = parentScene;
        return this;
    }

    public bindNextSceneProvider(nextSceneProvider: getNextSceneCallback): DialogSceneOption
    {
        this.nextSceneProvider = nextSceneProvider;
        return this;
    }

    public bindBeforeSelectEvent(beforeSelectEvent: beforeSelectEventHandler): DialogSceneOption
    {
        this.beforeSelectEvent = beforeSelectEvent;
        return this;
    }

    public bindAfterSelectEvent(afterSelectEvent: afterSelectEventHandler): DialogSceneOption
    {
        this.afterSelectEvent = afterSelectEvent;
        return this;
    }

    public getId(): string
    {
        return this.id;
    }

    public getText(): string
    {
        return this.text;
    }

    public getOrder(): number
    {
        return this.order;
    }

    public select(...args: any[]): DialogScene|null
    {
        this.beforeSelectEvent(this.parentScene, ...args);

        let nextScene = this.nextSceneProvider(...args);

        this.afterSelectEvent(this.parentScene, nextScene, ...args);

        return nextScene;
    }
}

interface getNextSceneCallback 
{
    (...args: any[]): DialogScene | null;
}

interface beforeSelectEventHandler
{
    (parentScene: DialogScene | null, ...args: any[]): void;
}

interface afterSelectEventHandler
{
    (parentScene: DialogScene | null, nextScene: DialogScene | null, ...args: any[]): void;
}