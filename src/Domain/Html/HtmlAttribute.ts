export default class HtmlAttribute
{
    private name: string;
    private value: string;

    public constructor(name: string, value: string = '')
    {
        this.name = name;
        this.value = value;
    }

    public getName(): string
    {
        return this.name;
    }

    public getValue(): string
    {
        return this.value;
    }

    public set(value: string): HtmlAttribute
    {
        this.value = value;
        return this;
    }

    public append(value: string = '', spacer: string = ' '): HtmlAttribute
    {
        if (this.value) {
            this.value += spacer
        }
        this.value += value;
        return this;
    }
}