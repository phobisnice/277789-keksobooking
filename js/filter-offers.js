'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var houseType = filterForm.querySelector('#housing-type');
  var housePrice = filterForm.querySelector('#housing-price');
  var houseRooms = filterForm.querySelector('#housing-rooms');
  var houseGuests = filterForm.querySelector('#housing-guests');

  var houseFeatures = [].slice.call(filterForm.querySelectorAll('[name=features]'));
  var filterItems = [houseType, housePrice, houseRooms, houseGuests].concat(houseFeatures);

  var checkParameter = function (toCheck, value) {
    return value === 'any' || value === toCheck.toString();
  };

  var checkPrice = {
    any: function () {
      return true;
    },
    low: function (price) {
      return price < 10000;
    },
    middle: function (price) {
      return price >= 10000 && price < 50000;
    },
    high: function (price) {
      return price >= 50000;
    }
  };

  var checkFeatures = function (offerFeatures) {
    var checkFlag = true;
    var checked = houseFeatures.filter(function (feature) {
      return feature.checked === true;
    });

    if (checked.length > 0) {
      checkFlag = checked.every(function (checkItem) {
        return offerFeatures.indexOf(checkItem.value) !== -1;
      });
    }

    return checkFlag;
  };

  var filterOffers = function (offerInfo) {
    return checkParameter(offerInfo.offer.type, houseType.value) && checkParameter(offerInfo.offer.rooms, houseRooms.value) && checkPrice[housePrice.value](offerInfo.offer.price) && checkParameter(offerInfo.offer.guests, houseGuests.value) && checkFeatures(offerInfo.offer.features);
  };

  var redrawn = window.debounce(function (filtered) {
    window.mapApplication.clearMap();
    window.renderPins(filtered);
  });

  filterItems.forEach(function (item) {
    item.addEventListener('change', function () {
      var filtered = window.mapApplication.offersList.filter(filterOffers);
      redrawn(filtered);
    });
  });

  window.filterOffers = {
    form: filterForm
  };
})();
