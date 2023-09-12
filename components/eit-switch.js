import { LitElement, html, css } from "lit";

export class EitSwitch extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    .checked {
      color: red;
    }
    .selected {
      color: #ff0000;
    }
    .not-selected {
      background-color: var(--eit-list-element-color, #da45ff);
    }
    li {
      margin: 0.5rem;
    }
  `;

  static properties = {
    checked: { type: Boolean, reflect: true },
    pagesArray: { type: Array },
    selectedPage: { type: String, reflect: true }
  };

  constructor() {
    super();
    this.checked = false;
    this.pagesArray = [];
    this.selectedPage = 0;
  }

  toggle() {
    this.checked = !this.checked;
    this.dispatchEvent(new CustomEvent('eit-switch-changed', {
      bubbles: true,
      composed: true,
      detail: {
        checked: this.checked,
        element: this
      }
    }));
  }

  render() {
    return html`
    <section @click=${this.toggle}>
      <ul>
        ${this.pagesArray.map((page) => html`
          <li @click=${() => this.setPage(page)} class='${this.selectedPage == page ? 'selected' : 'not-selected'}'>
            ${page}
          </li>`
          )}
      </ul>
    </section>
    `;
    /* return html`
    ${this.headerTemplate()}
    <section @click=${this.toggle}>
      <div class='${this.checked ? 'checked' : '-'}'>
        ${this.checked ? html`<span>🌞 Encendido</span>` : html`<span>🌜Apagado</span>`}
      </div>
    </section>
    ${this.footerTemplate()}
    `; */
  }

  setPage(page) {
    this.selectedPage = page;
    this.dispatchEvent(new CustomEvent('eit-page-links-change', {
      bubbles: true,
      composed: true,
      detail: {
        selectedPage: this.selectedPage
      }
    }));
  }

  headerTemplate() {
    return html`
      <slot></slot>
    `;
  }

  footerTemplate() {
    return html`
      <slot name="footer"></slot>
    `;
  }
}

customElements.define("eit-switch", EitSwitch);