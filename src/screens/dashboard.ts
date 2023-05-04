import styles from "./dashboard.css";
import { api } from "../services/getApi";

import { Attribute } from '../components/info/info';
import { Attributes } from "../components/card/card";
import { appState, dispatch } from "../store/index";
import { getTrips } from "../store/actions";

class Dashboard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  
    async connectedCallback() {
        const data = await api()
        this.render(data)

        if(appState.favorites.length === 0){
          const action = await getTrips();
          dispatch(action);
        }else{
          this.render(data)
        }
    }
  
    render(data: any) {
      if (this.shadowRoot){ this.shadowRoot.innerHTML = "";

      const css = this.ownerDocument.createElement('style')
      css.innerHTML = styles
      this.shadowRoot?.appendChild(css)

      const container = this.ownerDocument.createElement("section")
      container.className = "container"

      const tittle = this.ownerDocument.createElement("h1")
      tittle.innerText = "Pokedex"

      const pokeSection = this.ownerDocument.createElement("section")
      pokeSection.className = "pokedex"

      pokeSection.appendChild(tittle)

      data.forEach((data: any)=>{
        const card = this.ownerDocument.createElement('my-card')
        card.setAttribute(Attributes.name, data.species.name)
        card.setAttribute(Attributes.image, data.sprites.front_default)
        card.setAttribute(Attributes.type, data.types[0].type.name)

        pokeSection.appendChild(card);
      })
      

      const tittlefav = this.ownerDocument.createElement("h1")
      tittlefav.innerText = "Favorites"

      const pokeFavs = this.ownerDocument.createElement("section")
      pokeFavs.className = "favs"
      pokeFavs.appendChild(tittlefav)

      appState.favorites.forEach((Fav, i)=>{
        const card = this.ownerDocument.createElement('my-card')
        card.setAttribute(Attributes.name, Fav.name)
        card.setAttribute(Attributes.image, Fav.image)
        card.setAttribute(Attributes.type, Fav.type)

        pokeFavs.appendChild(card);
      })
      
      container.appendChild(pokeSection)
      container.appendChild(pokeFavs)

      this.shadowRoot?.appendChild(container);

        } 
    }
}
  
  customElements.define("app-dashboard", Dashboard);