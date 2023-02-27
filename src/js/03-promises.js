import Notiflix from 'notiflix';

const form = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

form.addEventListener('submit', event => {
  event.preventDefault();

  const delayInput = document.querySelector('input[name="delay"]');
  const stepInput = document.querySelector('input[name="step"]');
  const amountInput = document.querySelector('input[name="amount"]');

  const delay = Number(delayInput.value);
  const step = Number(stepInput.value);
  const amount = Number(amountInput.value);

  const promises = [];
  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    const delayTime = delay + i * step;
    const promise = createPromise(position, delayTime);
    promises.push(promise);
  }

  Promise.all(
    promises.map(p => {
      return p
        .then(result => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${result.position} in ${result.delay}ms`
          );
          return result;
        })
        .catch(error => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${error.position} in ${error.delay}ms`
          );
          return error;
        });
    })
  );
});
