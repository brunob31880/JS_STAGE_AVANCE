function setNavBarEvent() {
  document.querySelector("#create").addEventListener("click", create);
  document.querySelector("#thumbnail").addEventListener("click", thumbnail);
  document.querySelector("#home").addEventListener("click", home);
}
/**
 * 
 * @param {*} evt 
 */
const initRoutes=(ev)=>{
  const path=location.pathname;
  if (path.startsWith('/thumbnails'))
  {
    thumbnail(ev);
  }
  else if (path.startsWith('/creator')){
    create(ev);
  }
  else {
    home(ev);
  }
}

/**
 *
 * @param {*} evt
 */
function setActiveLink(evt, setActiveparentli = true) {
  let tous = document.querySelectorAll("nav > .navbar li");
  console.log(JSON.stringify(tous));
  tous.forEach((t) => {
    // console.log("T=" + t);
    t.classList.remove("active");
  });
  if (setActiveparentli) { 
    const path=location.pathname;
    if(path.startsWith('/thumbnail'))
    {
        document.querySelector('nav #thumbnail').parentElement.classList.add('active');
    }
    else if(path.startsWith('/creator')){
        document.querySelector('nav #create').parentElement.classList.add('active');
    }

 }
}
/**
 *
 * @param {*} evt
 */
function create(evt, memeId) {
  evt.preventDefault();
  history.pushState('','meme create',undefined!==memeId?`/creator/${memeId}`:'/creator')
  // alert("create");
  setActiveLink(evt);
  loadpage("create.html", (nodebase) => {
    let form = nodebase.querySelector("form");
    form.addEventListener("submit", () => {});
  });
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
  const primages = fetch(`${REST_ADR}/images`).then((r) => r.json());
  const prmemes = fetch(`${REST_ADR}/memes`).then((r) => r.json());
  Promise.all([primages, prmemes]).then((arr) => {
    images = arr[0];
    memes = arr[1];
    loadpage("thumbnails.html", (container) => {
      var memeModelNode = container.querySelector("#meme-");
      memeModelNode.remove();
      memes.forEach((meme) => {
        const memeNode = memeModelNode.cloneNode(true);
        memeNode.id = `meme-${meme.id}`;

        const imageDuMeme = images.find((img) => img.id === meme.imageId);
        memeNode
          .querySelector("image")
          .setAttribute("xlink:href", "/images/" + imageDuMeme.href);
        const text = memeNode.querySelector("text");
        text.style.textDecoration = meme.underline ? "underline" : "none";
        text.style.fontStyle = meme.underline ? "italic" : "normal";
        text.style.fontWeight = meme.fontWeight;
        text.style.fontSize = meme.fontSize;
        text.style.fill = meme.color;

        memeNode
          .querySelector("svg")
          .setAttribute(
            "viewBox",
            "0 0 " + imageDuMeme.w + " " + imageDuMeme.h
          );
        memeNode.addEventListener("click", (evt) => create(evt, memeNode.id));
        container.querySelector("#thumbnail").append(memeNode);
      });
    });
  });
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
  loadpage("home.html");
}
/**
 *
 * @param {*} href
 * @param {*} callback
 */
function loadpage(href, callback) {
  let path = `/views/${href}`;
  fetch(path)
    .then(function (resp) {
      return resp.text();
    })
    .then(function (html) {
      let wnode = document.querySelector("#wrapper");
      wnode.innerHTML = "";
      let container = document.createElement("div");
      container.innerHTML = html;
      if (typeof callback === "function") {
        callback(container);
      }
      container.childNodes.forEach((elt) => {
        wnode.append(elt);
      });
      return html;
    });
}
