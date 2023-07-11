let landingSection = document.querySelector("section.landing");

const imgsCount = 5;
const backgroundIntervalTime = 10000;
let isRandomBgActive = true;

let randomizeImgs = () => {
  let imgIndex = 1;
  let backgroundInterval = setInterval(() => {
    if (!isRandomBgActive) return;
    landingSection.style.backgroundImage =
      "url(assets/imgs/" + (imgIndex + 1) + ".jpg)";
    imgIndex = ++imgIndex % imgsCount;
  }, backgroundIntervalTime);
};

randomizeImgs();

let settingsBtn = document.querySelector("div.toggle-settings");
let settingsBtnIco = document.querySelector("i.gear-icon");
let settingBox = document.querySelector("aside.settings-box");
settingsBtn.onclick = () => {
  settingBox.classList.toggle("open");
  settingsBtnIco.classList.toggle("spin");
};

let colorBtns = document.querySelectorAll("aside .colors-div button");

function changeMainColor(e) {
  let clickedBtn = e.target;

  colorBtns.forEach((btn) => {
    btn.classList.remove("clicked");
  });
  clickedBtn.classList.add("clicked");

  localStorage.selectedColorIndex = Array.prototype.indexOf.call(
    colorBtns,
    clickedBtn
  );
  let btnBgColor = window
    .getComputedStyle(clickedBtn)
    .getPropertyValue("background-color");

  let rootElement = document
    .querySelector("html")
    .style.setProperty("--mainColor", btnBgColor);
}

colorBtns.forEach(function (btn) {
  btn.onclick = changeMainColor;
});

if (localStorage.hasOwnProperty("selectedColorIndex")) {
  let selectedColorIndex = localStorage.getItem("selectedColorIndex");
  colorBtns[selectedColorIndex].click();
}

let randomBgBtns = document.querySelectorAll(
  "aside .background-control-div .btns button"
);

let randomBgYesBtn = randomBgBtns[0];
let randomBgNoBtn = randomBgBtns[1];

randomBgYesBtn.onclick = function () {
  randomBgNoBtn.classList.remove("active");
  randomBgYesBtn.classList.add("active");
  localStorage.isRandomBgActive = JSON.stringify(true);
};

randomBgNoBtn.onclick = function () {
  randomBgNoBtn.classList.add("active");
  randomBgYesBtn.classList.remove("active");
  localStorage.isRandomBgActive = JSON.stringify(false);
};

if (localStorage.hasOwnProperty("isRandomBgActive")) {
  let isRandomBgActive = JSON.parse(localStorage.isRandomBgActive);
  if (isRandomBgActive) randomBgYesBtn.click();
  else randomBgNoBtn.click();
}

let bulletsShowBtns = document.querySelectorAll(
  "aside .show-bullets-div .btns button"
);

let bulletsList = document.querySelector("ul.bullets");
let bullets = document.querySelectorAll("ul.bullets .bullet");
let goToSection = function (sectionID) {
  let section = document.querySelector("section" + sectionID);
  section.scrollIntoView({
    block: "start",
    behavior: "smooth",
  });
};

console.log(bullets);
bullets.forEach(function (bullet) {
  bullet.onclick = () => {
    goToSection("#" + bullet.dataset.section);
  };
});
let bulletsShowBtnYes = bulletsShowBtns[0];
let bulletsShowBtnNo = bulletsShowBtns[1];

bulletsShowBtnYes.onclick = () => {
  bulletsShowBtnNo.classList.remove("active");
  bulletsShowBtnYes.classList.add("active");
  bulletsList.style.display = "flex";
  localStorage.bulletsDisplay = "flex";
};

bulletsShowBtnNo.onclick = () => {
  bulletsShowBtnYes.classList.remove("active");
  bulletsShowBtnNo.classList.add("active");
  bulletsList.style.display = "none";
  localStorage.bulletsDisplay = "none";
};

if (localStorage.hasOwnProperty("bulletsDisplay")) {
  if (localStorage.bulletsDisplay === "flex") bulletsShowBtnYes.click();
  else bulletsShowBtnNo.click();
}

let resetOptsBtn = document.querySelector("aside button.reset-btn");

resetOptsBtn.onclick = function () {
  colorBtns[0].click();
  randomBgYesBtn.click();
  bulletsShowBtnYes.click();
};

let toggleBtn = document.querySelector("div.toggle-btn");
let toggleLinksList = document.querySelector("ul.toggle-links");

toggleBtn.onclick = function () {
  toggleLinksList.classList.toggle("visible-links");
};

let skillsSection = document.querySelector("section.our-skills");
let skills = document.querySelectorAll(
  ".our-skills .skills .progress .progress-bar"
);

const observeOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5,
};
let skillsIntersecionObserver = new IntersectionObserver((entries) => {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      skills.forEach((skill) => {
        skill.style.width = skill.dataset.progress;
      });
    }
  });
}, observeOptions);

skillsIntersecionObserver.observe(skillsSection);
console.log(skillsSection);

//nav links
let navLinks = document.querySelectorAll("header ul.links li a");
let scrollToSectionOnClickOnLinks = function (link) {
  link.onclick = (e) => {
    e.preventDefault();
    goToSection(link.hash);
  };
};

navLinks.forEach(function (link) {
  scrollToSectionOnClickOnLinks(link);
});

//toggle-links
let toggleLinks = document.querySelectorAll("header ul.toggle-links li a");

toggleLinks.forEach(function (link) {
  scrollToSectionOnClickOnLinks(link);
});
