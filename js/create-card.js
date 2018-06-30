'use strict';

(function () {

  var commonTemplate = document.querySelector('template');
  var mapCardTemplate = commonTemplate.content.querySelector('.map__card');
  var map = document.querySelector('.map');

  window.createCard = function (offerInfo) {
    var newCard = mapCardTemplate.cloneNode(true);

    newCard.querySelector('.popup__title').textContent = offerInfo.offer.title;
    newCard.querySelector('.popup__text--address').textContent = offerInfo.offer.address;
    newCard.querySelector('.popup__text--price').textContent = offerInfo.offer.price + '₽/ночь';

    if (offerInfo.offer.type === 'palace') {
      newCard.querySelector('.popup__type').textContent = 'Дворец';
    } else if (offerInfo.offer.type === 'flat') {
      newCard.querySelector('.popup__type').textContent = 'Квартира';
    } else if (offerInfo.offer.type === 'house') {
      newCard.querySelector('.popup__type').textContent = 'Дом';
    } else {
      newCard.querySelector('.popup__type').textContent = 'Бунгало';
    }

    newCard.querySelector('.popup__text--capacity').textContent = offerInfo.offer.rooms + ' комнаты для ' + offerInfo.offer.guests + ' гостей';
    newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerInfo.offer.checkin + ', выезд до ' + offerInfo.offer.checkout;

    var featuresFragment = document.createDocumentFragment();

    for (var i = 0; i < offerInfo.offer.features.length; i++) {
      var offerFeature = document.createElement('li');

      offerFeature.classList.add('popup__feature', 'popup__feature--' + offerInfo.offer.features[i]);

      featuresFragment.appendChild(offerFeature);
    }

    newCard.querySelector('.popup__features').innerHTML = '';
    newCard.querySelector('.popup__features').appendChild(featuresFragment);

    newCard.querySelector('.popup__description').textContent = offerInfo.offer.description;

    var photosFragment = document.createDocumentFragment();
    var popupPhoto = newCard.querySelector('.popup__photo');

    for (var j = 0; j < offerInfo.offer.photos.length; j++) {

      var cardPhoto = popupPhoto.cloneNode();
      cardPhoto.src = offerInfo.offer.photos[j];

      photosFragment.appendChild(cardPhoto);
    }

    newCard.querySelector('.popup__photos').replaceChild(photosFragment, popupPhoto);
    newCard.querySelector('.popup__avatar').src = offerInfo.author.avatar;

    var deleteMapCard = function () {
      map.removeChild(newCard);
    };

    var closePopupClickHandler = function () {
      deleteMapCard();
    };

    var mapCardEscPressHandler = function (evt) {
      window.util.isEscEvent(evt, deleteMapCard);
      document.removeEventListener('keydown', mapCardEscPressHandler);
    };

    newCard.querySelector('.popup__close').addEventListener('click', closePopupClickHandler);
    document.addEventListener('keydown', mapCardEscPressHandler);

    return newCard;
  };
})();
