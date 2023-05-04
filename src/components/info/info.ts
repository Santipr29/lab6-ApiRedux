import styles from "./info.css";

export enum Attribute {
    "name" = "name",
    "image" = "image",
    "type" = "type",
}

export default class InfoCard extends HTMLElement {
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

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
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

        render() {
            if (this.shadowRoot) {
                this.shadowRoot.innerHTML = ``

                const css = this.ownerDocument.createElement("style");
                css.innerHTML = styles;
                this.shadowRoot?.appendChild(css);

                this.shadowRoot.innerHTML += `
                <section>
                    <img src="${this.image}">
                    <h2>${this.name}</h2>
                    <h3>${this.type}</h3>
                </section>
                `;
                
            }
        }
    }

customElements.define("my-info", InfoCard);