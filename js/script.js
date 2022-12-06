/* -------------------- cookie -------------------- */
let cookie = document.querySelector('.cookie');
document.querySelector('.sub').addEventListener( "click" , () => {
  cookie.classList.add('is-close');
});
document.querySelector('.against').addEventListener( "click" , () => {
  cookie.classList.add('is-close');
});

/* -------------------- slider for blocks -------------------- */
let slider = document.querySelector(".slider"),
  sliderList = slider.querySelector(".slider__list"),
  sliderTrack = slider.querySelector(".slider__track"),
  slides = slider.querySelectorAll(".slide"),
  slideWidth = slides[0].offsetWidth,
  slideIndex = 0,
  posInit = 0,
  posX1 = 0,
  posX2 = 0,
  posY1 = 0,
  posY2 = 0,
  posFinal = 0,
  isSwipe = false,
  isScroll = false,
  allowSwipe = true,
  transition = true,
  nextTrf = 0,
  prevTrf = 0,
  lastTrf = --slides.length * slideWidth,
  posThreshold = slides[0].offsetWidth * 0.35,
  trfRegExp = /([-0-9.]+(?=px))/,
  swipeStartTime,
  swipeEndTime,
  getEvent = function () {
    return event.type.search("touch") !== -1 ? event.touches[0] : event;
  },
  slide = function () {
    if (transition) {
      sliderTrack.style.transition = "transform .5s";
    }
    sliderTrack.style.transform = `translate3d(-${
      slideIndex * slideWidth
    }px, 0px, 0px)`;
  },
  swipeStart = function () {
    let evt = getEvent();

    if (allowSwipe) {
      swipeStartTime = Date.now();

      transition = true;

      nextTrf = (slideIndex + 1) * -slideWidth;
      prevTrf = (slideIndex - 1) * -slideWidth;

      posInit = posX1 = evt.clientX;
      posY1 = evt.clientY;

      sliderTrack.style.transition = "";

      document.addEventListener("touchmove", swipeAction);
      document.addEventListener("mousemove", swipeAction);
      document.addEventListener("touchend", swipeEnd);
      document.addEventListener("mouseup", swipeEnd);

      sliderList.classList.remove("grab");
      sliderList.classList.add("grabbing");
    }
  },
  swipeAction = function () {
    let evt = getEvent(),
      style = sliderTrack.style.transform,
      transform = +style.match(trfRegExp)[0];

    posX2 = posX1 - evt.clientX;
    posX1 = evt.clientX;

    posY2 = posY1 - evt.clientY;
    posY1 = evt.clientY;

    if (!isSwipe && !isScroll) {
      let posY = Math.abs(posY2);
      if (posY > 7 || posX2 === 0) {
        isScroll = true;
        allowSwipe = false;
      } else if (posY < 7) {
        isSwipe = true;
      }
    }

    if (isSwipe) {
      if (slideIndex === 0) {
        if (posInit < posX1) {
          setTransform(transform, 0);
          return;
        } else {
          allowSwipe = true;
        }
      }

      // Р·Р°РїСЂРµС‚ СѓС…РѕРґР° РІРїСЂР°РІРѕ РЅР° РїРѕСЃР»РµРґРЅРµРј СЃР»Р°Р№РґРµ
      if (slideIndex === --slides.length) {
        if (posInit > posX1) {
          setTransform(transform, lastTrf);
          return;
        } else {
          allowSwipe = true;
        }
      }

      if (
        (posInit > posX1 && transform < nextTrf) ||
        (posInit < posX1 && transform > prevTrf)
      ) {
        reachEdge();
        return;
      }

      sliderTrack.style.transform = `translate3d(${
        transform - posX2
      }px, 0px, 0px)`;
    }
  },
  swipeEnd = function () {
    posFinal = posInit - posX1;

    isScroll = false;
    isSwipe = false;

    document.removeEventListener("touchmove", swipeAction);
    document.removeEventListener("mousemove", swipeAction);
    document.removeEventListener("touchend", swipeEnd);
    document.removeEventListener("mouseup", swipeEnd);

    sliderList.classList.add("grab");
    sliderList.classList.remove("grabbing");

    if (allowSwipe) {
      swipeEndTime = Date.now();
      if (
        Math.abs(posFinal) > posThreshold ||
        swipeEndTime - swipeStartTime < 300
      ) {
        if (posInit < posX1) {
          slideIndex--;
        } else if (posInit > posX1) {
          slideIndex++;
        }
      }

      if (posInit !== posX1) {
        allowSwipe = false;
        slide();
      } else {
        allowSwipe = true;
      }
    } else {
      allowSwipe = true;
    }
  },
  setTransform = function (transform, comapreTransform) {
    if (transform >= comapreTransform) {
      if (transform > comapreTransform) {
        sliderTrack.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`;
      }
    }
    allowSwipe = false;
  },
  reachEdge = function () {
    transition = false;
    swipeEnd();
    allowSwipe = true;
  };

sliderTrack.style.transform = "translate3d(0px, 0px, 0px)";
sliderList.classList.add("grab");

sliderTrack.addEventListener("transitionend", () => (allowSwipe = true));
slider.addEventListener("touchstart", swipeStart);
slider.addEventListener("mousedown", swipeStart);

/* -------------------- spoilers -------------------- */
let spoilerBig = document.querySelectorAll('.spoilers-item__big');
let spoilerBtn = document.querySelectorAll('.isshow');
let spoilerBtnClose = document.querySelectorAll('.isclose');
function spoilerShow() {
  spoilerBtn.forEach(e => {
    e.addEventListener( "click" , ({target}) => {
      target.closest('.spoilers-item').nextSibling.nextSibling.classList.add('is-show');
    });
  });
  spoilerBtnClose.forEach(e => {
    e.addEventListener( "click" , ({target}) => {
      target.closest('.spoilers-item__big').classList.remove('is-show');
    });
  })
};
let faqBtns = document.querySelectorAll('.istoggle');
faqBtns.forEach(e => {
    e.addEventListener( "click" , ({target}) => {
      target.classList.toggle('rotate');
      target.closest('.faq__item').nextSibling.nextSibling.classList.toggle('isfaqshow');
    });
});
spoilerShow()

/* -------------------- form -------------------- */
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector(".js-form");  
  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();
    
    let error = formValidate(form);

    let formData = new FormData(form);

    if(error === 0){
      let response = await fetch('sendemail.php',{
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        alert('Данные отправлены!');
        form.reset();
      } else {
        alert('Ошибка');
      }
    } else {
      alert('Заполните обязательные поля');
    }
  }

  function formValidate(form){
    let error = 0;
    let formReq = document.querySelectorAll('.req');

    for (let index = 0; index < formReq.length; index++){
      const input = formReq[index];
      formRemoveError(input);

      if(input.classList.contains('email')){
        if (emailTest(input)){
          formAddError(input);
          error ++;
        }
      } else if(input.classList.contains('phone')) {
        if (phoneTest(input)){
          formAddError(input);
          error ++;
        }
      } else if(input.getAttribute("type") === "checkbox" && input.checked === false) {
        formAddError(input);
        error++;
      } else {
        if (input.value === '') {
          formAddError(input);
          error ++;
        }
      }
    }
    return error;
  }

  function formAddError(input) {
    input.parentElement.classList.add('error');
    input.classList.add('error');
  }

  function formRemoveError(input) {
    input.parentElement.classList.remove('error');
    input.classList.remove('error');
  }
/*--------------------- Validate -------------------- */
  function emailTest(input) {
    return !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(input.value);
  }
  
  function phoneTest(input) {
    return !/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(input.value);
  }
});

/*--------------------- popup -------------------- */
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');
const headerNone = document.querySelector('.header');

let unlock = true;

const timeout = 500;

let widgets = [
  '<script id="cac20debfed4474149ef2a16543e3e7e4c634ca9" src="https://saikt.getcourse.ru/pl/lite/widget/script?id=775195"></script>', //standart
  '<script id="0f9e236938112bc5b6515eee439deecbb394b65a" src="https://saikt.getcourse.ru/pl/lite/widget/script?id=775201"></script>', //profi
  '<script id="5f8eaf4855e7a50943d12f58a8b5b87e39c8b354" src="https://saikt.getcourse.ru/pl/lite/widget/script?id=775202"></script>',
];

if (popupLinks.length > 0) {
  for(let index = 0; index < popupLinks.length; index++){
    const popupLink = popupLinks[index];
    popupLink.addEventListener('click', function (e) {
      const popupName = popupLink.getAttribute('href'). replace('#', '');
      document.getElementsByClassName('form__title')[0].innerHTML = `${e.target.dataset['label']}`;
      document.getElementsByClassName('form__text')[0].innerHTML = `${e.target.dataset['price']}`;
      for(let i=0; i<document.getElementsByClassName('widget__form-item').length; i++){
         document.getElementsByClassName('widget__form-item')[i].classList.remove('widget__form--active');
      }
      if (e.target.dataset['label'] === 'Стандарт') {
        document.getElementsByClassName('widget__form--standard')[0].classList.toggle('widget__form--active')
        
      } else if (e.target.dataset['label'] === 'Профи') {
        document.getElementsByClassName('widget__form--profi')[0].classList.toggle('widget__form--active')
      } else if (e.target.dataset['label'] === 'Профи плюс') {
        document.getElementsByClassName('widget__form--plus')[0].classList.toggle('widget__form--active')
      } else if (e.target.dataset['label'] === 'Стандарт рассрочка') {
        document.getElementsByClassName('widget__form--inststandard')[0].classList.toggle('widget__form--active')
      } else if (e.target.dataset['label'] === 'Профи рассрочка') {
        document.getElementsByClassName('widget__form--instprofi')[0].classList.toggle('widget__form--active')
      } else {
        document.getElementsByClassName('widget__form--instplus')[0].classList.toggle('widget__form--active')
      }

      headerNone.classList.add('header__none');
      const curentPopup = document.getElementById(popupName);
      popupOpen(curentPopup);
      e.preventDefault();
    });
  }
}

const popupCloseIcon = document.querySelector('.close-popup');
if (popupCloseIcon.length > 0) {
  for(let index = 0; index = popupCloseIcon.length; index++){
    const el = popupCloseIcon[index];
    el.addEventListener('click', function (e) {
      popupClose(el.closest('.popup'));
      e.preventDefault();
    });
  }
}

function popupOpen(curentPopup) {
  if (curentPopup && unlock){
    const popupActive = document.querySelector('.popup.open');
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }
    curentPopup.classList.add('open');
    curentPopup.addEventListener('click', function (e){
      if (!e.target.closest('.popup__content')){
        popupClose(e.target.closest('.popup'));
      }
    });
  }
}

function popupClose (popupActive, doUnlock = true) {
  headerNone.classList.remove('header__none');
  if(unlock){
    popupActive.classList.remove('open');
    if (doUnlock) {
      bodyUnLock();
    }
  }
}

function bodyLock() {
  const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

  if(lockPadding.length > 0){
    for (let index = 0; index < lockPadding.length; index++){
      const el = lockPadding[index];
      el.style.paddingRight = lockPaddingValue;
    }
  }
  
  body.style.paddingRight = lockPaddingValue;
  body.classList.add('lock');

  unlock = false;
  setTimeout(function(){
    unlock = true;
  }, timeout);
}

function bodyUnLock() {
  setTimeout(function () {
    if(lockPadding.length > 0){
      for (let index = 0; index < lockPadding.length; index++){
        const el = lockPadding[index];
        el.style.paddingRight = '0px';
      }
    }
  
    body.style.paddingRight = '0px';
    body.classList.remove('lock');
  }, timeout);

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

document.addEventListener('keydown', function (e) {
  if (e.which === 27) {
    const popupActive = document.querySelector('.popup.open');
    popupClose(popupActive);
  }
});