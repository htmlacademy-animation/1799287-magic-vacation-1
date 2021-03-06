import throttle from 'lodash/throttle';

export default class FullPageScroll {
  constructor() {
    this.THROTTLE_TIMEOUT = 2000;

    this.screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);
    this.menuElements = document.querySelectorAll(`.page-header__menu .js-menu-link`);

    this.activeScreen = 0;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChengedHandler = this.onUrlHashChanged.bind(this);
  }

  init() {
    document.addEventListener(`wheel`, throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT, { trailing: true }));
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);

    this.onUrlHashChanged();
  }

  onScroll(evt) {
    const currentPosition = this.activeScreen;
    this.reCalculateActiveScreenPosition(evt.deltaY);
    if (currentPosition !== this.activeScreen) {
      this.changePageDisplay();
    }
  }

  onUrlHashChanged() {
    const newIndex = Array.from(this.screenElements).findIndex((screen) => location.hash.slice(1) === screen.id);
    this.activeScreen = (newIndex < 0) ? 0 : newIndex;
    this.changePageDisplay();
  }

  changePageDisplay() {
    this.changeVisibilityDisplay();
    this.changeActiveMenuItem();
    this.emitChangeDisplayEvent();
  }

  changeVisibilityDisplay() {
    
    let bg = document.querySelector('.bg-screen')
    let prize = document.querySelector('.prizes')

    this.screenElements.forEach((screen) => {
      
      if (screen.classList.contains('screen--story') && this.screenElements[this.activeScreen].classList.contains(`screen--prizes`)) {
        screen.classList.remove(`active`);
        setTimeout(() => {
          screen.classList.add(`screen--hidden`);
        }, 700)
      } else {

        if (screen.classList.contains('screen--prizes') && this.screenElements[this.activeScreen].classList.contains(`screen--rules`)) {
          screen.classList.remove(`active`);
          setTimeout(() => {
            screen.classList.add(`screen--hidden`);
          }, 400)
        } else{
        screen.classList.add(`screen--hidden`);
        screen.classList.remove(`active`);
        }
      }

    });

    if ( this.screenElements[this.activeScreen].classList.contains(`screen--prizes`)) {
      setTimeout(() => {
        this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
      })
      setTimeout(() => {
        prize.style.opacity = '1';
      }, 800)
      bg.style.height = '100%'
      setTimeout(() => {
        bg.style.height = '0%'
      }, 700)
    } 
    else if ( this.screenElements[this.activeScreen].classList.contains(`screen--rules`)) {
      prize.style.opacity = '0';
      bg.style.height = '0%'
      setTimeout(() => {
        this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
      },100) 
      }
      
    else {
      this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
      prize.style.opacity = '0';
      bg.style.height = '0%'
    }

    this.screenElements[this.activeScreen].classList.add(`active`);
  }

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find((item) => item.dataset.href === this.screenElements[this.activeScreen].id);
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        'screenId': this.activeScreen,
        'screenName': this.screenElements[this.activeScreen].id,
        'screenElement': this.screenElements[this.activeScreen]
      }
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    if (delta > 0) {
      this.activeScreen = Math.min(this.screenElements.length - 1, ++this.activeScreen);
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }
}
