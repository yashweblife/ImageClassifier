export class Matrix2D {
    public components: Float64Array[] = [];
    constructor(public rows: number, public cols: number) {
        for (let i = 0; i < rows; i++) {
            this.components.push(new Float64Array(cols))
        }
    }
    public add(m: Matrix2D) {
        if (this.rows !== m.rows || this.cols !== m.cols) return;
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.rows; j++) {
                this.components[i][j] += m.components[i][j]
            }
        }
        return (this)
    }
    public sub(m: Matrix2D) {
        if (this.rows !== m.rows || this.cols !== m.cols) return;
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.rows; j++) {
                this.components[i][j] -= m.components[i][j]
            }
        }
        return (this)
    }
    public mul(m: Matrix2D) {
        if (this.rows !== m.rows || this.cols !== m.cols) return;
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.rows; j++) {
                this.components[i][j] *= m.components[i][j]
            }
        }
        return (this)
    }
    public div(m: Matrix2D) {
        if (this.rows !== m.rows || this.cols !== m.cols) return;
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.rows; j++) {
                this.components[i][j] /= m.components[i][j]
            }
        }
        return (this)
    }
}