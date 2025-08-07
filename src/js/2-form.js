const formEl = document.querySelector('.feedback-form');

let formData = {
  email: '',
  message: '',
};

formEl.addEventListener('input', e => {
  const email = e.currentTarget.elements.email.value;
  const message = e.currentTarget.elements.message.value;

  formData.email = email;
  formData.message = message;

  saveToLS('feedback-form-state', formData);
});

formEl.addEventListener('submit', event => {
  event.preventDefault();

  formData.email = formEl.elements.email.value.trim();
  formData.message = formEl.elements.message.value.trim();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log('Отправленные данные:', formData);

  localStorage.removeItem('feedback-form-state');
  formData = { email: '', message: '' };
  formEl.reset();
});

document.addEventListener('DOMContentLoaded', () => {
  const lsData = getFromLS('feedback-form-state');
  if (lsData) {
    try {
      formData.email = lsData.email || '';
      formData.message = lsData.message || '';
      formEl.elements.email.value = formData.email;
      formEl.elements.message.value = formData.message;
    } catch (error) {}
  }
});

function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}

function getFromLS(key, defaultValue) {
  const jsonData = localStorage.getItem(key);
  try {
    const data = JSON.parse(jsonData);
    return data;
  } catch {
    return defaultValue || jsonData;
  }
}
