import { select, classNames } from '../settings.js';

class Navigation {
  constructor(){
    const thisNav = this;

    thisNav.dom = {};
    thisNav.pages = [];

    thisNav.getElements();
    thisNav.initActivePage();
    thisNav.initActions();
  }

  getElements(){
    const thisNav = this;

    thisNav.dom.pagesWrapper = document.querySelector(select.containerOf.pages);
    thisNav.dom.pages = thisNav.dom.pagesWrapper.children;
    thisNav.dom.links = document.querySelectorAll(select.nav.links);
  }

  initActivePage(){
    const thisNav = this;
    const pageIdFromHash = window.location.hash.replace('#/', '');
    const defaultPageId = thisNav.dom.pages[0].id;

    for(let page of thisNav.dom.pages){
      thisNav.pages.push(page.id);
    }

    if(thisNav.pages.includes(pageIdFromHash)){
      thisNav.activatePage(pageIdFromHash);
    } else {
      thisNav.activatePage(defaultPageId);  
    }
  }

  activatePage(pageId){
    const thisNav = this;

    for(let page of thisNav.dom.pages){
      page.classList.toggle(classNames.pages.active, page.id === pageId);

      if(page.id === pageId && pageId === 'discover') {
        const pageEvent = new CustomEvent('pageUpdated', {
          bubbles: true,
        });
        page.dispatchEvent(pageEvent);
      }
    }

    for(let link of thisNav.dom.links){
      link.classList.toggle(classNames.nav.active,
        link.getAttribute('href') === '#' + pageId);
    }

    window.location.hash = '#/' + pageId;    
  }

  initActions(){
    const thisNav = this;

    for(let link of thisNav.dom.links){
      link.addEventListener('click', function(event){
        const clickedElement = this;
        event.preventDefault();

        const pageId = clickedElement.getAttribute('href').replace('#', '');
        thisNav.activatePage(pageId);
      });
    }

    thisNav.dom.pagesWrapper.addEventListener('pageRedirected', function(event){
      
      const pageId = event.detail.pageId;

      thisNav.activatePage(pageId);
    });
    

  }
        
}

export default Navigation;