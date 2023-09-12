import {LitElement, html, css} from 'lit';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import { users } from './user';

export class EitUser extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  properties = {
    user: {type: Object}
  }

  render() {
    return html`
      <section>
        <ul>
        <li><b>Nombre</b>: ${this.user.name}</li>
        <li><b>Email</b>: <a href="mailto: ${this.user.email}">${this.user.email}</a></li>
        <li><b>Teléfono</b>: ${this.user.phone}</li>
        </ul>
        <div>
          ${unsafeHTML(this.user.profile)}
        </div>
      </section>
      <hr>
    `;
  }

}

customElements.define('eit-user', EitUser);