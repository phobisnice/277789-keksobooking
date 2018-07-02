'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainMapPin = map.querySelector('.map__pin--main');
  var mapPinsContainer = map.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var adFormAdressInput = adForm.querySelector('#address');
  var adFormFieldsets = adForm.querySelectorAll('.ad-form fieldset');

  var mainMapPinDefaultPosition = {
    top: mainMapPin.style.top,
    left: mainMapPin.style.left
  };

  var defaultAdress = {
    top: parseFloat(mainMapPinDefaultPosition.top) + window.pinLocation.pinHeight / 2,
    left: window.pinLocation.getX()
  };

  adFormAdressInput.setAttribute('value', defaultAdress.left + ', ' + defaultAdress.top);

  var disableFormInputs = function (formFieldsets) {
    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].disabled = true;
    }
  };

  var enableFormInputs = function (formFieldsets) {
    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].disabled = false;
    }
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
        var mapPins = mapPinsContainer.querySelectorAll('.map__pin:not(.map__pin--main)');

        for (var i = 0; i < mapPins.length; i++) {
          mapPinsContainer.removeChild(mapPins[i]);
        }
      }
    },
    reset: function () {
      map.classList.add('map--faded');
      adForm.classList.add('ad-form--disabled');
      disableFormInputs(adFormFieldsets);
      mainMapPin.style.left = mainMapPinDefaultPosition.left;
      mainMapPin.style.top = mainMapPinDefaultPosition.top;
      adFormAdressInput.setAttribute('value', defaultAdress.left + ', ' + defaultAdress.top);
      adForm.reset();
      window.filterOffers.form.reset();
      window.error.delete();
      this.clearMap();
    },
    offerList: []
  };
})();
