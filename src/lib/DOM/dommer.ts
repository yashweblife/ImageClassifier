export class $ {
    public dom: HTMLElement;
    constructor(tag: string) {
        this.dom = document.createElement(tag)
    }
    public addClass(val: string) {
        this.dom.classList.add(val);
        return (this)
    }
    public removeClass(val: string) {
        this.dom.classList.remove(val);
        return (this)
    }
    public setText(val: string) {
        this.dom.innerText = val;
        return this
    }
    public setEvent(type:string, exec:any){
        this.dom.addEventListener(type, exec);
        return this
    }
    public setHTML(val:string){
        this.dom.innerHTML = val;
        return this
    }
    public setID(val:string){
        this.dom.id = val;
        return this
    }
    public setAttribute(key:string, val:string){
        this.dom.setAttribute(key, val);
        return this
    }

    
}