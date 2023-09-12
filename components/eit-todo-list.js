import { LitElement, html, css } from "lit";
import { icon } from "../libs/icons.js";
import "./eit-todo-search.js";

export class EitTodoList extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  static properties = {
    loggedIn: { type: Boolean },
    role: { type: String },
    completed: { type: Boolean},
    toDos: { type: Array },
    todos: { type: Array }
  };

  constructor() {
    super();
    this.loggedIn = true;
    this.role = "admin";
    this.completed = false;
    this.toDos = ['Tarea 1', 'Tarea 2', 'Tarea 3'];
    this.todos = [
      { id: 1, text: 'Tarea 1', completed: false },
      { id: 2, text: 'Tarea 2', completed: true },
      { id: 3, text: 'Tarea 3', completed: true },
    ]
  };

  toggleLogin() {
    this.loggedIn = !this.loggedIn;
  }

  render() {
    return html`
      <button @click="${this.changeCompleted}">Toggle login</button>
      ${this.loggedIn
        ? html`
            ${this.headingTemplate}
            ${this.bodyTemplate}
            <eit-todo-search></eit-todo-search>
            ${this.sayHello(this.role)}
          `
        : html`<p>Not logged in</p>`}
    `;
  }

  get headingTemplate() {
    return html`
      <h1>Todo list</h1>
    `;
  }

  get bodyTemplate() {
    return html`
      <ul>
        ${this.toDos.map((todo) => html`<li>${todo}</li>`)}
      </ul
      <ul>
        ${this.todos.map((todo) => html`<li>${todo.text} - ${todo.completed ? icon.superDone : icon.done}</li>`)}
      </ul>
      <div>
        ${this.completed ? icon.done : icon.superDone}
      </div>
    `;
  }

  sayHello = (role) => {
    switch (role) {
      case "admin":
        return html`<p>Hello admin</p>`;
      case "premium":
        return html`<p>Hello premium user</p>`;
      case "user":
        return html`<p>Hello user</p>`;
    }
  }

  changeCompleted(){
    this.completed = !this.completed;
  }

}

customElements.define("eit-todo-list", EitTodoList);