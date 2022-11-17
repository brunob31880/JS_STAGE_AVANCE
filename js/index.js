function loadJS(evt) {
  /** variable chargé
   * object {
   * color:string
   * }
   */
    /*
  let is = document.querySelector("#is-js-loaded");
  console.log("is=" + is);
  is.style.color = "orange";
  is.style.backgroundColor = "blue";
  is.style.textDecoration = "underline blue";
  is.remove();
  document.querySelector("header").append(is);
  */
  setNavBarEvent();
  initRoutes(evt);
}

document.addEventListener("DOMContentLoaded", loadJS);
//loadJS();
