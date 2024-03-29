import DialogSceneOption from "./DialogSceneOption";
import Number from "./../Core/Number";

export default class DialogScene
{
    private text: string;
    private options: Map<string, DialogSceneOption>;

    constructor(text: string) {
        this.text = text;
        this.options = new Map<string, DialogSceneOption>();
    }

    public addOption(option: DialogSceneOption): DialogScene
    {
        this.options.set(option.getId(), option);
        
        return this;
    }

    public getText(): string
    {
        return this.text;
    }

    public getOptions(): DialogSceneOption[]
    {
        return [...this.options.values()].sort(
            (left: DialogSceneOption, right: DialogSceneOption): number => {
                return Number.comapreASC(
                    left.getOrder(), 
                    right.getOrder()
                );
            }
        );
    }

    public selectOption(optionId: string): DialogScene|null
    {
        let option = this.options.get(optionId);
        if (!option) {
            return null;
        }

        return option.getNextScene();
    }
}