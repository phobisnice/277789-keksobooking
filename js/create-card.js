'use strict';

(function () {

  var commonTemplate = document.querySelector('template');
  var mapCardTemplate = commonTemplate.content.querySelector('.map__card');
  var map = document.querySelector('.map');

  window.createCard = function (offerInfo) {
    var offerCard = mapCardTemplate.cloneNode(true);

    offerCard.querySelector('.popup__title').textContent = offerInfo.offer.title;
    offerCard.querySelector('.popup__text--address').textContent = offerInfo.offer.address;
    offerCard.querySelector('.popup__text--price').textContent = offerInfo.offer.price + '₽/ночь';

    if (offerInfo.offer.type === 'palace') {
      offerCard.querySelector('.popup__type').textContent = 'Дворец';
    } else if (offerInfo.offer.type === 'flat') {
      offerCard.querySelector('.popup__type').textContent = 'Квартира';
    } else if (offerInfo.offer.type === 'house') {
      offerCard.querySelector('.popup__type').textContent = 'Дом';
    } else {
      offerCard.querySelector('.popup__type').textContent = 'Бунгало';
    }

    offerCard.querySelector('.popup__text--capacity').textContent = offerInfo.offer.rooms + ' комнаты для ' + offerInfo.offer.guests + ' гостей';
    offerCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerInfo.offer.checkin + ', выезд до ' + offerInfo.offer.checkout;

    var featuresFragment = document.createDocumentFragment();

    for (var i = 0; i < offerInfo.offer.features.length; i++) {
      var offerFeature = document.createElement('li');

      offerFeature.classList.add('popup__feature', 'popup__feature--' + offerInfo.offer.features[i]);

      featuresFragment.appendChild(offerFeature);
    }

    offerCard.querySelector('.popup__features').innerHTML = '';
    offerCard.querySelector('.popup__features').appendChild(featuresFragment);

    offerCard.querySelector('.popup__description').textContent = offerInfo.offer.description;

    var photosFragment = document.createDocumentFragment();
    var popupPhoto = offerCard.querySelector('.popup__photo');

    for (var j = 0; j < offerInfo.offer.photos.length; j++) {

      var cardPhoto = popupPhoto.cloneNode();
      cardPhoto.src = offerInfo.offer.photos[j];

      photosFragment.appendChild(cardPhoto);
    }

    offerCard.querySelector('.popup__photos').replaceChild(photosFragment, popupPhoto);
    offerCard.querySelector('.popup__avatar').src = offerInfo.author.avatar;

    var offerCardElements = [].slice.call(offerCard.children);

    offerCardElements.forEach(function (element) {
      if (element.children.length === 0 && element.textContent.trim().length === 0 && element.tagName !== 'IMG') {
        element.remove();
      }
    });

    var removeMapCard = function () {
      map.removeChild(offerCard);
    };

    var closePopupClickHandler = function () {
      removeMapCard();
    };

    var mapCardEscPressHandler = function (evt) {
      window.util.isEscEvent(evt, removeMapCard);
      document.removeEventListener('keydown', mapCardEscPressHandler);
    };

    offerCard.querySelector('.popup__close').addEventListener('click', closePopupClickHandler);
    document.addEventListener('keydown', mapCardEscPressHandler);

    return offerCard;
  };
})();
