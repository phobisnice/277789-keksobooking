'use strict';

var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_TIMES = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MAP_PIN_HEIGHT = 70;
var MAP_PIN_WIDTH = 50;
var MAP_MAIN_PIN_HEIGHT = 65;
var MAP_MAIN_PIN_WIDTH = 65;

var map = document.querySelector('.map');
var mainMapPin = map.querySelector('.map__pin--main');
var commonTemplate = document.querySelector('template');
var mapCardTemplate = commonTemplate.content.querySelector('.map__card');
var mapPinTemplate = commonTemplate.content.querySelector('.map__pin');
var mapPinsContainer = document.querySelector('.map__pins');
var adForm = document.querySelector('.ad-form');
var adFormFieldsets = adForm.querySelectorAll('.ad-form fieldset');
var adFormAdressInput = adForm.querySelector('#address');
var adFormTitleInput = adForm.querySelector('#title');
var adFormTypeSelect = adForm.querySelector('#type');
var adFormPriceInput = adForm.querySelector('#price');
var adFormTimeInSelect = adForm.querySelector('#timein');
var adFormTimeOutSelect = adForm.querySelector('#timeout');
var adFormRoomsSelect = adForm.querySelector('#room_number');
var adFormCapacitySelect = adForm.querySelector('#capacity');
var adFormSubmit = adForm.querySelector('.ad-form__submit');
var adFormReset = adForm.querySelector('.ad-form__reset');

var getMainMapPinlocationX = function () {
  var mainMapPinLocationX = parseFloat(mainMapPin.style.left) + MAP_MAIN_PIN_WIDTH / 2;

  return mainMapPinLocationX;
};

var getMainMapPinlocationY = function () {
  var mainMapPinLocationY = parseFloat(mainMapPin.style.top) + MAP_MAIN_PIN_HEIGHT;

  return mainMapPinLocationY;
};

var mainMapPinDefaultPosition = {
  top: mainMapPin.style.top,
  left: mainMapPin.style.left
};

var defaultAdress = {
  top: parseFloat(mainMapPinDefaultPosition.top) + MAP_MAIN_PIN_HEIGHT / 2,
  left: getMainMapPinlocationX()
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

  var closePopupClickHandler = function () {
    map.removeChild(newCard);
  };

  newCard.querySelector('.popup__close').addEventListener('click', closePopupClickHandler);

  return newCard;
};

var createPin = function (offerInfo) {
  var newPin = mapPinTemplate.cloneNode(true);

  newPin.style = 'left: ' + (offerInfo.location.x - MAP_PIN_WIDTH / 2) + 'px; top: ' + (offerInfo.location.y - MAP_PIN_HEIGHT) + 'px;';
  newPin.querySelector('img').src = offerInfo.author.avatar;
  newPin.querySelector('img').alt = offerInfo.offer.title;

  var newPinClickHandler = function () {
    if (map.querySelector('.map__card') === null) {
      map.insertBefore(createCard(offerInfo), map.querySelector('.map__filters-container'));
    } else {
      map.replaceChild(createCard(offerInfo), map.querySelector('.map__card'));
    }
  };

  newPin.addEventListener('click', newPinClickHandler);

  return newPin;
};

var renderPins = function (offersList) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < offersList.length; i++) {
    fragment.appendChild(createPin(offersList[i]));
  }

  mapPinsContainer.appendChild(fragment);
};

var isMapDisable = function () {
  return map.classList.contains('map--faded');
};

var activateMap = function () {
  if (isMapDisable()) {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    enableFormInputs(adFormFieldsets);
    renderPins(offers);
  }

  adFormAdressInput.setAttribute('value', getMainMapPinlocationX() + ', ' + getMainMapPinlocationY());
};

mainMapPin.addEventListener('mouseup', function () {
  activateMap();
});

var typeSelectChangeHandler = function () {
  if (adFormTypeSelect.value === 'bungalo') {
    adFormPriceInput.min = 0;
    adFormPriceInput.placeholder = 0;
  } else if (adFormTypeSelect.value === 'flat') {
    adFormPriceInput.min = 1000;
    adFormPriceInput.placeholder = 1000;
  } else if (adFormTypeSelect.value === 'house') {
    adFormPriceInput.min = 5000;
    adFormPriceInput.placeholder = 5000;
  } else {
    adFormPriceInput.min = 10000;
    adFormPriceInput.placeholder = 10000;
  }
};

var timeInSelectChangeHandler = function () {
  adFormTimeOutSelect.value = adFormTimeInSelect.value;
};

var timeOutSelectChangeHandler = function () {
  adFormTimeInSelect.value = adFormTimeOutSelect.value;
};

adFormTypeSelect.addEventListener('change', typeSelectChangeHandler);

adFormTimeInSelect.addEventListener('change', timeInSelectChangeHandler);

adFormTimeOutSelect.addEventListener('change', timeOutSelectChangeHandler);

var checkCapacityValidate = function () {
  var rooms = adFormRoomsSelect.value;
  var capacity = adFormCapacitySelect.value;

  if (rooms === '1' && capacity !== '1') {
    adFormCapacitySelect.setCustomValidity('1 комната доступна только для одного гостя');
  } else if (rooms === '2' && (capacity !== '1' || capacity !== '2')) {
    adFormCapacitySelect.setCustomValidity('2 комнаты доступна для одного или двух гостей');
  } else if (rooms === '3' && capacity === '0') {
    adFormCapacitySelect.setCustomValidity('3 комнаты подходят для одного, двух или трех гостей');
  } else if (rooms === '100' && capacity !== '0') {
    adFormCapacitySelect.setCustomValidity('100 комнат - не для гостей');
  } else {
    adFormCapacitySelect.setCustomValidity('');
  }
};

var requiredInputs = [adFormTitleInput, adFormPriceInput, adFormCapacitySelect];

var checkRequiredInputs = function (inputs) {
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].checkValidity() === false) {
      inputs[i].style.borderColor = 'crimson';
    } else {
      inputs[i].style.borderColor = '#d9d9d3';
    }
  }
};

var adFormSubmitClickHandler = function () {
  checkCapacityValidate();
  checkRequiredInputs(requiredInputs);
};

adFormSubmit.addEventListener('click', adFormSubmitClickHandler);

var isMapHasPins = function () {
  return mapPinsContainer.querySelectorAll('.map__pin:not(.map__pin--main') !== null;
};

var isCardOpen = function () {
  return map.querySelector('.map__card') !== null;
};

var clearMap = function () {
  if (isCardOpen()) {
    map.removeChild(map.querySelector('.map__card'));
  }

  if (isMapHasPins()) {
    var mapPins = mapPinsContainer.querySelectorAll('.map__pin:not(.map__pin--main');

    for (var i = 0; i < mapPins.length; i++) {
      mapPinsContainer.removeChild(mapPins[i]);
    }
  }
};

var resetButtonClickHandler = function () {
  map.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');
  disableFormInputs(adFormFieldsets);
  mainMapPin.style.left = mainMapPinDefaultPosition.left;
  mainMapPin.style.top = mainMapPinDefaultPosition.top;
  adFormAdressInput.setAttribute('value', defaultAdress.left + ', ' + defaultAdress.top);
  clearMap();
  for (var i = 0; i < requiredInputs.length; i++) {
    requiredInputs[i].style.borderColor = '#d9d9d3';
  }
};

adFormReset.addEventListener('click', resetButtonClickHandler);
