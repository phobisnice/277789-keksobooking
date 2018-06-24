'use strict';

(function () {
  var MIN_PIN_TOP_POSITION = 130;
  var MAX_PIN_TOP_POSITION = 630;
  var MIN_PIN_LEFT_POSITION = 0;

  var map = document.querySelector('.map');
  var mapPin = map.querySelector('.map__pin--main');
  var adFormAdressInput = document.querySelector('#address');

  var mapPinRightPosition = map.offsetWidth - mapPin.offsetWidth;

  mapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var mapPinPostion = {
        left: mapPin.offsetLeft - shift.x,
        top: mapPin.offsetTop - shift.y
      };

      var leaveMap = function () {
        document.removeEventListener('mousemove', mouseMoveHandler);
        window.activateMap();
      };

      if (mapPinPostion.top < MIN_PIN_TOP_POSITION) {
        mapPinPostion.top = MIN_PIN_TOP_POSITION;
        leaveMap();
      }

      if (mapPinPostion.top > MAX_PIN_TOP_POSITION) {
        mapPinPostion.top = MAX_PIN_TOP_POSITION;
        leaveMap();
      }

      if (mapPinPostion.left < MIN_PIN_LEFT_POSITION) {
        mapPinPostion.left = MIN_PIN_LEFT_POSITION;
        leaveMap();
      }

      if (mapPinPostion.left > mapPinRightPosition) {
        mapPinPostion.left = mapPinRightPosition;
        leaveMap();
      }

      mapPin.style.top = mapPinPostion.top + 'px';
      mapPin.style.left = mapPinPostion.left + 'px';

      adFormAdressInput.setAttribute('value', window.getMainMapPinlocationX() + ', ' + window.getMainMapPinlocationY());
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

})();
