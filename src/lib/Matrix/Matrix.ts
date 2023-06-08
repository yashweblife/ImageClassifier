export class Matrix {
    public components: Float64Array;
    public length: number = 0;
    constructor(size: number) {
        this.length = size;
        this.components = new Float64Array(size);
    }
    public set(val: number[]) {
        this.components = new Float64Array(val);
    }
    public add(m: (Matrix|number[]|Float64Array)): Matrix {
        if( m instanceof Matrix){
            for (let i = 0; i < this.length; i++) {
                this.components[i] += m.components[i]
            }
        }else{
            for (let i = 0; i < this.length; i++) {
                this.components[i] += m[i]
            }
        }
        return (this)
    }
    public sub(m: (Matrix|number[]|Float64Array)): Matrix {
        if( m instanceof Matrix){
            for (let i = 0; i < this.length; i++) {
                this.components[i] -= m.components[i]
            }
        }else{
            for (let i = 0; i < this.length; i++) {
                this.components[i] -= m[i]
            }
        }
        return (this)
    }
    
    public mul(m: (Matrix|number[]|Float64Array)): Matrix {
        if( m instanceof Matrix){
            for (let i = 0; i < this.length; i++) {
                this.components[i] *= m.components[i]
            }
        }else{
            for (let i = 0; i < this.length; i++) {
                this.components[i] *= m[i]
            }
        }
        return (this)
    }
    public div(m: (Matrix|number[]|Float64Array)): Matrix {
        if( m instanceof Matrix){
            for (let i = 0; i < this.length; i++) {
                this.components[i] *= m.components[i]
            }
        }else{
            for (let i = 0; i < this.length; i++) {
                this.components[i] *= m[i]
            }
        }
        return (this)
    }
    
    public normalize(m: number = 1): Matrix {
        let mag = 0;
        for (let i = 0; i < this.length; i++) {
            mag += (this.components[i] ** 2)
        }
        mag = Math.sqrt(mag)
        for (let i = 0; i < this.length; i++) {
            this.components[i] *= m / mag

        }
        return (this)
    }
    public clone() {
        const output = new Matrix(this.length);
        for (let i = 0; i < this.length; i++) {
            output.components[i] = this.components[i]

        }
        return (output)
    }
}
