import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const datetimePicker = document.querySelector("#datetime-picker");
const btnStart = document.querySelector("button[data-start]");
const daysValue = document.querySelector("span[data-days]");
const hoursValue = document.querySelector("span[data-hours]");
const minutesValue = document.querySelector("span[data-minutes]");
const secondsValue = document.querySelector("span[data-seconds]");
const span = document.querySelector("span");

document.addEventListener("DOMContentLoaded", ()=>{
    btnStart.disabled = true;
})
let userSelectedDate = null;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      if(selectedDates[0] >= new Date()){
        userSelectedDate = selectedDates[0];
        btnStart.disabled = false;
      }    else {
        btnStart.disabled = true;
        iziToast.show({
            title: 'CRITICAL ERROR:',
            titleColor: 'red',
            messageColor: 'red',
            backgroundColor: 'black',
            message: 'Please choose a date in the future' 
        });
        userSelectedDate = null;
      }
    },
  };
  
  flatpickr(datetimePicker, options);

 btnStart.addEventListener('click', (ev) =>{
    if(userSelectedDate !== null){
        btnStart.disabled = true;
        datetimePicker.disabled = true;
        const dateNow = new Date().getTime();
        const currentTime = userSelectedDate - dateNow;
        startCountdown(currentTime);
    } else{
        iziToast.warning({
            title: 'Warning',
      message: 'Please choose a valid date in the future'
    })
    }
 })
 let timerInterval = null;

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
    return String(value).padStart(2, '0');
  };
  function startCountdown(duration) {
    timerInterval = setInterval(() => { 
      const { days, hours, minutes, seconds } = convertMs(duration);   
      daysValue.textContent = days;
      hoursValue.textContent = addLeadingZero(hours);
      minutesValue.textContent = addLeadingZero(minutes);
      secondsValue.textContent = addLeadingZero(seconds);
  
      duration -= 1000;   
      if (duration < 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        daysValue.textContent = '0'; // Оновлюємо дні на нуль
        hoursValue.textContent = '00';
        minutesValue.textContent = '00';
        secondsValue.textContent = '00';
        datetimePicker.disabled = false;
        iziToast.info({
          title: 'Info',
          message: 'Час вийшов!'
        });
      }
    }, 1000);
  }