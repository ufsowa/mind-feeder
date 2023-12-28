import { select, templates } from '../settings.js';

class Admin {
  constructor(){
    const thisAdmin = this;

    thisAdmin.dom = {};

    thisAdmin.getElements();
    thisAdmin.render();
  }

  getElements(){
    const thisAdmin = this;

    thisAdmin.dom.container = document.querySelector(select.containerOf.admin);
  }

  render(){
    const thisAdmin = this;

    const htmlElement = document.createElement('div');
    htmlElement.innerHTML = templates.admin();
    thisAdmin.dom.container.appendChild(htmlElement);
  }
}

export default Admin;