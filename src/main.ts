class Matrix{
    constructor(public size:number=3){
        
    }
}
class Canvas{
    public canvas= document.createElement("canvas");
    public c= this.canvas.getContext('2d');
    public size=new Matrix(2);
    constructor(parent:HTMLElement=document.body){}
}


class Group{
    public values:any[] = []
    constructor(public name:string="", data:any){
        this.values.push(data);
    }
    public addValue(){}  
}
class Classifier{
    constructor(){}
    public gatherData(){}
    public classify(){}
    public train(){}
}

class Visualizer{
    public canvas:Canvas = new Canvas();
    constructor(){}
}