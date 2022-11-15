function loadJS() {
  /** variable chargé
   * object {
   * color:string
   * }
   */

  let is = document.querySelector("#is-js-loaded");
  console.log("is=" + is);
  is.style.color = "orange";
  is.style.backgroundColor = "blue";
  is.style.textDecoration = "underline blue";
  is.remove();
  document.querySelector("header").append(is);
  document.querySelector("#create").addEventListener("click", create);
  document.querySelector("#thumbnail").addEventListener("click", thumbnail);
  document.querySelector("#home").addEventListener("click", home);
}
/**
 * 
 * @param {*} evt 
 */
function setActiveLink(evt) {
  let tous = document.querySelectorAll("nav > .navbar li");
  console.log(JSON.stringify(tous));
  tous.forEach((t) => {
    console.log("T="+t);
    t.classList.remove("active")
  });
  evt.path[1].classList.add("active");
}
/**
 *
 * @param {*} evt
 */
function create(evt) {
  evt.preventDefault();
  console.log(evt);
  // alert("create");
  setActiveLink(evt);
}
/**
 *
 * @param {*} evt
 */
function thumbnail(evt) {
  evt.preventDefault();
  console.log(evt);
  // alert("thumbnail");
  setActiveLink(evt);
}
/**
 *
 * @param {*} evt
 */
function home(evt) {
  evt.preventDefault();
  console.log(evt);
  // alert("home");
  setActiveLink(evt);
}
document.addEventListener("DOMContentLoaded", loadJS);
//loadJS();
