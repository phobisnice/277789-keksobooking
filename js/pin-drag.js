'use strict';

(function () {
  var MIN_PIN_TOP_POSITION = 130;
  var MAX_PIN_TOP_POSITION = 630;
  var MIN_PIN_LEFT_POSITION = 0;

  var map = document.querySelector('.map');
  var mapPin = map.querySelector('.map__pin--main');
  var adFormAdressInput = document.querySelector('#address');

  var maxPinRightPosition = map.offsetWidth - mapPin.offsetWidth;

  var isMapDisable = function () {
    return map.classList.contains('map--faded');
  };

  mapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var shift = {
      x: evt.clientX - mapPin.offsetLeft,
      y: evt.clientY - mapPin.offsetTop,
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var mapPinPostion = {
        left: moveEvt.clientX - shift.x,
        top: moveEvt.clientY - shift.y,
      };

      if (mapPinPostion.top < MIN_PIN_TOP_POSITION) {
        mapPinPostion.top = MIN_PIN_TOP_POSITION;
      }

      if (mapPinPostion.top > MAX_PIN_TOP_POSITION) {
        mapPinPostion.top = MAX_PIN_TOP_POSITION;
      }

      if (mapPinPostion.left < MIN_PIN_LEFT_POSITION) {
        mapPinPostion.left = MIN_PIN_LEFT_POSITION;
      }

      if (mapPinPostion.left > maxPinRightPosition) {
        mapPinPostion.left = maxPinRightPosition;
      }

      mapPin.style.top = mapPinPostion.top + 'px';
      mapPin.style.left = mapPinPostion.left + 'px';

      adFormAdressInput.setAttribute('value', window.pinLocation.getX() + ', ' + window.pinLocation.getY());
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      if (isMapDisable()) {
        window.mapApplication.activate();
      }

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

})();
