import { templates } from '../settings.js';

class Song {
  constructor(initData, style){
    const thisSong = this;

    thisSong.dom = {};
    thisSong.data = initData;
    thisSong.data.className = style;

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

  static initAudio(className){
    // eslint-disable-next-line no-undef
    GreenAudioPlayer.init({
      selector: className,
      stopOthersOnPlay: true
    });
  }
}

export default Song;