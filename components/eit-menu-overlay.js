import { LitElement, html, css } from "lit";

export class EitMenuOverlay extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
    }
    .overlay {
      display: none;
      position: absolute;
      background-color: #424242;
      color: #fff;
      padding: 0.8rem;
      box-shadow: 0 0 10px rgba(0,0,0,0.5);
      width: 200px;
    }
    .opened {
      display: block;
    }
  `;
  
  static properties = {
    opened: { type: Boolean, reflect: true },
    x : { type: Number},
    y : { type: Number}
  };

  constructor() {
    super();
    console.log('EitMenuOverlay constructor');
    this.opened = false;
    this.x = 0;
    this.y = 0;
    console.log(this.x, this.y);
    this.documentClick = this.closeMenu.bind(this);
  }

  firstUpdated() {
    console.log(this.x, this.y, this.shadowRoot.querySelector('#input-x'));
  }

  updated(changedProperties) {
    console.log(changedProperties);
    if(changedProperties.has('x')) {
      console.log(changedProperties.get('x'), this.x);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    console.log('EitMenuOverlay connectedCallback');
    document.addEventListener('click', this.showClick);
    document.addEventListener('click', this.documentClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    console.log('EitMenuOverlay disconnectedCallback');
    document.removeEventListener('click', this.showClick);
    document.removeEventListener('click', this.documentClick);
  }

  /* connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this.documentClick);
  };

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.documentClick);
  } */

  toggle(e) {
    this.opened = !this.opened;
    e.stopPropagation();
    e.preventDefault();
  }

  showClick = (e) => {
    this.x = e.clientX;
    this.y = e.clientY;
    console.log(`Click en ${e.target.tagName} ${e.clientX} ${e.clientY}`);
  }

  closeMenu() {
    //console.log(this);
    this.opened = false;
  }

  render() {
    return html`
      <span @click=${this.toggle}>
        <slot name="trigger"></slot>
      </span>
      <p>Coordenadas: ${this.x} ${this.y}</p>
      <div class="overlay ${this.opened ? 'opened' : ''}">
        <slot name="menu"></slot>
      </div>
      <input type="text" id="input-x" value=${this.x}>
    `;
  }

}

customElements.define("eit-menu-overlay", EitMenuOverlay);