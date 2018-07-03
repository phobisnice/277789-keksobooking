'use strict';

(function () {
  window.debounce = function (fun, debounceInterval) {
    var lastTimeout = null;

    return function () {
      var args = arguments;
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(function () {
        fun.apply(null, args);
      }, debounceInterval);
    };
  };
})();
