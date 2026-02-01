gsap.registerPlugin(ScrollTrigger);

// Header GSAP Scroll JS

let heroLine = document.getElementById("heroLine");

function fade(text) {
  gsap.to(heroLine, {
    opacity: 0,
    duration: 0.3,
    onComplete: function () {
      heroLine.textContent = text;
      gsap.to(heroLine, {
        opacity: 1,
        duration: 0.3
      });
    }
  });
}

let currentStep = 0;

ScrollTrigger.create({
  trigger: ".hero",
  start: "top top",
  end: "+=900",
  scrub: true,
  pin: true,
  onUpdate: function (self) {
    if (self.progress < 0.33 && currentStep !== 0) {
      currentStep = 0;
      fade("IS THIS ON?");
    }

    if (self.progress >= 0.33 && self.progress < 0.80 && currentStep !== 1) {
      currentStep = 1;
      fade("I MAKE COOL SH*T");
    }

    if (self.progress >= 0.80 && currentStep !== 2) {
      currentStep = 2;
      fade("CHECK 'EM HERE.");
    }
  }
});

// Slideshow JS

let slideIndex = 1;
showSlides(slideIndex);

function nextSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slides");
    
    if (n > slides.length) {
        slideIndex = 1
    }

    if (n < 1) {
        slideIndex = slides.length
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";    
    }

    slides[slideIndex-1].style.display = "block";
}

// Menu transform JS

let sidepanel = document.getElementById("sidepanel");
function toggleMenu(icon) {
    icon.classList.toggle("change");
    sidepanel.classList.toggle("open");
}



// settings work
let menuButton = document.querySelector(".menu");
let settingsMenuItem = document.getElementById("settingsMenuItem");

let settingsModal = document.getElementById("settingsModal");
let modalPanel = settingsModal ? settingsModal.querySelector(".modal__panel") : null;

let themeSelect = document.getElementById("themeSelect");
let fontSelect = document.getElementById("fontSelect");
let fontSize = document.getElementById("fontSize");
let fontSizeValue = document.getElementById("fontSizeValue");
let lineHeight = document.getElementById("lineHeight");
let lineHeightValue = document.getElementById("lineHeightValue");
let reduceMotion = document.getElementById("reduceMotion");
let resetSettings = document.getElementById("resetSettings");

let lastFocus = null;

var THEMES = {
  cyan: {
    bg1: "--cyan-1",
    bg2: "--cyan-2"
  },
  crimson: {
    bg1: "--crimson-1",
    bg2: "--crimson-2"
  },
  darkgreen: {
    bg1: "--darkgreen-1",
    bg2: "--darkgreen-2"
  },
  blackbean: {
    bg1: "--blackbean-1",
    bg2: "--blackbean-2"
  },
  highcontrast: {
    bg1: "--contrast-1",
    bg2: "--contrast-2"
  }
};


let FONTS = {
  staatliches: "'Staatliches', sans-serif",
  system: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
  mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace'
};

function closeSidebar() {
  if (sidepanel) sidepanel.classList.remove("open");
  if (menuButton) menuButton.classList.remove("change");
}

function openModal() {
  if (!settingsModal) return;

  lastFocus = document.activeElement;
  closeSidebar();

  settingsModal.classList.add("is-open");
  settingsModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  if (themeSelect) themeSelect.focus();
  else if (modalPanel) modalPanel.focus();
}

function closeModal() {
  if (!settingsModal) return;

  settingsModal.classList.remove("is-open");
  settingsModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");

  if (lastFocus) lastFocus.focus();
}

function applyTheme(themeKey) {
  var theme = THEMES[themeKey];
  if (!theme) return;

  var styles = getComputedStyle(document.documentElement);

  var bg1 = styles.getPropertyValue(theme.bg1);
  var bg2 = styles.getPropertyValue(theme.bg2);

  document.documentElement.style.setProperty("--bg-1", bg1);
  document.documentElement.style.setProperty("--bg-2", bg2);
}


function applyFont(key) {
  let f = FONTS[key] || FONTS.staatliches;
  document.documentElement.style.setProperty("--font-family", f);
}

function applyFontSize(px) {
  document.documentElement.style.setProperty("--font-size", px + "px");
  if (fontSizeValue) fontSizeValue.textContent = px + "px";
}

function applyLineHeight(val) {
  document.documentElement.style.setProperty("--line-height", val);
  if (lineHeightValue) lineHeightValue.textContent = val;
}

function applyReduceMotion(on) {
  document.body.classList.toggle("reduce-motion", !!on);
}

function saveSettings() {
  let data = {
    theme: themeSelect ? themeSelect.value : "ocean",
    font: fontSelect ? fontSelect.value : "staatliches",
    fontSize: fontSize ? fontSize.value : "16",
    lineHeight: lineHeight ? lineHeight.value : "1.5",
    reduceMotion: reduceMotion ? reduceMotion.checked : false
  };
  localStorage.setItem("siteSettings", JSON.stringify(data));
}

function loadSettings() {
  let raw = localStorage.getItem("siteSettings");
  if (!raw) {

    if (fontSize) applyFontSize(parseInt(fontSize.value || "16", 10));
    if (lineHeight) applyLineHeight(lineHeight.value || "1.5");
    return;
  }

  try {
    let data = JSON.parse(raw);

    if (themeSelect && data.theme) themeSelect.value = data.theme;
    if (fontSelect && data.font) fontSelect.value = data.font;
    if (fontSize && data.fontSize) fontSize.value = data.fontSize;
    if (lineHeight && data.lineHeight) lineHeight.value = data.lineHeight;
    if (reduceMotion) reduceMotion.checked = !!data.reduceMotion;

    applyTheme(themeSelect ? themeSelect.value : "ocean");
    applyFont(fontSelect ? fontSelect.value : "staatliches");
    applyFontSize(parseInt(fontSize ? fontSize.value : "16", 10));
    applyLineHeight(lineHeight ? lineHeight.value : "1.5");
    applyReduceMotion(reduceMotion ? reduceMotion.checked : false);
  } catch (e) {
  }
}

function resetAllSettings() {
  if (themeSelect) themeSelect.value = "ocean";
  if (fontSelect) fontSelect.value = "staatliches";
  if (fontSize) fontSize.value = "16";
  if (lineHeight) lineHeight.value = "1.5";
  if (reduceMotion) reduceMotion.checked = false;

  applyTheme("ocean");
  applyFont("staatliches");
  applyFontSize(16);
  applyLineHeight("1.5");
  applyReduceMotion(false);

  saveSettings();
}


if (settingsMenuItem) {
  settingsMenuItem.addEventListener("click", function () {
    openModal();
  });
}

if (settingsModal) {
  settingsModal.addEventListener("click", function (e) {
    if (e.target && e.target.dataset && e.target.dataset.close === "true") {
      closeModal();
    }
  });
}


document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && settingsModal && settingsModal.classList.contains("is-open")) {
    closeModal();
  }
});

themeSelect.addEventListener("change", function () {
  applyTheme(themeSelect.value);
  saveSettings();
});


if (fontSelect) {
  fontSelect.addEventListener("change", function () {
    applyFont(fontSelect.value);
    saveSettings();
  });
}

if (fontSize) {
  fontSize.addEventListener("input", function () {
    applyFontSize(parseInt(fontSize.value, 10));
  });
  fontSize.addEventListener("change", saveSettings);
}

if (lineHeight) {
  lineHeight.addEventListener("input", function () {
    applyLineHeight(lineHeight.value);
  });
  lineHeight.addEventListener("change", saveSettings);
}

if (reduceMotion) {
  reduceMotion.addEventListener("change", function () {
    applyReduceMotion(reduceMotion.checked);
    saveSettings();
  });
}

if (resetSettings) {
  resetSettings.addEventListener("click", resetAllSettings);
}


loadSettings();
