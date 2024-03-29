export default class Events
{
    private events: Map<string, Function>;

    public constructor()
    {
        this.events = new Map<string, Function>();
    }

    public bind(eventName: string, callback: Function): void
    {
        this.events.set(eventName, callback);
    }

    public trigger(eventName: string, ...args: any[]): any
    {
        if (!this.events.has(eventName)) {
            return null;
        }
        
        let callback: Function = this.events.get(eventName);
        
        return callback(...args);
    }
}