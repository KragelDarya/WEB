document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.form-box');
  const nameInput = form.querySelector('input[type="text"]');
  const phoneInput = form.querySelector('input[type="tel"]');
  const sendBtn = form.querySelector('button.send');

  // Маска телефона (без изменений)
  function maskPhone(event) {
    let keyCode;
    if (event.keyCode) {
      keyCode = event.keyCode;
    }

    let input = event.target,
        matrix = "+7 (___) ___-__-__",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = input.value.replace(/\D/g, ""),
        newValue = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) : a;
        });

    i = newValue.indexOf("_");
    if (i !== -1) {
      newValue = newValue.slice(0, i);
    }

    let reg = matrix.substr(0, input.value.length).replace(/_+/g,
      function (a) {
        return "\\d{1," + a.length + "}";
      }).replace(/[+()]/g, "\\$&");

    reg = new RegExp("^" + reg + "$");

    if (!reg.test(input.value) || input.value.length < 5 || (keyCode > 47 && keyCode < 58)) {
      input.value = newValue;
    }

    if (event.type === "blur" && input.value.length < 18) {
      input.value = "";
    }
  }

  phoneInput.addEventListener('input', maskPhone);
  phoneInput.addEventListener('focus', maskPhone);
  phoneInput.addEventListener('blur', maskPhone);
  phoneInput.addEventListener('keydown', maskPhone);

  // Валидация формы
  sendBtn.addEventListener('click', function (e) {
    e.preventDefault();

    const nameValue = nameInput.value.trim();
    const phoneValue = phoneInput.value.trim();

    const nameIsValid = /^[а-яА-ЯёЁa-zA-Z\s\-]+$/.test(nameValue) && nameValue.length > 0;
    const phoneIsValid = phoneValue.length === 18; // строго по маске

    clearError(nameInput);
    clearError(phoneInput);

    let isValid = true;

    if (!nameIsValid) {
      showError(nameInput, 'Введите корректное имя (только буквы)');
      isValid = false;
    }

    if (!phoneIsValid) {
      showError(phoneInput, 'Введите полный номер телефона');
      isValid = false;
    }

    if (isValid) {
      alert('Форма успешно отправлена!');
      // Можно тут отправить форму или сбросить поля
    }
  });

  function showError(input, message) {
    input.style.borderColor = 'red';
    if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
      let errorElem = document.createElement('div');
      errorElem.className = 'error-message';
      errorElem.style.color = 'red';
      errorElem.style.fontSize = '12px';
      errorElem.style.marginTop = '4px';
      errorElem.textContent = message;
      input.parentNode.insertBefore(errorElem, input.nextSibling);
    }
  }

  function clearError(input) {
    input.style.borderColor = '#ddd';
    if (input.nextElementSibling && input.nextElementSibling.classList.contains('error-message')) {
      input.nextElementSibling.remove();
    }
  }
});