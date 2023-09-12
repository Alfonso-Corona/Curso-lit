import {LitElement, html, css} from 'lit';

export class EitClock extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    .clock {
      color: red;
    }
  `;

  static properties = {
    time: {type: String},
  }

  constructor() {
    super();
    this.time = '';
  }

  firstUpdated() {
    this.interval = setInterval(() => {
      this.time = this.getClock(); // actualiza una propiedad
      this.requestUpdate(); // actualiza todo el shadow DOM
    }, 1000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this.interval);
  }

  getClock() {
    let date = new Date();
    return `${date.getHours().toString().padStart(2,0)}:${date.getMinutes().toString().padStart(2,0)}:${date.getSeconds().toString().padStart(2,0)}`;
  }

  render() {
    return html`
      <div class="clock">Time with requestUpdate: ${this.getClock()}</div>
      <p>Time with properties: ${this.time}</p>
    `;
  }

}

customElements.define('eit-clock', EitClock);