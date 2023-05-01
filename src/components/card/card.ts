import styles from './card.css';
import { Attribute } from '../info/info';
import { dispatch } from '../../store/index';
import { addNewTrip } from '../../store/actions';

export enum Attributes{
    "name" = "name",
    "image" = "image",
    "type" = "type",
}

export default class Card extends HTMLElement {
    name?: string;
    image?: string;
    type?: string;

    static get observedAttributes() {
        const attrs: Record<Attribute, null> = {
            name: null,
            image: null,
            type: null,
        };
        return Object.keys(attrs);
    }

    attributeChangedCallback(
        propName: Attribute,
        _: string | undefined,
        newValue: string | undefined
        ) {
            switch (propName) {
                default:
                this[propName] = newValue;
                break;
            }

            this.render();
        }

    constructor(){
        super();
        this.attachShadow({mode: "open"})
    }

    connectedCallback() {
        this.render()
    }

    render() {
        if(this.shadowRoot) this.shadowRoot.innerHTML = ''
        
        const css = this.ownerDocument.createElement("style");
                css.innerHTML = styles;
                this.shadowRoot?.appendChild(css);

        const info = this.ownerDocument.createElement('my-info');
        info.setAttribute(Attribute.image, String(this.image))
        info.setAttribute(Attribute.name, String(this.name))
        info.setAttribute(Attribute.type, String(this.type))
        
        const btn = this.ownerDocument.createElement('my-button');
        btn.addEventListener('click', ()=>{
            dispatch(
                addNewTrip({
                    payload:{
                        image: String(this.image),
                        name: String(this.name),
                        type: String(this.type)
                    }
                })
                )
        })

        const card = this.ownerDocument.createElement('section')
        card.appendChild(info)
        card.appendChild(btn)

        this.shadowRoot?.appendChild(card)
    }
}

customElements.define('my-card', Card)