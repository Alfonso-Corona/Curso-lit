import { LitElement, html, css } from "lit";

export class EitTodoSearch extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;
  
  render() {
    return html`
      <div>
        <span>🔍</span>
        <input type="text" placeholder="Search..." id="searchInput"/>
      </div>
    `;
  }
}

customElements.define("eit-todo-search", EitTodoSearch);