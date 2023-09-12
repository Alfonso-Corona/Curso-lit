import { LitElement, html, css } from "lit";

class DwMessage extends LitElement {
  static styles = css`
  :host {
    display: block;
    border: 1px solid #000;
    margin: 1rem;
    padding: 0.5rem;
    //background-color: #f91;
  }
    div {
      background-color: #f5f5;
    }
  `;

  static properties = {
    msg: { type: String },
  };

  constructor() {
    super();
    this.msg = "Hello World";
  }

  handleClick() {
    this.msg = "Hello Universe";
  }

  render() {
    return html`
      <div>Message: ${this.msg}</div>
      <button @click=${this.handleClick}>Click</button>
    `;
  }
}

customElements.define("dw-message", DwMessage);