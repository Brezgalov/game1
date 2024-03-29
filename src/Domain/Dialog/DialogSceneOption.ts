import DialogScene from "./DialogScene";
import INextSceneProvider from "./INextSceneProvider";

export default class DialogSceneOption
{
    private id: string;
    private text: string;
    private order: number;
    private nextSceneProvider: INextSceneProvider;

    constructor(id: string, text: string, order: number, nextSceneProvider: INextSceneProvider) {
        this.id = id;
        this.text = text;
        this.order = order;
        this.nextSceneProvider = nextSceneProvider;
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

    public getNextScene(...args: any[]): DialogScene|null
    {
        return this.nextSceneProvider.getNexScene(...args);
    }
}