var globalData = [];
getData();
hoverTile();
keyboardNavigation(globalData);

function getData(){
  var req = new XMLHttpRequest();
  req.open('GET', 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails,status&maxResults=10&playlistId=PLSi28iDfECJPJYFA4wjlF5KUucFvc0qbQ&key=AIzaSyCuv_16onZRx3qHDStC-FUp__A6si-fStw');
  req.onload = function() {
    if (req.status === 200) {
      var data = req.responseText;
      var jsonResponse = JSON.parse(data);
      setUpPage(jsonResponse.items);
      globalData.push(jsonResponse.items);
    } else {
      console.log('Request failed.  Returned status of ' + req.status);
    }
  };
  req.send();
}

function setUpPage(data){
  var main = document.getElementById('main');
  var parentDiv = document.createElement('div');
  main.appendChild(parentDiv);
  parentDiv.classList.add('parentDiv');
  createTile(parentDiv, data);
}


function keyboardNavigation(data){
  document.addEventListener('keydown', function(e){
    if (e.keyCode === 9 && document.activeElement.id === 9) {
      document.activeElement.parentNode.firstChild.nextSibling.focus();
    }
    if (e.keyCode === 13 && document.activeElement.classList.contains('list')) {
      var i = document.activeElement.id;
      var data2 = data[0][i];
      listenerFunction(data2);
    }
    checkClass(e);
  });
}

function checkClass(e){
  var ul = document.getElementsByTagName('ul')[0];
  if (ul.classList.contains('show') && e.keyCode === 9) {
    setTimeout(function(){
      document.getElementsByClassName('button')[0].focus();
    },0);
  }
}

function createTile(parentDiv, data){
  var idCounter = 0;
  data.forEach(function(data){
    var ul = document.createElement('ul');
    ul.classList.add('list', 'col-s-9', 'col-m-8', 'col-l-7');
    ul.setAttribute('id', idCounter++);
    ul.setAttribute('tabindex', '0');
    ul.setAttribute('role', 'ulnk');
    parentDiv.appendChild(ul);
    addListener(ul, data);
    addTitle(data, ul);
  });
}

function addTitle(data, ul){
  var title = document.createElement('li');
  addClass(ul, title, 'list__item--title', 'show__item--title');
  var text = document.createTextNode(data.snippet.title);
  title.appendChild(text);
  ul.appendChild(title);
  setDate(data, ul);
}

function setDate(data, ul){
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var date = new Date(data.snippet.publishedAt);
  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  var newDate = 'Published on ' + day + ' ' + months[monthIndex] + ', ' + year;
  addPublished(newDate, data, ul);
}

function addListener(ul, data){
  if (ul) {
    ul.onclick = function(){
      listenerFunction(data);
    };
  }
}

function listenerFunction(data) {
  var main = document.getElementById('main');
  main.innerHTML = '';
  openShowPage(main, data);
}

function openShowPage(main, data){
  backToButton(main);
  var parentDiv = document.createElement('div');
  parentDiv.classList.add('parentDiv');
  main.appendChild(parentDiv);
  var ul = document.createElement('ul');
  ul.classList.add('show');
  parentDiv.appendChild(ul);
  addTitle(data, ul);
  // checkiFrame();
}

function addVideo(data, ul){
  var li = document.createElement('li');
  li.classList.add('show__item');
  var videoId = data.contentDetails.videoId;
  var iframe = document.createElement('iframe');
  iframe.classList.add('show__item--iframe');
  iframe.src = 'https://www.youtube.com/embed/' + videoId;
  li.appendChild(iframe);
  ul.appendChild(li);
  addDescription(data, ul);
}

function backToButton(main){
  var button = document.createElement('button');
  button.classList.add('button');
  button.setAttribute('tabindex', '0');
  button.innerHTML = '< Back to list of videos';
  main.appendChild(button);
  button.onclick = function() {
    main.innerHTML = '';
    getData();
  };
}

function addPublished(newDate, data, ul){
  var published = document.createElement('li');
  addClass(ul, published, 'list__item--published', 'show__item--published');
  var text = document.createTextNode(newDate);
  published.appendChild(text);
  ul.appendChild(published);
  if (ul.classList.contains('show')){
    addVideo(data, ul);
  } else {
    addDescription(data, ul);
  }
}

function addDescription(data, ul){
  var description = document.createElement('li');
  addClass(ul, description, 'list__item--description', 'show__item--description');
  var text = document.createTextNode(data.snippet.description);
  description.appendChild(text);
  ul.appendChild(description);
  checkText(ul, description);
  if (ul.classList.contains('list')){
    addThumbnail(data, ul);
  }
}

function checkText(ul, description){
  if(ul.classList.contains('list') && description.innerHTML.length >123) {
    description.innerHTML = description.innerHTML.substring(0,123)+'...';
  }
}

function addThumbnail(data, ul){
  var li = document.createElement('li');
  var img = document.createElement('img');
  img.classList.add('list__item--img');
  li.appendChild(img);
  img.src = data.snippet.thumbnails.high.url;
  img.alt = data.snippet.title + ' Album artwork';
  ul.appendChild(li);
}

function addClass(ul, element, listClass, showClass) {
  if (ul.classList.contains('list')) {
    element.classList.add(listClass);
  } else {
    element.classList.add(showClass);
  }
}

function hoverTile() {
  const container = document.getElementsByTagName('main')[0];
  // console.log(container);
}
