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
}