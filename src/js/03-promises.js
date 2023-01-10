import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const ref = {
  form: document.querySelector('.form'),
}

const formData = {}; 
const STORAGE_KEY = "feedback-form-state";

ref.form.addEventListener('input', onCreateDataPromise);
ref.form.addEventListener('submit', onFormSubmit)

function onCreateDataPromise(e) {
  e.preventDefault();
  
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();
  
  let { delay, step, amount } = JSON.parse(localStorage.getItem(STORAGE_KEY));
  
  for (let i = 1; i <= Number(amount); i += 1) {
    if (i !== 1) {
      delay = Number(delay) + Number(step);
    }
    
    createPromise(i, delay).then(onSucsess).catch(onError)
  }

  function onSucsess ({position, delay}) {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  }
  function onError({ position, delay }) {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  }
}



// const formData = new FormData(e.currentTarget);
// const formDataOptions = {};

// for (const [key, value] of formData.entries()) {
//   formDataOptions[key] = Number(value);  
// }









