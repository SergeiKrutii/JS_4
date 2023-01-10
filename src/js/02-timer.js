import flatpickr from "flatpickr";
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
}
refs.buttonStart.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  isActive: false,
  intervalId: null,

  onClose(selectedDates) {
    
    const selectTime = selectedDates[0];
    
    if (selectedDates[0] < options.defaultDate) {
      Notify.failure("Please choose a date in the future")
      return;
    } else {
      refs.buttonStart.removeAttribute('disabled');
    }
    
    const onButtonClick = () => {
      if (this.isActive) {
        return;
      }
      
      this.intervalId = setInterval(() => {
        const startTime = Date.now();
        this.isActive = true;
        
        const deltaTime = selectTime - startTime;
        const { days, hours, minutes, seconds } = convertMs(deltaTime);
  
        refs.spanDays.textContent = days;
        refs.spanHours.textContent = hours;
        refs.spanMinutes.textContent = minutes;
        refs.spanSeconds.textContent = seconds;

        if (days === '00' && hours === '00' && minutes === '00' && seconds === '00') {
          clearInterval(this.intervalId)
          this.isActive = false;  
        }
        
      }, 1000);
    }
    
    refs.buttonStart.addEventListener('click', onButtonClick)
  },
  
};




flatpickr(refs.input, {...options})