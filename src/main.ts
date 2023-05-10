class Matrix{
    public components:Float32Array;
    constructor(public size:number=3){
        this.components = new Float32Array(size);
    }
}
class MatrixMath extends Matrix{
    public static add(a:Matrix, b:Matrix){
        
    }
}
class Canvas{
    public canvas= document.createElement("canvas");
    public c= this.canvas.getContext('2d');
    public size=new Matrix(2);
    constructor(parent:HTMLElement=document.body){}
}

class Camera{
    constructor(){}
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
