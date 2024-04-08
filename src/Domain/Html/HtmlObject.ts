import HtmlAttribute from "./HtmlAttribute";

export default class HtmlObject
{
    private tag: string;
    private attributes: Map<string, HtmlAttribute>;
    private content: string|HtmlObject;

    public constructor(tag: string)
    {
        this.content = '';
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

    public contains(content: string|HtmlObject): HtmlObject
    {
        this.content = content;
        return this;
    }

    public render(): string
    {
        let html: string = '<' + this.tag;

        this.getAttributes().forEach((attribute: HtmlAttribute) => {
            html += ' ' + attribute.getName() + '="' + attribute.getValue() + '"';
        });

        html += '>'

        html += this.content instanceof HtmlObject
            ? this.content.render()
            : this.content;

        return html + '</' + this.tag + '>';
    }
}