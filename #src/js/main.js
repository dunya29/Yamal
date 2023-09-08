const header = document.querySelector('.header')
const mainHeader = document.querySelector('.main-header')
const iconMenu = document.querySelector('.icon-menu')
const fixedBlocks = document.querySelectorAll(".fixed-block")
const modalShowBtn = document.querySelectorAll(".modal-show-btn")
const modal = document.querySelectorAll(".modal")
const successModal = document.querySelector("#success-modal")
const errorModal = document.querySelector("#error-modal")
const overlay = document.querySelector(".overlay")
const customSelect = document.querySelectorAll(".select-custom")
let paddingValue = window.innerWidth > 325 ? window.innerWidth - document.documentElement.clientWidth + 'px' : 0
let animSpd = 500
function windoOnResize() {
  paddingValue = window.innerWidth > 325 ? window.innerWidth - document.documentElement.clientWidth + 'px' : 0
}
window.addEventListener("resize", windoOnResize)
window.addEventListener('orientationchange', windoOnResize);
//enable scroll
function enableScroll() {
  if (fixedBlocks) {
    fixedBlocks.forEach(block => block.style.paddingRight = '0px')
  }
  document.body.style.paddingRight = '0px'
  document.body.classList.remove("no-scroll")
}
//disable scroll
function disableScroll() {
  if (fixedBlocks) {
    fixedBlocks.forEach(block => block.style.paddingRight = paddingValue)
  }
  document.body.style.paddingRight = paddingValue
  document.body.classList.add("no-scroll");
}
//swhitch tab
function tabSwitch(nav,block) {
  nav.forEach((item,idx) => {
    item.addEventListener("click", () => {
      let href = item.getAttribute("data-nav")
      nav.forEach(el => {
        el.classList.remove("active")
      })
      block.forEach(el => {
        el.classList.remove("active")
      })
      item.classList.add("active")
      block[idx].classList.add("active")
      item.style.opacity = "0"
        block[idx].style.opacity = "0"
      setTimeout(() => {
        item.style.opacity = "1"
        block[idx].style.opacity = "1"
      }, 0);
    })
  });
}
function resetBtnVisible(form) {
  const resetBtn = form.querySelector(".icon-close")
  resetBtn.style.opacity = "0.5"
  resetBtn.style.pointerEvents = "auto"
}
function resetBtnHidden(form) {
  const resetBtn = form.querySelector(".icon-close")
  resetBtn.style.opacity = "0"
  resetBtn.style.pointerEvents = "none"
}
//mask input
function maskInput() {
  const inp = document.querySelectorAll('input[type=tel]')
  if (inp) {
    inp.forEach(item => {
      Inputmask({ "mask": "+7 999 999-99-99" }).mask(item);
    })
  }
}
maskInput()
//show modal
function openModal(modal) {
  if (!header.classList.contains("open")) {
    disableScroll()
  }
  modal.classList.add("open")
}
// unshow modal
function closeModal(modal) {
  modal.classList.remove("open")
  setTimeout(() => {
    if (!header.classList.contains("open")) {
      enableScroll()
    }
  }, 300);
}
//searchFormSuccess
function searchFormSuccess(form) {
  form.querySelector("input").value = ""
  resetBtnHidden(form)
}
// formSuccess
function formSuccess(form) {
  form.querySelectorAll(".form__item").forEach(item => item.classList.remove("error"))
  form.querySelectorAll("input").forEach(inp => {
    if (inp.type != "hidden") {
      inp.value = ""
      if (!inp.classList.contains("required")) {
        inp.checked = false
      }
      
    }
  })
  if (form.querySelector(".select-custom")) {
    form.querySelectorAll(".select-custom").forEach(select => {
      let spanTxt = select.getAttribute("data-select")
      select.querySelector(".select-custom__selected span").textContent = spanTxt
      select.classList.remove("selected")
      select.querySelectorAll(".select-custom__option").forEach(el => el.classList.remove("selected"))
    })
  }
  if (form.querySelector("textarea")) {
    form.querySelector("textarea").value = ""
  }
  if (form.querySelector(".file-form__item")) {
    form.querySelector(".file-form__items").innerHTML = ""
  }
  if (form.querySelector(".vac-extra")) {
    form.querySelector(".vac-extra").classList.remove("open")
  }
  let modal = document.querySelector(".modal.open")
  if (modal) {
    modal.classList.remove("open")
  }
  openModal(successModal)
}
//smoothdrop
function smoothDrop(header, body) {
  if (!header.classList.contains("active")) {
    body.style.height = 'auto';
    let height = body.clientHeight + 'px';
    body.style.height = '0px';
    setTimeout(function () {
      body.style.height = height;
    }, 0);
  } else {
    body.style.height = '0px';
  }
  header.classList.toggle("active")
}

//open custom select
function openSelectCustom(select) {
  select.classList.add("open");
  select.style.zIndex = 5
  select.setAttribute("aria-expanded", true);
  select.querySelectorAll(".select-custom__option").forEach(item => {
    item.addEventListener("click", (e) => {
      setActiveOption(item, select)
    });
  });
  document.addEventListener("click", function clickOutside(e) {
    if (!select.contains(e.target)) {
      closeSelectCustom(select)
      document.removeEventListener('click', clickOutside);
    }
  });
}
// set active select option
function setActiveOption(option,select) {
  select.querySelectorAll(".select-custom__option").forEach(el => el.classList.remove("selected"))
  option.classList.add("selected");
  select.querySelector(".select-custom__selected span").textContent = option.textContent;
  select.classList.add("selected")
  closeSelectCustom(select);
}
//close custom select
function closeSelectCustom(select) {
  select.classList.remove("open");
  setTimeout(() => {
    if (!select.classList.contains("open")) {
      select.style.zIndex = 4
    }
  }, animSpd);
  select.setAttribute("aria-expanded", false);
}
//form button disable
function formBtnDisable(form) {
  form.querySelector("button[type=submit]").classList.add("disabled")
}
//form button enable
function formBtnEnable(form) {
  form.querySelector("button[type=submit]").classList.remove("disabled")
}
//drop menu
iconMenu.addEventListener("click", () => {
  if (header.classList.contains("open")) {
    header.classList.remove("open")
    iconMenu.setAttribute('aria-label', 'Открыть меню');
    enableScroll()
  } else {
    header.classList.add("open")
    iconMenu.setAttribute('aria-label', 'Закрыть меню');
    disableScroll()
  }
})
document.querySelectorAll(".menu__header").forEach(item => {
  item.addEventListener('click', e => {
    if (item.classList.contains("has-subnavs") && window.innerWidth <= 992) {      
      e.preventDefault()
      document.querySelectorAll(".menu__header").forEach(el => {
        if (el.classList.contains("has-subnavs") && !el.classList.contains("active")) {
           el.classList.remove("active")
           el.parentNode.querySelector(".menu__subnavs").style.height = "0px"
        }
      })
      smoothDrop(item, item.parentNode.querySelector(".menu__subnavs"))
    }
  } )
})
//fixed header
window.addEventListener("scroll", () => {
  let windowTop = window.pageYOffset || document.documentElement.scrollTop
  if (windowTop > 1) {
    header.classList.add("scrolled")
    if (mainHeader) {
      mainHeader.classList.remove("header--dark")
    }
  } else {
    header.classList.remove("scrolled")
    if (mainHeader) {
      mainHeader.classList.add("header--dark")
    }
  }
})
//show/unshow search-form
const searchToggle = document.querySelector(".search-toggle")
const searchClose = document.querySelector(".search__top .icon-close")
searchToggle.addEventListener("click", () => {
  document.querySelector(".header__search").classList.add("show")
  disableScroll()
  overlay.classList.add("show")
  header.classList.remove("open")
  iconMenu.setAttribute('aria-label', 'Открыть меню');
})
searchClose.addEventListener("click", () => {
 document.querySelector(".header__search").classList.remove("show")
  overlay.classList.remove("show")
  setTimeout(() => {
    if (!header.classList.contains("open")) {
      enableScroll()
    }
  }, animSpd); 
})
overlay.addEventListener("click", () => {
  searchClose.click()
})
// form btn disabled
const form = document.querySelectorAll(".form")
if (form) {
  form.forEach(item => {
    item.querySelector(".required").addEventListener("change", e => {
      if (e.target.checked) {
        formBtnEnable(item)
      } else {
        formBtnDisable(item)
      }
    })
  })
}
// search-form reset btn show/unshow
const searchForm = document.querySelectorAll(".search-form")
searchForm.forEach(form => {
  form.querySelector('input').addEventListener("input", () => {
    if (form.querySelector('input').value.length > 0) {
      resetBtnVisible(form)
    } else {
      resetBtnHidden(form)
    }
  })
  form.querySelector(".icon-close").addEventListener("click",()=> resetBtnHidden(form))
})
//file-form
document.querySelectorAll(".file-form").forEach(item => {
  item.querySelector("input").addEventListener("change", e => {
    let files = e.target.files
    for (let i = 0; i < files.length; i++) {
      let file = files[i]
      item.querySelector(".file-form__items").innerHTML = `<div class="file-form__item">
      <span class="file-form__name">${file.name} ${file.size}KB</span>
      <span class="file-form__del"><svg><use xlink:href="img/icons/sprite.svg#del"></use></svg></span>
      </div>
  `
    }
  })
  item.addEventListener("click", e => {
    const del = item.querySelector(".file-form__del")
    if (del && del.contains(e.target)) {
      item.querySelector("input").value = ""
      setTimeout(() => {
         item.querySelector(".file-form__items").innerHTML = ""
      }, 0);
     
    }
  }) 
})
// vacancy extra items
const vacMod = document.querySelector("#vac-modal")
if (vacMod) {
  let location = document.querySelector(".vacancy__info").getAttribute("data-location")
  let position = document.querySelector(".vacancy__info").getAttribute("data-pos")
  const locSelect = document.querySelector(".select-custom.location")
  const posSelect = document.querySelector(".select-custom.position")
  if (locSelect) {
    setActiveOption(locSelect.querySelector(`[data-location="${location}"]`),locSelect)
  } 
  if (posSelect) {
    setActiveOption(posSelect.querySelector(`[data-pos="${position}"]`),posSelect)
  }
  vacMod.querySelector(".cv-btn").addEventListener("change", () => {
    if (vacMod.querySelector(".cv-btn").checked) {
      vacMod.querySelector(".vac-extra").classList.add("open")
      maskInput()
      document.querySelectorAll(".vac-extra__col").forEach(item => {
        if( item.querySelector(".vac-extra__btn")) {
          item.querySelector(".vac-extra__btn").addEventListener("click", () => {
            item.querySelector(".vac-extra__items").innerHTML += `<div class="vac-extra__item">${item.querySelector(".vac-extra__item").innerHTML}</div>`
            if (item.classList.contains("edu") && item.querySelectorAll(".vac-extra__item").length >= 5) {
              item.querySelector(".vac-extra__btn").classList.add("disabled")
            }
            if (item.classList.contains("exp") && item.querySelectorAll(".vac-extra__item").length >= 10) {
              item.querySelector(".vac-extra__btn").classList.add("disabled")
            }
          })
        }
      })
    } else {
      vacMod.querySelector(".vac-extra").classList.remove("open")
    }
  })
  document.querySelectorAll(".vac-extra__item--switch").forEach(item => {
    item.querySelector("input").addEventListener("change", e => {
      if (e.target.checked) {
        item.querySelector(".item-form--hidden").style.display = "block"
      } else {
        item.querySelector(".item-form--hidden").style.display = "none"
      }
    })
  })
}
//play video
if (document.querySelector(".item-card--video")) {
  const cardVideo = document.querySelector(".item-card--video")
  window.addEventListener("scroll", () => {
    if (cardVideo.getBoundingClientRect().bottom - window.innerHeight < 0 ) {
      console.log(cardVideo.querySelector("video").autoplay)
      cardVideo.querySelector("video").play()
      cardVideo.querySelector("video").autoplay = true
    }
  })
}
// custom select open/close
if (customSelect) { 
  customSelect.forEach(select => {
    select.querySelector(".select-custom__selected").addEventListener("click", () => {
      if (!select.classList.contains("open")) {
        openSelectCustom(select)
      } else {
        closeSelectCustom(select)
      }
    })
  })
  
}
//show/unshow page-nav__subnavs
const navSelect = document.querySelector(".page-nav--select")
const navSelectItem = navSelect?.querySelector(".page-nav__item.active")
if (navSelect && navSelectItem) {
  function setSelectedTxt() {
    let activeLink = navSelectItem.querySelector(".page-nav__subnavs li a.active")
    if (activeLink) {
      navSelectItem.querySelector(".page-nav__link span").textContent = activeLink.textContent;
    }
  }
  if (window.innerWidth <= 992) {
    setSelectedTxt()
  }
  window.addEventListener("resize", () => {
    if (window.innerWidth > 992) {
      navSelectItem.querySelector(".page-nav__link span").textContent = navSelectItem.getAttribute("data-select");
    } else {
      setSelectedTxt()
    }
  })
  navSelectItem.querySelector(".page-nav__link").addEventListener("click", e => {
    e.preventDefault()
    if (navSelectItem.classList.contains("open")) {
      closeSelectCustom(navSelectItem)
    } else {
      navSelectItem.style.zIndex = 5
      navSelectItem.classList.add("open")
      document.addEventListener("click", function clickOutside(e) {
        if (!navSelectItem.contains(e.target)) {
          closeSelectCustom(navSelectItem)
          document.removeEventListener('click', clickOutside);
        }
      });
    }
  })
}
// modal button on click
modalShowBtn.forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault()
    let href = btn.getAttribute("data-modal")
    openModal(document.getElementById(href))
  })
})
// unshow modal when clicked outside || close-btn
modal.forEach(mod => {
  mod.addEventListener("click", e => {
    if (!mod.querySelector(".modal__content").contains(e.target) || mod.querySelector(".modal__close").contains(e.target)) {
      closeModal(mod)
    }
  })
})
//employees tabswitch
const empNavs = document.querySelectorAll(".employees [data-nav]")
const empBlocks = document.querySelectorAll(".employees [data-block]")
if (document.querySelector(".employees")) {
  tabSwitch(empNavs, empBlocks)
}
//item-employees progress bar
if (document.querySelector(".item-employees")) {
  document.querySelectorAll(".item-employees__det").forEach(item => {
    if (item.querySelector(".item-employees__bar")) {
      item.querySelector(".item-employees__bar span").style.width = item.querySelector(".item-employees__perc").textContent
    }
  })
}
// share
if (document.querySelector(".share")) {
  const url = encodeURIComponent(window.location.href)
  const title = encodeURIComponent(document.title);
  let shareList = [
    {
      title: "VK",
      href: "https://vk.com/share.php?url=" + url + "&title=" + title,
      img: "<svg><use xlink:href='img/icons/sprite.svg#vk'></use></svg>"
    },
    {
      title: "Одноклассники",
      href: "https://connect.ok.ru/offer?url=" + url + "&title=" + title,
      img: "<svg><use xlink:href='img/icons/sprite.svg#ok'></use></svg>"
    },
    {
      title: "Телеграм",
      href: "https://t.me/share/url?url=" + url + "&text=" + title,
      img: "<svg><use xlink:href='img/icons/sprite.svg#telegram'></use></svg>"
    },
    {
      title: "Viber",
      href: "viber://forward?text=" + url,
      img: "<svg><use xlink:href='img/icons/sprite.svg#viber'></use></svg>"
    },
    {
      title: "Twitter",
      href: "https://twitter.com/intent/tweet?text=" + encodeURIComponent(document.title + " " + window.location.href),
      img: "<svg><use xlink:href='img/icons/sprite.svg#twitter'></use></svg>"
    }    
  ];
  document.querySelector(".share__list").insertAdjacentHTML("beforeend", `
    ${shareList.map((e=>`<li><a class="share__link" href="${e.href}" target="_blank" rel="noopener">
     ${e.img}
    </a></li>`)).join("")}`)
}
//page-gallery
const pageGal = document.querySelector(".page-gallery")
if (pageGal) {
  if (pageGal.querySelectorAll(".media-cover").length > 8 ) {
    pageGal.classList.add("extra")
  }
}
//page-swipers
if (document.querySelector(".page-swipers")) {
  document.querySelectorAll(".page-swipers").forEach(swiper => {
    const  swiperBtn = swiper.querySelector(".swiper-onwards-btn")
    const thumbSwiper = new Swiper(swiper.querySelector(".thumbswiper"), {
      slidesPerView: 4.3,
      observer: true,
      observeParents: true,
      spaceBetween: 12,
      breakpoints: {
        1300.98: {
          slidesPerView: 3,
          spaceBetween: 20,
          direction: 'vertical',
        },
        992.98: {
          slidesPerView: 3,
          spaceBetween: 16,
          direction: 'vertical',
        },
        767.98: {
          slidesPerView: 4.14,
          spaceBetween: 12,
          direction: 'horizontal',
        }, 
      },
    })
    const mainSwiper = new Swiper(swiper.querySelector(".mainswiper"), {
      slidesPerView: 1,
      observer: true,
      observeParents: true,
      effect: 'fade',
      thumbs: {
        swiper: thumbSwiper,
      },
      speed: 500
    })
    if ( !thumbSwiper.isEnd ) {
      swiperBtn.classList.add("show")
    }
    mainSwiper.on("slideChange", () => {
      if (mainSwiper.realIndex + 1 === mainSwiper.slides.length) {
        swiperBtn.classList.remove("show")
      } else {
        swiperBtn.classList.add("show")
      } 
    })
    swiperBtn.addEventListener("click", () => {
      mainSwiper.slideTo(mainSwiper.realIndex + 1)
    })
  })
}
//main-map swiper
const mapItem = document.querySelectorAll(".item-map")
if (document.querySelector(".main-map")) {
  const mapSwiper = new Swiper(".main-map .swiper", {
    slidesPerView: 1,
    observer: true,
    observeParents: true,
    spaceBetween: 10,
    pagination: {
      el: '.main-map .swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    autoplay: {
      delay: 3500,
      disableOnInteraction: false	
    },
    loop: true,
    speed: 1000,
  })
  mapSwiper.on('slideChange', function () {
    mapItem.forEach(el => {
      el.classList.remove("active")
    });
    mapItem[mapSwiper.realIndex].classList.add("active")
  });
  mapItem.forEach((item,idx)=> {
    item.addEventListener("click", () => {
      mapSwiper.slideTo(idx + 1)
    })
  })
}
//news swiper
if (document.querySelector('.item-card--news')) {
  const newsSwiper = new Swiper(".item-card--news .swiper", {
    slidesPerView: 1,
    observer: true,
    observeParents: true,
    spaceBetween: 10,
    pagination: {
      el: '.item-card--news .swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    speed: 800,
  })
}
//team swiper
if (document.querySelector('.item-card--team')) {
  const newsSwiper = new Swiper(".item-card--team .swiper", {
    slidesPerView: 1,
    observer: true,
    observeParents: true,
    spaceBetween: 10,
    pagination: {
      el: '.item-card--team .swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    speed: 800,
  })
}
// peoject swiper
const projectSwipers = document.querySelector(".works-project__swipers")
if (projectSwipers) {
  const swiperBtn = projectSwipers.querySelector(".swiper-onwards-btn")
    const thumbSwiper = new Swiper(projectSwipers.querySelector(".thumbswiper"), {
      slidesPerView: 4.3,
      observer: true,
      observeParents: true,
      spaceBetween: 12,
      breakpoints: {
        1300.98: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        992.98: {
          slidesPerView: 3,
          spaceBetween: 16,
        },
        767.98: {
          slidesPerView: 4.14,
          spaceBetween: 12,
        },
      },
    })
    const mainSwiper = new Swiper(projectSwipers.querySelector(".mainswiper"), {
      slidesPerView: 1,
      observer: true,
      observeParents: true,
      effect: 'fade',
      thumbs: {
        swiper: thumbSwiper,
      },
      speed: 500
    })
    if ( !thumbSwiper.isEnd ) {
      swiperBtn.classList.add("show")
    }
    mainSwiper.on("slideChange", () => {
      if (mainSwiper.realIndex + 1 === mainSwiper.slides.length) {
        swiperBtn.classList.remove("show")
      } else {
        swiperBtn.classList.add("show")
      } 
    })
    swiperBtn.addEventListener("click", () => {
      mainSwiper.slideTo(mainSwiper.realIndex + 1)
    })
}
//  video-review swiper
if (document.querySelector(".video-reviews")) {
  const vidRewSwiper = new Swiper(".video-reviews .swiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    observer: true,
    observeParents: true,
    speed: 800,
    pagination: {
      el: '.video-reviews .swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      prevEl: ".video-reviews .swiper-btn--prev",
      nextEl: ".video-reviews .swiper-btn--next"
    },
    breakpoints: {
      992.98: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      767.98: {
        slidesPerView: 2,
        spaceBetween: 20,
      }, 
      520.98: {
        slidesPerView: 2,
        spaceBetween: 10,
      }, 
    },
  })
}
// text-review swiper
if (document.querySelector(".text-reviews")) {
  const vidRewSwiper = new Swiper(".text-reviews .swiper", {
    slidesPerView: 1,
    observer: true,
    observeParents: true,
    effect: "fade",
    pagination: {
      el: '.text-reviews .swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      prevEl: ".text-reviews .swiper-btn--prev",
      nextEl: ".text-reviews .swiper-btn--next"
    },
    loop: true,
    speed: 500
  })
}
//custom fancybox
const fancyItems = document.querySelectorAll("[data-fancy]")
fancyItems.forEach(item => {
  item.addEventListener("click", () => {
    let imgSrc = []
    let objectFit = item.getAttribute("data-fit") ? item.getAttribute("data-fit") : ""
    let val = item.getAttribute("data-fancy")
    fancyItems.forEach(el => {
      if (!el.closest(".swiper-slide-duplicate") && el.getAttribute("data-fancy") === val) {
        imgSrc.push(el.getAttribute("data-src"))
      }
    })
    let initialSl = imgSrc.indexOf(item.getAttribute("data-src"))
    document.querySelector("footer").insertAdjacentHTML('afterend', `
    <div class="modal fancy-modal"">
        <div class="modal__overlay">
           <div class="modal__content">
              <button class="modal__close" aria-label="Закрыть всплывающее окно"></button>
              <button class="btn swiper-btn swiper-btn--prev">
                  <svg><use xlink:href="img/icons/sprite.svg#chevron-left"></use></svg>
              </button>
              <button class="btn swiper-btn swiper-btn--next">
                <svg><use xlink:href="img/icons/sprite.svg#chevron-right"></use></svg>
              </button>
              <div class="swiper mainswiper">
                <div class="swiper-wrapper">
                   ${imgSrc.map(item => `<div class="swiper-slide">
                         <div class="swiper-img ${objectFit}">
                             <img src=${item} alt="">
                         </div>
                     </div>`).join("")}
                </div>
              </div>
              <div class="swiper thumbswiper">
                <div class="swiper-wrapper">
                   ${imgSrc.map(item => `<a class="swiper-slide">
                         <div class="swiper-img ${objectFit}">
                             <img src=${item} alt="">
                         </div>
                     </a>`).join("")}
                   </div>
              </div>
           </div>
        </div>
    </div>
  `);
    let fancyThumbSwiper = new Swiper(".fancy-modal .thumbswiper", {
      slidesPerView: 4.25,
      spaceBetween: 8,
      observer: true,
      observeParents: true,
      initialSlide: initialSl,
      breakpoints: {
        992.98: {
          slidesPerView: 10,
          spaceBetween: 0,
        },
        767.98: {
          slidesPerView: 7,
          spaceBetween: 0,
          grid: {
            rows: 2,
            fill: 'column'  
          },
        },
      },
    }) 
    let fancyMainSwiper = new Swiper(".fancy-modal .mainswiper", {
      slidesPerView: 1,
      slidesPerGroup: 1,
      observer: true,
      observeParents: true,
      initialSlide: initialSl,
      effect: "fade",
      thumbs: {
        swiper: fancyThumbSwiper,
      },
      navigation: {
        prevEl: ".fancy-modal .swiper-btn--prev",
        nextEl: ".fancy-modal .swiper-btn--next"
      }
    })
    const fancyModal = document.querySelector(".fancy-modal")
    openModal(fancyModal)
    fancyModal.addEventListener("click", e => {
      if (!fancyModal.querySelector(".modal__content").contains(e.target) || fancyModal.querySelector(".modal__close").contains(e.target)) {
        closeModal(fancyModal)
        setTimeout(() => {
          fancyModal.remove()
        }, animSpd);
      }
    })
  })

})

