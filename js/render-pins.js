'use strict';

(function () {
  var MAP_PIN_HEIGHT = 70;
  var MAP_PIN_WIDTH = 50;

  var map = document.querySelector('.map');
  var mapPinsContainer = map.querySelector('.map__pins');
  var commonTemplate = document.querySelector('template');
  var mapPinTemplate = commonTemplate.content.querySelector('.map__pin');

  var createPin = function (offerInfo) {
    var offerPin = mapPinTemplate.cloneNode(true);

    offerPin.style = 'left: ' + (offerInfo.location.x - MAP_PIN_WIDTH / 2) + 'px; top: ' + (offerInfo.location.y - MAP_PIN_HEIGHT) + 'px;';
    offerPin.querySelector('img').src = offerInfo.author.avatar;
    offerPin.querySelector('img').alt = offerInfo.offer.title;

    var offerPinClickHandler = function () {
      if (!map.querySelector('.map__card')) {
        map.insertBefore(window.createCard(offerInfo), map.querySelector('.map__filters-container'));
      } else {
        map.replaceChild(window.createCard(offerInfo), map.querySelector('.map__card'));
      }
    };

    offerPin.addEventListener('click', offerPinClickHandler);

    return offerPin;
  };

  window.renderPins = function (offersList) {
    var fragment = document.createDocumentFragment();
    var maxOffers = offersList.length > 5 ? 5 : offersList.length;

    offersList.slice(0, maxOffers).forEach(function (offer) {
      fragment.appendChild(createPin(offer));
    });

    mapPinsContainer.appendChild(fragment);
  };
})();
