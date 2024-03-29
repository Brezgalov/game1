import DialogScene from "./DialogScene";

export default interface INextSceneProvider 
{
    getNexScene(...args: any[]): DialogScene | null;
}