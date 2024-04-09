export default class IdProvider
{
    private static instance: IdProvider;

    private nextId: number;

    public static nextId(prefix: string, separator: string = '_'): string
    {
        if (!IdProvider.instance) {
            IdProvider.instance = new IdProvider();
        }

        return IdProvider.instance.getNextId(prefix, separator);
    }

    private constructor()
    {
        this.nextId = 1;
    }

    public getNextId(prefix: string, separator: string = '_'): string
    {
        return prefix 
            ? prefix + separator + this.nextId++
            : '' + this.nextId++;
    }
}