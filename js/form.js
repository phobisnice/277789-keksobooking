'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormTitleInput = adForm.querySelector('#title');
  var adFormTypeSelect = adForm.querySelector('#type');
  var adFormPriceInput = adForm.querySelector('#price');
  var adFormTimeInSelect = adForm.querySelector('#timein');
  var adFormTimeOutSelect = adForm.querySelector('#timeout');
  var adFormRoomsSelect = adForm.querySelector('#room_number');
  var adFormCapacitySelect = adForm.querySelector('#capacity');
  var adFormSubmit = adForm.querySelector('.ad-form__submit');
  var adFormReset = adForm.querySelector('.ad-form__reset');
  var successMessage = document.querySelector('.success');

  var requiredInputs = [adFormTitleInput, adFormPriceInput, adFormCapacitySelect];

  var typeSelectChangeHandler = function () {
    if (adFormTypeSelect.value === 'bungalo') {
      adFormPriceInput.min = 0;
      adFormPriceInput.placeholder = 0;
    } else if (adFormTypeSelect.value === 'flat') {
      adFormPriceInput.min = 1000;
      adFormPriceInput.placeholder = 1000;
    } else if (adFormTypeSelect.value === 'house') {
      adFormPriceInput.min = 5000;
      adFormPriceInput.placeholder = 5000;
    } else {
      adFormPriceInput.min = 10000;
      adFormPriceInput.placeholder = 10000;
    }
  };

  var timeInSelectChangeHandler = function () {
    adFormTimeOutSelect.value = adFormTimeInSelect.value;
  };

  var timeOutSelectChangeHandler = function () {
    adFormTimeInSelect.value = adFormTimeOutSelect.value;
  };

  adFormTypeSelect.addEventListener('change', typeSelectChangeHandler);

  adFormTimeInSelect.addEventListener('change', timeInSelectChangeHandler);

  adFormTimeOutSelect.addEventListener('change', timeOutSelectChangeHandler);

  var checkCapacityValidate = function () {
    var rooms = adFormRoomsSelect.value;
    var capacity = adFormCapacitySelect.value;

    if (rooms === '1' && capacity !== '1') {
      adFormCapacitySelect.setCustomValidity('1 комната доступна только для одного гостя');
    } else if (rooms === '2' && (capacity !== '1' || capacity !== '2')) {
      adFormCapacitySelect.setCustomValidity('2 комнаты доступна для одного или двух гостей');
    } else if (rooms === '3' && capacity === '0') {
      adFormCapacitySelect.setCustomValidity('3 комнаты подходят для одного, двух или трех гостей');
    } else if (rooms === '100' && capacity !== '0') {
      adFormCapacitySelect.setCustomValidity('100 комнат - не для гостей');
    } else {
      adFormCapacitySelect.setCustomValidity('');
    }
  };

  var checkRequiredInputs = function (inputs) {
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].checkValidity() === false) {
        inputs[i].style.borderColor = 'crimson';
      } else {
        inputs[i].style.borderColor = '#d9d9d3';
      }
    }
  };

  var showSuccessMessage = function () {
    successMessage.classList.remove('hidden');
    document.addEventListener('click', removeSucccessMessage);
    document.addEventListener('keydown', successMessageEscHandler);
  };

  var removeSucccessMessage = function () {
    successMessage.classList.add('hidden');
    document.removeEventListener('click', removeSucccessMessage);
    document.removeEventListener('keydown', successMessageEscHandler);
  };

  var successMessageEscHandler = function (evt) {
    window.util.isEscEvent(evt, removeSucccessMessage);
  };

  var adFormSuccessSubmitHandler = function () {
    window.mapApplication.reset();
    showSuccessMessage();
  };

  var adFormErrorSubmitHandler = window.error.create;

  var adFormSubmitClickHandler = function (evt) {
    checkCapacityValidate();
    checkRequiredInputs(requiredInputs);
    if (adForm.checkValidity() === true) {
      var formData = new FormData(adForm);
      window.backend.save(formData, adFormSuccessSubmitHandler, adFormErrorSubmitHandler);
      evt.preventDefault();
    }
  };

  adFormSubmit.addEventListener('click', adFormSubmitClickHandler);

  adFormReset.addEventListener('click', function () {
    window.mapApplication.reset();

    for (var i = 0; i < requiredInputs.length; i++) {
      requiredInputs[i].style.borderColor = '#d9d9d3';
    }
  });

})();
