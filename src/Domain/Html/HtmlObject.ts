import HtmlAttribute from "./HtmlAttribute";

export default class HtmlObject
{
    private tag: string;
    private attributes: Map<string, HtmlAttribute>

    public constructor(tag: string)
    {
        this.tag = tag;
        this.attributes = new Map<string, HtmlAttribute>();
    }

    public getTag(): string
    {
        return this.tag;
    }

    public attribute(name: string): HtmlAttribute
    {
        if (!this.attributes.has(name)) {
            this.attributes.set(name, new HtmlAttribute(name));
        }

        return this.attributes.get(name);
    }

    public getAttributes(): HtmlAttribute[]
    {
        return [...this.attributes.values()];
    }
}