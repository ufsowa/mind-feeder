import { select, settings, templates } from '../settings.js';

class Admin {
  constructor(){
    const thisAdmin = this;

    thisAdmin.dom = {};

    thisAdmin.getElements();
    thisAdmin.render();
    thisAdmin.initActions();
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

    thisAdmin.dom.upload = thisAdmin.dom.container.querySelector(select.admin.send);
    thisAdmin.dom.load = thisAdmin.dom.container.querySelector(select.admin.load);
    thisAdmin.dom.input = thisAdmin.dom.container.querySelector(select.admin.input);
  }

  initActions(){
    const thisAdmin = this;

    thisAdmin.dom.load.addEventListener('click', function(event){
      event.preventDefault();
      const url = settings.db.url + '/' + settings.db.songs;

      fetch(url)
        .then(data => {console.log('Refresh songs: ', data);});
    });

    thisAdmin.dom.upload.addEventListener('click', function(event){
      event.preventDefault();
      const url = settings.db.url + '/test';

      fetch(url, {
        method: 'post',
        headers: {
          'Content-Type':  'application/json',
        },
        body: JSON.stringify({
          file: 'file_path',
          fileName: 'my file',
        }),
      })
        .then((res) => console.log(res))
        .catch((err) => ('Error occurred', err));
    });
  }
}

export default Admin;