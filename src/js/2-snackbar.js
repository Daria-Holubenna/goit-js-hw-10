import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


const formData = document.querySelector('.form');
const inputDelay = document.querySelector('input[name="delay"]');

const valid = () => {
  if (isNaN(inputDelay.value)) {
    console.log('Введіть число');
    return false;
  } else {
    console.log('Введено число:', Number(inputDelay.value));
    return true;
  }
};

formData.addEventListener('submit', ev => {
  ev.preventDefault();

  const inputStates = document.querySelector('input[name=state]:checked');

  if (inputStates.value === 'fulfilled') {
    if (!valid()) return;
    setTimeout(() => {
      new Promise((resolve, reject) => {
        resolve(console.log(`create with ${inputDelay.value}`));
     
    })
      .then(res =>
        iziToast.success({
          title: 'OK',
          message: `✅ Fulfilled promise in ${inputDelay.value}ms`,
          position: 'topRight',
          messageColor: '#fff',
          color: '#59A10D',
          titleColor: '#fff'
        })
      )
      .catch(error =>
        iziToast.show({
          title: 'ERROR',
          message: `❌ Rejected promise in ${inputDelay.value}ms` ,
          position: 'topRight',
          messageColor: '#fff',
           titleColor: '#fff'
        })
      );
       doOne();
       }, Number(inputDelay.value));
  } else if (inputStates.value === 'rejected') {
    if (!valid()) return;
    setTimeout(() => {
      new Promise((resolve, reject) => {
        reject(console.log(`NOT create ${inputDelay.value}`));
      })
        .then(res =>
          iziToast.success({
            title: 'OK',
            message: `✅ Fulfilled promise in ${inputDelay.value}ms`,
            position: 'topRight',
            messageColor: '#fff',
            color: '#59A10D',
             titleColor: '#fff'
          })
        )
        .catch(error =>
          iziToast.show({
            title: 'ERROR',
            message: `❌ Rejected promise in ${inputDelay.value}ms`,
            position: 'topRight',
            color: '#FAFAFB',
            backgroundColor: '#EF4040',
            messageColor: '#fff',
             titleColor: '#fff'
          })
        );
      doTwo();
    }, Number(inputDelay.value));
  } else {
    console.log('you must choise');
  }
});
function doOne() {
  console.log('do 1');
}
function doTwo() {
  console.log('do 2');
}
