import styles from "./dashboard.css";
import { api } from "../services/getApi";

import { Attribute } from '../components/info/info';
import { Attributes } from "../components/card/card";

class Dashboard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  
    async connectedCallback() {
        const data = await api()
        this.render(data)
    }
  
    render(data: any) {
      if (this.shadowRoot){ this.shadowRoot.innerHTML = "";

      const css = this.ownerDocument.createElement('style')
      css.innerHTML = styles
      this.shadowRoot?.appendChild(css)

      const tittle = this.ownerDocument.createElement("h1")
      tittle.innerText = "Pokedex"

      const pokeSection = this.ownerDocument.createElement("section")

      pokeSection.appendChild(tittle)

      data.forEach((data: any)=>{
        const card = this.ownerDocument.createElement('my-card')
        card.setAttribute(Attributes.name, data.species.name)
        card.setAttribute(Attributes.image, data.sprites.front_default)
        card.setAttribute(Attributes.type, data.types[0].type.name)

        pokeSection.appendChild(card);
      })
      
      this.shadowRoot?.appendChild(pokeSection);


      const tittlefav = this.ownerDocument.createElement("h1")
      tittlefav.innerText = "Favorites"

      const pokeFavs = this.ownerDocument.createElement("section")
      pokeFavs.appendChild(tittlefav)


      
      this.shadowRoot?.appendChild(pokeFavs);


        } 
    }
}
  
  customElements.define("app-dashboard", Dashboard);