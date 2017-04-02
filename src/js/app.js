var Player = Player || {};

Player.init = function init() {
  Player.data          = [];
  Player.mainElement   = document.getElementsByTagName('main')[0];
  Player.listContainer = document.createElement('ul');
  Player.header        = document.getElementsByClassName('header')[0];
  Player.headerTitle   = document.getElementsByClassName('header__heading')[0];
  Player.apiUrl        = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails,status&maxResults=10&playlistId=PLSi28iDfECJPJYFA4wjlF5KUucFvc0qbQ&key=AIzaSyCuv_16onZRx3qHDStC-FUp__A6si-fStw';

  Player.getData();
  Player.keyboardNavigation(Player.data);
};

Player.getData = function getData() {
  const req = new XMLHttpRequest();
  req.open('GET', Player.apiUrl);
  req.onload = function() {
    if (req.status === 200) {
      const jsonResponse = JSON.parse(req.responseText);
      Player.data.push(jsonResponse.items);
      Player.appendDataToPage();
    } else {
      console.log('Request failed. Retuened status of ' + req.status);
    }
  };
  req.send();
};

Player.appendDataToPage = function appendDataToPage() {
  Player.listContainer.classList.add('list');
  Player.mainElement.appendChild(Player.listContainer);
  Player.createTile();
};

Player.createTile = function createTile() {
  Player.data[0].forEach(function(data, index) {
    const li = document.createElement('li');
    Player.setElementAttributes(li, {'id': index, 'tabindex': '0', 'role': 'link', 'class': 'list__item col-s-9 col-m-8 col-l-7'});
    Player.addTitle(data, li);
  });
};

Player.addClass = function addClass(li, element, listClass, showClass) {
  li.classList.contains('list__item') ? element.classList.add(listClass) : element.classList.add(showClass);
};

Player.addTitle = function addTitle(data, li) {
  const title = document.createElement('h2');
  Player.addClass(li, title, 'list__item--title', 'show__item--title');
  title.innerHTML = data.snippet.title;
  li.appendChild(title);
  Player.convertDate(data, li);
};

Player.convertDate = function convertData(data, li) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const date = new Date(data.snippet.publishedAt);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const convertedDateString = 'Published on ' + day + ' ' + months[monthIndex] + ', ' + year;
  Player.addPublished(convertedDateString, data, li);
};

Player.addPublished = function addPublished(date, data, li) {
  const published = document.createElement('h3');
  Player.addClass(li, published, 'list__item--published', 'show__item--published');
  published.innerHTML = date;
  li.appendChild(published);
  li.classList.contains('show__item') ? Player.addVideo(data, li) : Player.addDescription(data, li);
};

Player.addVideo = function addVideo(data, li) {
  const videoId = data.contentDetails.videoId;
  const iframe = document.createElement('iframe');
  iframe.classList.add('show__item--iframe');
  iframe.src = 'https://www.youtube.com/embed/' + videoId;
  li.appendChild(iframe);
  Player.addDescription(data, li);
};

Player.addDescription = function addDescription(data, li) {
  const pElement = document.createElement('p');
  Player.addClass(li, pElement, 'list__item--description', 'show__item--description');
  pElement.innerHTML = data.snippet.description;
  li.appendChild(pElement);
  Player.checkText(li, pElement);
  if (li.classList.contains('list__item')) Player.addThumbnail(data, li);
};

Player.checkText = function checkText(li, element) {
  if(li.classList.contains('list__item') && element.innerHTML.length >123) element.innerHTML = element.innerHTML.substring(0,123)+'...';
};

Player.addThumbnail = function addThumbnail(data, li) {
  const img = document.createElement('img');
  img.classList.add('list__item--img');
  img.src = data.snippet.thumbnails.high.url;
  img.alt = data.snippet.title + ' Album artwork';
  li.appendChild(img);
  Player.appendTileToPage(data, li);
};

Player.appendTileToPage = function appendTileToPage(data, li) {
  Player.listContainer.append(li);

  li.addEventListener('click', function() {
    Player.openShowPage(data);
  });

  li.addEventListener('mouseover', function(e) {
    const lis = Player.listContainer.childNodes;
    lis.forEach(function(li) {
      if(li.id !== e.target.id) {
        li.style.opacity = '.2';
      }
    });
  });

  li.addEventListener('mouseout', function() {
    const lis = Player.listContainer.childNodes;
    lis.forEach(function(li) {
      li.style.opacity = '1';
    });
  });
};

Player.openShowPage = function openShowPage(data) {
  Player.mainElement.innerHTML = '';
  Player.backToButton();
  const ul = document.createElement('ul');
  Player.mainElement.appendChild(ul);
  ul.classList.add('show');
  const li = document.createElement('li');
  li.classList.add('show__item');
  ul.appendChild(li);
  Player.addTitle(data, li);
};

Player.backToButton = function backToButton() {
  Player.headerTitle.style.display = 'none';
  const button = document.createElement('button');
  button.classList.add('button');
  button.setAttribute('tabindex', '0');
  button.innerHTML = '< Back to list of videos';
  Player.header.appendChild(button);
  button.addEventListener('click', function() {
    Player.mainElement.innerHTML = '';
    button.style.display = 'none';
    Player.headerTitle.style.display = 'block';
    Player.mainElement.appendChild(Player.listContainer);
  });
};

Player.keyboardNavigation = function keyboardNavigation(data) {
  document.addEventListener('keydown', function(e){
    if (e.keyCode === 9 && document.activeElement.id === 9) {
      document.activeElement.parentNode.firstChild.nextSibling.focus();
    }
    if (e.keyCode === 13 && document.activeElement.classList.contains('list__item')) {
      var i = document.activeElement.id;
      var data2 = data[0][i];
      Player.openShowPage(data2);
    }
    Player.checkClass(e);
  });
};

Player.checkClass = function checkClass(e) {
  var ul = document.getElementsByTagName('ul')[0];
  if (ul.classList.contains('show') && e.keyCode === 9) {
    setTimeout(function(){
      document.getElementsByClassName('button')[0].focus();
    },0);
  }
};

Player.setElementAttributes = function setElementAttributes(element, attributes) {
  for(var key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

Player.init();
