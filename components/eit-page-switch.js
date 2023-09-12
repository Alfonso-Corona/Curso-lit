import { LitElement, html, css } from "lit";
import '@dile/dile-pages/dile-pages.js';
import './eit-switch.js';

export class EitPageSwitch extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    button {
      margin-top: 1rem;
    }
  `;

  static properties = {
    active: { type: Boolean },
    pages: { type: Array },
    page: { type: String},
  };

  constructor() {
    super();
    this.active = true;
    this.page = 'dos';
    this.pages = ['uno', 'dos', 'tres'];
  }
  
  render() {
    return html`
      <button @click=${this.toggle}>Toggle</button>
      <button @click=${this.One}>One</button>
      <button @click=${this.show('dos')}>Two</button>
      <button @click=${this.show('tres')}>Show</button>
      ${this.pagesTemplate}
      <eit-switch @eit-page-links-change=${this.doSelectedChange} ?checked=${this.active} .pagesArray=${this.pages} selectedPage=${this.page} @eit-switch-changed=${this.changeActiveListener}></eit-switch>
      <hr>
      <eit-switch @eit-page-links-change=${this.doSelectedChange} ?checked=${this.active} .pagesArray=${this.pages} selectedPage=${this.page}></eit-switch>
      ${this.active ? this.pagesTemplate : html`<p>Inactivo</p>`}
    `;
  }

  toggle() {
    this.active = !this.active;
  }

  One() {
    this.page = 'uno';
  }

  show(param) {
    return () => {
      this.page = param;
    }
  };

  changeActiveListener(e) {
    this.active = e.detail.checked;
  }

  doSelectedChange(e) {
    this.page = e.detail.selectedPage;
  }

  get pagesTemplate() {
    return html`
      <dile-pages attrForSelected="name" selected="${this.page}">
        <div name="uno">
          <h3>Page 1</h3>
          <p>Contenido de la página 1</p>
        </div>
        <div name="dos">
          <h3>Page 2</h3>
          <p>Contenido de la página 1</p>
        </div>
        <div name="tres">
          <h3>Page 3</h3>
          <p>Contenido de la página 1</p>
        </div>
      </dile-pages>
    `;
  }

}

customElements.define("eit-page-switch", EitPageSwitch);