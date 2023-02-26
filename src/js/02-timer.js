import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    selectedDate < new Date()
      ? (Notiflix.Notify.failure('Please choose a date in the future'),
        (startButton.disabled = true))
      : (startButton.disabled = false);
  },
};

const datepicker = flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function updateCountdown(selectedDate) {
  const currentDate = new Date();
  const timeDifference = selectedDate.getTime() - currentDate.getTime();

  if (timeDifference <= 0) {
    clearInterval(countdownInterval);

    daysElement.textContent = '00';
    hoursElement.textContent = '00';
    minutesElement.textContent = '00';
    secondsElement.textContent = '00';
  } else {
    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    daysElement.textContent = addLeadingZero(days);
    hoursElement.textContent = addLeadingZero(hours);
    minutesElement.textContent = addLeadingZero(minutes);
    secondsElement.textContent = addLeadingZero(seconds);
  }
}

let countdownInterval = null;

startButton.addEventListener('click', () => {
  const selectedDate = datepicker.selectedDates[0];
  updateCountdown(selectedDate);

  startButton.disabled = true;

  countdownInterval = setInterval(() => {
    updateCountdown(selectedDate);
  }, 1000);

  setTimeout(() => {
    startButton.disabled = false;
  }, selectedDate.getTime() - Date.now());
});
