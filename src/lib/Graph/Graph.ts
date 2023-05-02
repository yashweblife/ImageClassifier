import { add, scalar, Vector } from "../Vector";

class Group{
    public children:Vector[] = [];
    public name:string = "";
    public color:string = "red";
    public averagePoint:Vector= [0,0,0];
    constructor(n:string=""+Math.random()){}
    public setName = (n:string)=>{}
    public setColor = (c:string)=>{}
    public addChild = (val:Vector)=>{
        this.children.push(val);
        this.calculateAverage();
    }
    public calculateAverage = ()=>{
        let len = this.children.length
        if(len==0)return;
        if(len==1){
            this.averagePoint = this.children[0]
            return;
        }
        scalar(this.averagePoint,0);
        for(let i=0;i<len;i++){
            add(this.averagePoint,this.children[i])
        }
        scalar(this.averagePoint, 1/len);
    }

}

export class Graph{
    public groups:Group[]=[];
    public grid:Vector[][] = [];
    public canvas = document.createElement("canvas");
    public c:CanvasRenderingContext2D = this.canvas.getContext('2d')!;
    public size:Vector = [400,400,400]
    constructor(){
        for(let i=0;i<10;i++){

        }
    }
}