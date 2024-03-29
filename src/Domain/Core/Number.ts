export default class Number
{
    public static comapreASC(left: number, right: number): number
    {
        if (left === right) { 
            return 0;
        }

        return left > right ? 1 : -1;
    }
}