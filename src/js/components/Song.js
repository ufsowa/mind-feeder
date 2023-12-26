import { templates } from '../settings.js';

class Song {
  constructor(initData){
    const thisSong = this;

    thisSong.dom = {};
    thisSong.data = initData;

    thisSong.render();
    console.log('New song: ', thisSong);

    return thisSong.dom.element;
  }

  render(){
    const thisSong = this;

    const htmlElement = document.createElement('div');
    htmlElement.innerHTML = templates.song(thisSong.data);
    thisSong.dom.element = htmlElement;
  }
}

export default Song;