(function(bookmarkFolder, displayFavicons) {
  function updateClock() {
    Date.getMinutesTwoDigits = function() {
      var retval = now.getMinutes();
      if (retval < 10) return ("0" + retval.toString());
      else return retval.toString();
    }
    Date.getHoursModTwelve = function() {
      var retval = now.getHours();
      retval = retval%12;
      if (retval == 0) retval = 12;
      return retval;
    }
    var now = new Date(),
        time = Date.getHoursModTwelve() + ':' + Date.getMinutesTwoDigits();
    document.getElementById('time').innerHTML = ["", time].join('');
    setTimeout(updateClock, 1000);
  }

  function addSearch(elementId, callback) {
    var elem = document.getElementById(elementId);
    elem.addEventListener('keypress', function(evt) {
      if (evt.keyCode == 13) {
        callback(elem.value);
      }
    });
  }

  function _makeDelayed() {
    var timer = 0;
    return function(callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  }

  function getFavicon(url) {
    domainInfo = /https?:\/\/([^\/]+)/.exec(url);
    if (domainInfo) {
      return 'https://plus.google.com/_/favicon?domain=' + domainInfo[1];
    }
  }

  function createRow(bookmarks) {
    var row = document.createElement('tr');
    for (var i = 0, l = bookmarks.length; i < l; i++) {
      var td = document.createElement('td');
      var link = document.createElement('a');
      if (displayFavicons) {
        faviconUrl = getFavicon(bookmarks[i].url);
        if (faviconUrl) {
          var img = document.createElement('img');
          img.src = getFavicon(bookmarks[i].url);
          link.appendChild(img);
          link.appendChild(document.createTextNode(' '));
        }
      }
      link.appendChild(document.createTextNode(bookmarks[i].title));
      link.href = bookmarks[i].url;
      td.appendChild(link);
      row.appendChild(td);
    }
    return row;
  }

  addSearch('search', function(s) {
    window.location.href = 'https://www.google.com/#q=' + s;
  });
  addSearch('gh-sr-issue', function(s) {
    window.location.href = 'https://github.com/squadrun/squadrun/issues/' + s;
  });
  addSearch('gh-sr-pull', function(s) {
    window.location.href = 'https://github.com/squadrun/squadrun/pull/' + s;
  });

  updateClock();
})('Favorites', false);
