import { LitElement, html, css } from "lit";
import { UserList } from "./user-list";
import { repeat } from "lit/directives/repeat.js";

export class UserListOptimized extends UserList {
  get mapRepeatTemplate() {
    return html`
      ${repeat(this.orderedUsers, (userX) => userX.id, (userX, index) => html`
        ${index}
        <eit-user .user=${userX}></eit-user>
      `)}
    `;
  }
}

customElements.define("user-list-optimized", UserListOptimized);