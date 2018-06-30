'use strict';

(function () {
  var errorContainer;

  window.error = {
    create: function (errorMessage) {
      errorContainer = document.createElement('div');
      errorContainer.style = 'position: fixed; z-index: 100; left: 50%; top: 50%; text-align: center; font-size: 36px; background-color: crimson; color: white; padding: 15px; transform: translate(-50%, -50%)';
      errorContainer.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', errorContainer);
      setTimeout(window.error.delete, 5000);
    },
    delete: function () {
      if (errorContainer) {
        errorContainer.remove();
      }
    }
  };
})();
