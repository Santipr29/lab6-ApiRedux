import styles from "./favbtn.css"

export default class MyButton extends HTMLElement{

    constructor(){
        super();
        this.attachShadow({mode:"open"});
    }

    connectedCallback(){
        this.render()
    }

    render(){
        if(this.shadowRoot){ 
        this.shadowRoot.innerHTML = '';

        const css = this.ownerDocument.createElement('style')
        css.innerHTML = styles
        this.shadowRoot?.appendChild(css)

        const button = this.ownerDocument.createElement('button');
        button.innerText = `Add favorites`;

        this.shadowRoot?.appendChild(button)
        }
    }

}

customElements.define('my-button', MyButton)