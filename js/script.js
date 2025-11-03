"usestrict"
function windowLoaded() {
  //===================================
  function clickActions(e) {
    const el = e.target
    //=========count basket =============
    if (
      el.closest(".body-basket-product__count-minus") ||
      el.closest(".body-basket-product__count-plus")
    ) {
      const currentEl = el.closest(".body-basket-product__block")
      const textCountEl = currentEl.querySelector(
        ".body-basket-product__count-text"
      )

      const minusCountEl = currentEl.querySelector(
        ".body-basket-product__count-minus"
      )
      const plusCountEl = currentEl.querySelector(
        ".body-basket-product__count-plus"
      )
      let getNumberText = parseInt(textCountEl.textContent)
      if (el.closest(".body-basket-product__count-minus")) {
        if (getNumberText === 1) {
          currentEl.remove()
        }
        textCountEl.textContent = getNumberText - 1
      } else textCountEl.textContent = getNumberText + 1
      countElementBasket()
      if (document.querySelectorAll(".body-basket-product__block").length) {
        getTotalSumBasket()
      }
    }
    //=============== choose menu===============
    if (el.closest(".menu__item")) {
      const currentEl = el.closest(".menu__item")
      const itemElements = document.querySelectorAll(".menu__item")
      itemElements.forEach((el) => el.classList.remove("active"))
      currentEl.classList.add("active")

      const titleBodyMenu = document.querySelector(".main-product__title")
      titleBodyMenu.textContent = currentEl.textContent
    }

    //=========basket open-close =============
    if (
      document.querySelectorAll(".body-basket-product__block").length &&
      window.innerWidth < 991.98
    ) {
      const basketWrapperEl = document.querySelector(".basket-product__wrapper")

      const basketBottomEl = document.querySelector(".basket-product__bottom")
      const basketBodyEl = document.querySelector(".basket-product__body")
      //=========basket open =============

      if (el.closest(".bottom-basket-product__delivery-close")) {
        //=========basket close =============
        basketWrapperEl.classList.remove("active")

        basketBottomEl.classList.remove("active")
        basketBodyEl.classList.remove("active")
      } else if (el.closest(".basket-product")) {
        basketWrapperEl.classList.add("active")

        basketBottomEl.classList.add("active")
        basketBodyEl.classList.add("active")
      }
    }
    //========= add product in basket =============

    if (el.closest(".block-main-product__button-add")) {
      const currentEl = el.closest(".block-main-product")
      const elementsBasket = document.querySelectorAll(
        ".body-basket-product__block"
      )
      const currentTitle = currentEl.querySelector(
        ".block-main-product__info"
      ).textContent

      let createNewElBasket = true
      elementsBasket.forEach((el) => {
        const basketTitleEl = el.querySelector(
          ".body-basket-product__info-title"
        ).textContent
        if (currentTitle === basketTitleEl) {
          createNewElBasket = false

          const basketCountEl = el.querySelector(
            ".body-basket-product__count-text"
          )

          const numberBasketCountEl = parseInt(basketCountEl.textContent)
          basketCountEl.textContent = numberBasketCountEl + 1
        }
      })

      if (createNewElBasket) {
        const currentSrc = currentEl
          .querySelector(".block-main-product__image img")
          .getAttribute("src")

        const currentPrice = currentEl.querySelector(
          ".block-main-product__price"
        ).textContent
        const currentWeight = currentEl.querySelector(
          ".block-main-product__weight"
        ).textContent

        const newEl = `
          <div class="body-basket-product__block">
                  <div class="body-basket-product__image"><img src="${currentSrc}" alt=""></div>
                  <div class="body-basket-product__info ">
                    <div class="body-basket-product__info-title">${currentTitle}</div>
                    <div class="body-basket-product__info-weight">${currentWeight}</div>
                    <div class="body-basket-product__info-price">${currentPrice}</div>
                  </div>
                  <div class="body-basket-product__count">
                    <div class="body-basket-product__count-minus">-</div>
                    <div class="body-basket-product__count-text">1</div>
                    <div class="body-basket-product__count-plus">+</div>
                  </div>
                </div>
                `

        if (!document.querySelector(".body-basket-product")) {
          const rowElBasket = document.querySelector(".basket-product__wrapper")
          const createBasketBodyBottom = `
          <div class="basket-product__body body-basket-product">
          
          </div>
          <div class="basket-product__bottom bottom-basket-product">
          <div class="bottom-basket-product__total">
          <span class="bottom-basket-product__total-text">Итого</span>
          <span class="bottom-basket-product__total-sum">1279грн</span>
          </div>
          <button class="bottom-basket-product__button">Оформить заказ</button>
          <div class="bottom-basket-product__delivery">
          <img class="bottom-basket-product__delivery-image" src="./images/icon-delivery.svg"
          alt="icon delivery">
          <span class="bottom-basket-product__delivery-text">Бесплатная доставка</span>
          <span class="bottom-basket-product__delivery-close">Закрити</span>
          </div>
          </div>
          `
          console.log(rowElBasket)
          rowElBasket.insertAdjacentHTML("beforeend", createBasketBodyBottom)
          const infoTextBasked = document.querySelector(
            ".top-basket-product__border"
          )
          infoTextBasked.classList.remove("active")
          infoTextBasked.textContent = ""
        }
        const wrapperElements = document.querySelector(".body-basket-product")

        wrapperElements.innerHTML += newEl
        createNewElBasket = true
        countElementBasket()
      }
    }
  }
  addEventListener("click", clickActions)

  //======================page load================

  function getTotalSumBasket() {
    const basketElements = document.querySelectorAll(
      ".body-basket-product__block"
    )
    let totalSum = 0
    basketElements.forEach((el) => {
      const countEl = parseInt(
        el.querySelector(".body-basket-product__count-text").textContent
      )
      const priceEl = parseInt(
        el.querySelector(".body-basket-product__info-price").textContent
      )
      totalSum += countEl * priceEl
    })

    const totalSumEl = document.querySelector(
      ".bottom-basket-product__total-sum"
    )

    totalSumEl.textContent = `${totalSum}грн`
  }
  if (document.querySelectorAll(".body-basket-product__block").length) {
    getTotalSumBasket()
  }
  function countElementBasket() {
    const basketCount = document.querySelector(".top-basket-product__count")
    const basketElements = document.querySelectorAll(
      ".body-basket-product__block"
    )
    const borderEl = document.querySelector(".top-basket-product__border")

    basketCount.textContent = basketElements.length
    if (basketElements.length === 0) {
      document.querySelector(".basket-product__body").remove()
      document.querySelector(".basket-product__bottom").remove()
      borderEl.classList.add("active")
      borderEl.textContent = "Тут поки пусто :("
    } else borderEl.classList.remove("active")
  }
  countElementBasket()
  //===========================================================

  function handleScreenChange(e) {}

  handleScreenChange()
  window.addEventListener("resize", handleScreenChange)
  //===========================================================
}
addEventListener("load", windowLoaded)
