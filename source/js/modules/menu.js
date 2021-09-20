import AccentTypographyBuild from './accent-typography-build';

export default () => { 
  let header = document.querySelector(`.js-header`);
  let menuToggler = document.querySelector(`.js-menu-toggler`);
  let menuLinks = document.querySelectorAll(`.js-menu-link`);

  if (menuToggler) {
    menuToggler.addEventListener(`click`, function () {
      if (header.classList.contains(`page-header--menu-opened`)) {
        header.classList.remove(`page-header--menu-opened`);
        document.body.classList.remove(`menu-opened`);
      } else {
        header.classList.add(`page-header--menu-opened`);
        document.body.classList.add(`menu-opened`);
      }
    });
  }

  for (let i = 0; i < menuLinks.length; i++) {
    menuLinks[i].addEventListener(`click`, function () {
      if (window.innerWidth < 1025) {
        header.classList.remove(`page-header--menu-opened`);
        document.body.classList.remove(`menu-opened`);
      }
    });
  }

  const animationTopScreenTextLine = new AccentTypographyBuild(`.intro__title`, 1700, `active`, `transform`, [[90, 70, 0, 70, 85, 70, 0, 150, 70, 0, 70, 0], [263, 224, 254, 196, 290, 253.5]]);
const animationTopScreenTextLineHistory = new AccentTypographyBuild(`.slider__item-title`, 1700, `active`, `transform`, [[127, 84, 0, 70, 96, 72, 0]]);
const animationTopScreenTextLinePrize = new AccentTypographyBuild(`.prizes__title`, 1700, `active`, `transform`, [[127, 84, 10, 70, 96]]);
const animationTopScreenTextLineRules = new AccentTypographyBuild(`.rules__title`, 1700, `active`, `transform`, [[127, 84, 10, 70, 96, 96, 70]]);
const animationTopScreenTextLineGame = new AccentTypographyBuild(`.game__title`, 1700, `active`, `transform`, [[127, 84, 10, 10]]);


setTimeout(() => {
    animationTopScreenTextLine.destroyAnimation();
    animationTopScreenTextLine.runAnimation();

    animationTopScreenTextLineHistory.destroyAnimation()
    animationTopScreenTextLineHistory.runAnimation();

    animationTopScreenTextLineGame.destroyAnimation()
    animationTopScreenTextLineGame.runAnimation();
}, 500);

setTimeout(() => {
    animationTopScreenTextLineGame.destroyAnimation()
    animationTopScreenTextLineGame.runAnimation();
}, 100);

setTimeout(() => {
    animationTopScreenTextLineRules.destroyAnimation();
    animationTopScreenTextLineRules.runAnimation();
});

setTimeout(() => {
    animationTopScreenTextLinePrize.destroyAnimation();
    animationTopScreenTextLinePrize.runAnimation();
}, 1100);

document.querySelectorAll('.js-menu-link').forEach(item => {
    item.addEventListener('click', (event) => {
        switch (event.target.dataset.href) {
            case 'prizes':
                animationTopScreenTextLinePrize.destroyAnimation();
                setTimeout(() => {
                    animationTopScreenTextLinePrize.runAnimation();
                }, 1100);
                break;
            case 'story':
                animationTopScreenTextLineHistory.destroyAnimation()
                setTimeout(() => {
                    animationTopScreenTextLineHistory.runAnimation();
                }, 500);
                break;
            case 'top':
                animationTopScreenTextLine.destroyAnimation();
                setTimeout(() => {
                    animationTopScreenTextLine.runAnimation();
                }, 500);
                break;
            case 'rules':
                animationTopScreenTextLineRules.destroyAnimation();
                setTimeout(() => {
                    animationTopScreenTextLineRules.runAnimation();
                });
                break;
                case 'game':
                    animationTopScreenTextLineGame.destroyAnimation();
                    setTimeout(() => {
                        animationTopScreenTextLineGame.runAnimation();
                    }, 200);
                    break;    
        }

    })
})

};


