const button = document.getElementById("nextButton");
const scenes = document.querySelectorAll(".scene");

let current = 0;
let showingAnswer = false;
let isTyping = false;

function typeText(element) {
  if (!element) return;

  let fullText = element.dataset.fulltext;
  if (!fullText) {
    fullText = element.textContent;
    element.dataset.fulltext = fullText;
  }

  element.textContent = "";
  element.classList.add("typewriter");

  let currentIndex = 0;
  isTyping = true;

  let typingInterval = setInterval(function () {
    let hasMoreCharacters = currentIndex < fullText.length;

    if (hasMoreCharacters) {
      element.textContent += fullText[currentIndex];
      currentIndex++;
      return;
    }

    clearInterval(typingInterval);
    isTyping = false;
  }, 30);
}

function showQuestion() {
  let scene = scenes[current];
  let questionSpan = scene.querySelector(".left span");
  typeText(questionSpan);
}

function showAnswer() {
  let scene = scenes[current];
  let answer = scene.querySelector(".answer");
  if (!answer) return;

  answer.classList.add("show");

  let answerSpan = answer.querySelector("p span");
  typeText(answerSpan);

  showingAnswer = true;
}

button.addEventListener("click", function () {
  if (!showingAnswer) {
    showAnswer();
    return;
  }

  scenes[current].classList.remove("on");

  let prevAnswer = scenes[current].querySelector(".answer");
  if (prevAnswer) prevAnswer.classList.remove("show");

  current++;

  if (current < scenes.length) {
    scenes[current].classList.add("on");
  } else {
    current = 0;
    scenes[current].classList.add("on");
  }

  showingAnswer = false;
  showQuestion();
});

showQuestion();
