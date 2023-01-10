function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
    btnStart: document.querySelector('[data-start]'),
    btnStop: document.querySelector('[data-stop]'),
}
let intervalTime = null;
const color = localStorage.getItem('changeColor');

refs.btnStart.addEventListener('click', onStartChangeColor)
refs.btnStop.addEventListener('click', onStopChangeColor)

function onStartChangeColor () {
    localStorage.setItem('changeColor', true)

    if (color) {
        refs.btnStart.disabled = true;
    }
    
 intervalTime = setInterval(() => {
        window.document.body.style.backgroundColor = getRandomHexColor();
    }, 1000)
}

function onStopChangeColor () {
    clearInterval(intervalTime)
    localStorage.clear();
    refs.btnStart.disabled = false;
}