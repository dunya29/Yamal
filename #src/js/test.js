/* const mapItem = document.querySelectorAll(".item-map")
const mainMapBullet = document.querySelectorAll(".main-map__bullets span")
let curItem = 0
let mapInterval
let mapTimeout
mainMapBullet.forEach((item,idx) => itemOnClick(item,idx))
mapItem.forEach((item,idx) => itemOnClick(item,idx))
function setActive(idx) {
  mapItem.forEach(el => {
    el.classList.remove("active")
  });
  mainMapBullet.forEach(el => {
    el.classList.remove("swiper-pagination-bullet-active")
  });
  mapItem[idx].classList.add("active")
  mainMapBullet[idx].classList.add("swiper-pagination-bullet-active")
  document.querySelector(".main-map__cols").style.transform = 'translate3d(-'+ (curItem * 100) + '%, 0, 0)'
}
function itemOnClick(item,idx) {
  item.addEventListener("click", () => {
    clearTimeout(mapTimeout)
    clearInterval(mapInterval)
    curItem = idx
    setActive(idx)
    mapTimeout = setTimeout(map, 3500);
    mapInterval = setInterval(map, 3500);
  })
}
function map() {
  setActive(curItem)
  if ( curItem < mapItem.length - 1 ) {
    curItem++
  } else {
    curItem = 0
  }
}
setTimeout(map, 3500);
mapInterval = setInterval(map, 3500); */