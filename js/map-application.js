'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainMapPin = map.querySelector('.map__pin--main');
  var mapPinsContainer = map.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var adFormAdressInput = adForm.querySelector('#address');
  var adFormFieldsets = Array.prototype.slice.call(adForm.querySelectorAll('.ad-form fieldset'));

  var mainMapPinInitialPosition = {
    top: mainMapPin.style.top,
    left: mainMapPin.style.left
  };

  var initialAdress = {
    top: parseFloat(mainMapPinInitialPosition.top) + window.pinLocation.pinHeight / 2,
    left: window.pinLocation.getX()
  };

  adFormAdressInput.setAttribute('value', initialAdress.left + ', ' + initialAdress.top);

  var disableFormInputs = function (formFieldsets) {
    formFieldsets.forEach(function (fieldset) {
      fieldset.disabled = true;
    });
  };

  var enableFormInputs = function (formFieldsets) {
    formFieldsets.forEach(function (fieldset) {
      fieldset.disabled = false;
    });
  };

  disableFormInputs(adFormFieldsets);

  var isMapDisable = function () {
    return map.classList.contains('map--faded');
  };

  var isMapHasPins = function () {
    return mapPinsContainer.querySelectorAll('.map__pin:not(.map__pin--main)') !== null;
  };

  var isCardOpen = function () {
    return map.querySelector('.map__card') !== null;
  };

  var dataSuccessHandler = function (offers) {
    window.renderPins(offers);
    window.mapApplication.offersList = offers;
  };

  var dataErrorHandler = window.error.create;

  window.mapApplication = {
    activate: function () {
      if (isMapDisable()) {
        map.classList.remove('map--faded');
        adForm.classList.remove('ad-form--disabled');
        enableFormInputs(adFormFieldsets);
        window.backend.load(dataSuccessHandler, dataErrorHandler);
      }
      adFormAdressInput.setAttribute('value', window.pinLocation.getX() + ', ' + window.pinLocation.getY());
    },
    clearMap: function () {
      if (isCardOpen()) {
        map.removeChild(map.querySelector('.map__card'));
      }

      if (isMapHasPins()) {
        var mapPins = Array.prototype.slice.call(mapPinsContainer.querySelectorAll('.map__pin:not(.map__pin--main)'));

        mapPins.forEach(function (pin) {
          mapPinsContainer.removeChild(pin);
        });
      }
    },
    reset: function () {
      map.classList.add('map--faded');
      adForm.classList.add('ad-form--disabled');
      disableFormInputs(adFormFieldsets);
      mainMapPin.style.left = mainMapPinInitialPosition.left;
      mainMapPin.style.top = mainMapPinInitialPosition.top;
      adFormAdressInput.setAttribute('value', initialAdress.left + ', ' + initialAdress.top);
      adForm.reset();
      window.filterOffers.form.reset();
      window.error.takeOff();
      this.clearMap();
    },
    offersList: []
  };
})();
