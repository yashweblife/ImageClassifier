export class Matrix{
    components:Array<number>
    constructor(public length:number=0){
        this.components = new Array(length);
    }
}