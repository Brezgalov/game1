import Number from "./../Core/Number";

export default class Item
{
    private parentItem: Item | null;
    private order: number;
    private joints: Map<string, Item>;

    constructor(parentItem: Item | null, order: number = 0) 
    {
        this.parentItem = parentItem;

        this.order = order;
    }

    public addJoint(code: string, item: Item) 
    {
        this.joints.set(code, item);
    }

    public getOrder(): number
    {
        return this.order;
    }

    public getJoints()
    {
        return [...this.joints.values()].sort(
            (left: Item, right: Item): number => {
                return Number.comapreASC(left.getOrder(), right.getOrder());
            }
        );
    }

    public getParent(): Item | null
    {
        return this.parentItem;    
    }

    public isRootItem(): boolean
    {
        return this.parentItem === null;
    }
}