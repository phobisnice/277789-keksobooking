'use strict';

(function () {
  var MAP_MAIN_PIN_HEIGHT = 65;
  var MAP_MAIN_PIN_WIDTH = 65;

  var mainMapPin = document.querySelector('.map__pin--main');

  window.pinLocation = {
    pinHeight: MAP_MAIN_PIN_HEIGHT,
    pinWidth: MAP_MAIN_PIN_WIDTH,
    getX: function () {
      var mainMapPinLocationX = parseFloat(mainMapPin.style.left) + this.pinWidth / 2;
      return mainMapPinLocationX;
    },
    getY: function () {
      var mainMapPinLocationY = parseFloat(mainMapPin.style.top) + this.pinHeight;
      return mainMapPinLocationY;
    }
  };
})();
