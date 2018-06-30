'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  var dataUrl = URL + '/data';

  var createXhr = function (onSuccess, onError, method, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;
        case 400:
          error = 'Неверный запрос';
          break;
        case 401:
          error = 'Пользователь не авторизован';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;
        default:
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    if (method === 'GET') {
      xhr.open(method, dataUrl);
      xhr.send();
    } else {
      xhr.open(method, URL);
      xhr.send(data);
    }
  };

  window.backend = {
    load: function (onSuccess, onError) {
      createXhr(onSuccess, onError, 'GET');
    },
    save: function (data, onSuccess, onError) {
      createXhr(onSuccess, onError, 'POST', data);
    }
  };
})();
