'use strict';

(function () {
  var MAP_PIN_HEIGHT = 70;
  var MAP_PIN_WIDTH = 50;

  var map = document.querySelector('.map');
  var mapPinsContainer = map.querySelector('.map__pins');
  var commonTemplate = document.querySelector('template');
  var mapPinTemplate = commonTemplate.content.querySelector('.map__pin');

  var createPin = function (offerInfo) {
    var newPin = mapPinTemplate.cloneNode(true);

    newPin.style = 'left: ' + (offerInfo.location.x - MAP_PIN_WIDTH / 2) + 'px; top: ' + (offerInfo.location.y - MAP_PIN_HEIGHT) + 'px;';
    newPin.querySelector('img').src = offerInfo.author.avatar;
    newPin.querySelector('img').alt = offerInfo.offer.title;

    var newPinClickHandler = function () {
      if (map.querySelector('.map__card') === null) {
        map.insertBefore(window.createCard(offerInfo), map.querySelector('.map__filters-container'));
      } else {
        map.replaceChild(window.createCard(offerInfo), map.querySelector('.map__card'));
      }
    };

    newPin.addEventListener('click', newPinClickHandler);

    return newPin;
  };

  window.renderPins = function (offersList) {
    var fragment = document.createDocumentFragment();
    var maxOffers = offersList.length > 5 ? 5 : offersList.length;

    for (var i = 0; i < maxOffers; i++) {
      fragment.appendChild(createPin(offersList[i]));
    }

    mapPinsContainer.appendChild(fragment);
  };
})();
