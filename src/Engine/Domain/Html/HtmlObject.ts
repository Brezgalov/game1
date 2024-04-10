import HtmlAttribute from "./HtmlAttribute";

export default class HtmlObject
{
    private tag: string;
    private attributes: Map<string, HtmlAttribute>;
    private content: Array<string|HtmlObject>;

    public constructor(tag: string)
    {
        this.content = new Array<string|HtmlObject>();
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

    public addContent(content: string|HtmlObject): HtmlObject
    {
        this.content.push(content);
        return this;
    }

    public render(): string
    {
        let html: string = '<' + this.tag;

        this.getAttributes().forEach((attribute: HtmlAttribute) => {
            html += ' ' + attribute.getName() + '="' + attribute.getValue() + '"';
        });

        html += '>'

        this.content.forEach((item: string|HtmlObject) => {
            html += item instanceof HtmlObject
            ? item.render()
            : item;
        });        

        return html + '</' + this.tag + '>';
    }
}