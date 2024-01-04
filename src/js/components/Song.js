import { select, templates } from '../settings.js';

class Song {
  constructor(initData, style){
    const thisSong = this;

    thisSong.dom = {};
    thisSong.data = initData;
    thisSong.data.className = style;

    thisSong.render();
    thisSong.getElements();

    return thisSong.dom.element;
  }

  render(){
    const thisSong = this;

    const htmlElement = document.createElement('div');
    htmlElement.innerHTML = templates.song(thisSong.data);
    thisSong.dom.element = htmlElement;
  }

  getElements(){
    const thisSong = this;

    thisSong.dom.play = thisSong.dom.element.querySelector(select.song.play);
  }

  static initAudio(className){
    // eslint-disable-next-line no-undef
    GreenAudioPlayer.init({
      selector: className,
      stopOthersOnPlay: true
    });
  }
}

export default Song;