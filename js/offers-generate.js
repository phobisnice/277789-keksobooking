'use strict';

(function () {
  var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECK_TIMES = ['12:00', '13:00', '14:00'];
  var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

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

  window.offersGenerate = function (numberOfOffers) {
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
})();
