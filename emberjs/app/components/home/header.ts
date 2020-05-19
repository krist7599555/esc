import Component from '@glimmer/component';
import { inject as service, Registry as Services } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
interface HomeHeaderArgs {}

// https://stackoverflow.com/questions/2863351/checking-if-browser-is-in-fullscreen
function is_already_fullscreen() {
  return window.fullScreen || (window.innerWidth == screen.width && window.innerHeight == screen.height)
}

// https://www.w3schools.com/jsref/met_element_requestfullscreen.asp
function open_fullscreen(): Promise<void> {
  const elem = document.documentElement; // <html>
  if (elem.requestFullscreen) {
    return elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    return elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    return elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    return elem.msRequestFullscreen();
  }
  return Promise.reject();
}

/* Close fullscreen */
function close_fullscreen(): Promise<void> {
  if (document.exitFullscreen) {
    return document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    // @ts-ignore
    return document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    // @ts-ignore
    return document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    // @ts-ignore
    return document.msExitFullscreen();
  }
  return Promise.reject();
}

export default class HomeHeader extends Component<HomeHeaderArgs> {
  @service toast: Services["toast"];
  @tracked is_fullscreen = false;
  constructor() {
    // @ts-ignore
    super(...arguments!);
    setInterval(() => {
      this.is_fullscreen = is_already_fullscreen();
    }, 1000);
  }

  @action
  try_full_screen() {
    open_fullscreen()
    .then(() => {
      this.toast.success("✌ Let's Fun")
    })
    .catch(() => {
      this.toast.error("no full screen")
    })
    .finally(() => {
      this.is_fullscreen = is_already_fullscreen();
    })
  }
}
