"usestrict"
function windowLoaded() {
  //===================================
  function clickActions(e) {
    const el = e.target
    // el.closest(".header__burger")
  }
  addEventListener("click", clickActions)

  //===========================================================

  function handleScreenChange(e) {}

  handleScreenChange()
  window.addEventListener("resize", handleScreenChange)
  //===========================================================
}
addEventListener("load", windowLoaded)
