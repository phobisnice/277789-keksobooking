'use strict';

var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_TIMES = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MAP_PIN_HEIGHT = 70;
var MAP_PIN_WIDTH = 50;

var map = document.querySelector('.map');
var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var mapPinsContainer = document.querySelector('.map__pins');

var generateRandomNumber = function (min, max) {
  var randomNumber = min + Math.floor(Math.random() * (max + 1 - min));

  return randomNumber;
};

var getRandomProperty = function (properties) {
  var randomProperty = properties[generateRandomNumber(0, properties.length - 1)];

  return randomProperty;
};

var sortRandom = function () {
  return Math.random() - 0.5;
};

var getRandomFeatures = function (features) {
  var randomFeatures = features.slice();

  randomFeatures.sort(sortRandom);
  randomFeatures.length = generateRandomNumber(0, randomFeatures.length);

  return randomFeatures;
};

var generateRandomOffers = function (numberOfOffers) {
  var randomOffers = [];

  for (var i = 0; i < numberOfOffers; i++) {
    var locationX = generateRandomNumber(300, 900);
    var locationY = generateRandomNumber(130, 630);

    var randomOffer = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: getRandomProperty(OFFER_TITLES),
        address: locationX + ', ' + locationY,
        price: generateRandomNumber(1000, 1000000),
        type: getRandomProperty(OFFER_TYPES),
        rooms: generateRandomNumber(1, 5),
        guests: generateRandomNumber(1, 3),
        checkin: getRandomProperty(CHECK_TIMES),
        checkout: getRandomProperty(CHECK_TIMES),
        features: getRandomFeatures(OFFER_FEATURES),
        description: '',
        photos: OFFER_PHOTOS.sort(sortRandom)
      },
      location: {
        x: locationX,
        y: locationY
      }
    };

    randomOffers.push(randomOffer);
  }

  return randomOffers;
};

var offers = generateRandomOffers(8);

map.classList.remove('map--faded');

var createPin = function (offerInfo) {
  var newPin = mapPinTemplate.cloneNode(true);

  newPin.style = 'left: ' + (offerInfo.location.x - MAP_PIN_WIDTH / 2) + 'px; top: ' + (offerInfo.location.y - MAP_PIN_HEIGHT) + 'px;';
  newPin.querySelector('img').src = offerInfo.author.avatar;
  newPin.querySelector('img').alt = offerInfo.offer.title;

  return newPin;
};

var renderPins = function (offersList) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < offersList.length; i++) {
    fragment.appendChild(createPin(offersList[i]));
  }

  mapPinsContainer.appendChild(fragment);
};

renderPins(offers);

var createCard = function (offerInfo) {
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

  return newCard;
};

map.insertBefore(createCard(offers[0]), map.querySelector('.map__filters-container'));
