import { LitElement, html, css } from 'lit';
//import {unsafeHTML} from 'lit/directives/unsafe-html.js';7
import { users } from './user';
import './eit-user.js';
import './eit-switch.js';
import { repeat } from 'lit/directives/repeat.js';
import { performanceMixin } from '../mixins/performaceMixin';

export class UserList extends performanceMixin(LitElement) {
  static styles = css`
    :host {
      display: block;
    }
  `;

  static properties = {
    //users: {type: Array}
    orderTypes: { type: Array },
    selectedOrder: { type: String },
    orderedUsers: { type: Array },
    userOrdered: { type: Array },
  }

  constructor() {
    super();
    this.times = 0;
    this.orderTypes = ['asc', 'desc'];
    this.selectedOrder = 'asc';
    /* this.users = [];
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.users = users ) */
    this.userAsc = [...users.sort((a, b) => {
      if (a.name === b.name) return 0;
      return a.name > b.name ? 1 : -1;
    })];
    this.userDesc = [...users.sort((a, b) => {
      if (a.name === b.name) return 0;
      return a.name < b.name ? 1 : -1;
    })];
    this.orderedUsers = this.userAsc;

  }

  change100Times() {
    if (this.times === 0) {
      this.startTime();
    }
    if (this.times < 100) {
      this.times++;
      this.orderedUsers = this.times % 2 ? this.userAsc : this.userDesc;
      this.updateComplete.then(() => {
        this.change100Times();
      });
    } else {
      this.endTime();
      this.reportPerformance();
      this.times = 0;
    }
  }

  changeSelectedOrder(e) {
    this.selectedOrder = e.detail.selectedPage;
    if (this.selectedOrder === 'asc') {
      this.orderedUsers = this.userAsc;
    } else {
      this.orderedUsers = this.userDesc;
    }
  }

  doOrder(order) {

    const userOrdered = users.sort((a, b) => {
      if (a.name === b.name) return 0;
      if (order === 'asc') {
        return a.name > b.name ? 1 : -1;
      } else {
        return a.name < b.name ? 1 : -1;
      }
    });
    return userOrdered;
  }

  get mapDirectivesTemplate() {
    return html`
      ${this.orderedUsers.map((userX) => html`
        <eit-user .user=${userX}></eit-user>
      `)}
    `;
  }

  get directiveRepeatTemplate() {
    return html`
      ${repeat(this.orderedUsers, (userX) => userX.id, (userX, index) => html`
        ${index}
        <eit-user .user=${userX}></eit-user>
      `)}
    `;
  }

  render() {
    return html`
    <button @click=${this.change100Times}>100</button>
      <h1>User List</h1>
      <eit-switch .pagesArray=${this.orderTypes} selectedPage=${this.selectedOrder} @eit-page-links-change=${this.changeSelectedOrder}></eit-switch>
      <ul>
        ${this.mapDirectivesTemplate}
      </ul>
    `;
  }

}

customElements.define('user-list', UserList);