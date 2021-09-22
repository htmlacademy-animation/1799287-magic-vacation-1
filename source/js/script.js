// modules
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import FullPageScroll from './modules/full-page-scroll';
import load from './modules/load';

// init modules
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();
load();

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();

let prizeFooter = document.querySelector('.screen__footer_prize')
let rulesFooter = document.querySelector('.disclaimer')
    let previousTab = ''
    document.body.addEventListener(`screenChanged`, (event)=>{
        document.body.classList.remove('blue', 'dark-blue', 'violet')

            if (event.detail.screenName ==`story`){
                document.body.classList.add('violet')
            }
            rulesFooter.style.color='#fff';
            if (event.detail.screenName ==`rules` ) {
                setTimeout(()=>{
                rulesFooter.style.color='rgba(95, 69, 140, 1)';
                },500)
            }else{
                setTimeout(()=>{
                    rulesFooter.style.color='rgba(95, 69, 140, 1)';
                    setTimeout(()=>{
                rulesFooter.style.color='#fff';
            },200)
            },)
            }
      if (event.detail.screenName ==`prizes` && previousTab == 'rules') {
        prizeFooter.style.color='rgba(95, 69, 140, 0)';
        setTimeout(()=>{
            prizeFooter.style.color='rgba(95, 69, 140, 1)';
        }, 200)
        prizeFooter.classList.remove('screen__footer_up')
        previousTab = event.detail.screenName
      }
      else if (event.detail.screenName ==`rules` && previousTab == 'prizes') {
        prizeFooter.classList.remove('screen__footer_up')
        prizeFooter.style.color='rgba(95, 69, 140, 0)';        
        setTimeout(()=>{
            prizeFooter.style.color='rgba(95, 69, 140, 1)';
        }, 600)
      
      previousTab = event.detail.screenName
    }
      else{
        prizeFooter.classList.add('screen__footer_up')
        previousTab = event.detail.screenName
      }
    })