import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}

const refs = {
  input: document.querySelector('#datetime-picker'),
  buttonStart: document.querySelector('[data-start]'),
  spanDays: document.querySelector('[data-days]'),
  spanHours: document.querySelector('[data-hours]'),
  spanMinutes: document.querySelector('[data-minutes]'),
  spanSeconds: document.querySelector('[data-seconds]'),
};
refs.buttonStart.setAttribute('disabled', true);
refs.buttonStart.addEventListener('click', onButtonClick);

let isActive = false;
let intervalId = 0;
let destination = null;

function onButtonClick() {
  if (isActive || !destination) return;

  intervalId = setInterval(() => {
    updateTimer(destination);
  }, 1000);
}

const updateTimer = selectedTime => {
  const deltaTime = new Date() - selectedTime;
  const { days, hours, minutes, seconds } = convertMs(deltaTime);

  refs.spanDays.textContent = days;
  refs.spanHours.textContent = hours;
  refs.spanMinutes.textContent = minutes;
  refs.spanSeconds.textContent = seconds;
};

const onCloseDatePicker = selectedDates => {
  console.log(selectedDates)
  const selectTime = selectedDates[0];

  if (selectTime < new Date()) {
    Notify.failure('Please choose a date in the future');
    return;
  } else {
    refs.buttonStart.removeAttribute('disabled');
  }
  destination = selectTime;
  updateTimer(selectTime);
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  intervalId: null,
  onClose: onCloseDatePicker,
}

flatpickr(refs.input, options );


