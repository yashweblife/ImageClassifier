import { Matrix } from "./Matrix";

export class MatrixMath{
    constructor(public resolution:number=5){}
    public add(a:Matrix, b:Matrix){
        const output = new Matrix(a.length);
        for(let i=0;i<a.length;i++){
            output.components[i] = a.components[i]+b.components[i];
        }
        return(output);
    }
    public sub(a:Matrix, b:Matrix){
        const output = new Matrix(a.length);
        for(let i=0;i<a.length;i++){
            output.components[i] = a.components[i]+b.components[i];
        }
        return(output);
    }
    public getMagnitude(a:Matrix){
        let output = 0;
        for(let i=0;i<a.length;i++){
            output+=a.components[i]**2
        }
        return(Math.sqrt(output));
    }
    public normalize(a:Matrix, scale:number=1){
        let mag = 0;
        const output = new Matrix(a.length);
        for(let i=0;i<a.length;i++){
            mag+=a.components[i]**2
        }
        mag = Math.sqrt(mag);
        for(let i=0;i<a.length;i++){
            output.components[i] = a.components[i]*scale/mag;
        }
        return(output);
    } 
}
