const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let intervalId = null;

buttonStart.addEventListener('click', onButtonStartClick);

function onButtonStartClick() {
  if (intervalId) {
    return;
  }

  intervalId = setInterval(() => {
    const colorBody = getRandomHexColor();
    bodyEl.style.backgroundColor = colorBody;
  }, 1000);

  buttonStart.setAttribute('disabled', true);
  buttonStop.removeAttribute('disabled');
}

buttonStop.addEventListener('click', onButtonStopClick);

function onButtonStopClick() {
  clearInterval(intervalId);

  buttonStart.removeAttribute('disabled');
  buttonStop.setAttribute('disabled', true);
  intervalId = null;
}

buttonStop.setAttribute('disabled', true);
