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
    }
    //=========count basket =============
  }
  addEventListener("click", clickActions)

  //======================page load================

  function getTotalSumBasket() {}
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
