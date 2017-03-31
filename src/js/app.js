var globalData = [];
getData();
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

console.log('data array', globalData);
function setUpPage(data){
  console.log(data);
  var main = document.getElementById('main');
  var title = document.createElement('h1');
  // title.setAttribute('tabindex', '0');
  var parentDiv = document.createElement('div');
  title.classList.add('playlist-text');
  var text = document.createTextNode('My YouTube playlist');
  title.appendChild(text);
  main.appendChild(parentDiv);
  parentDiv.appendChild(title);
  parentDiv.classList.add('parentDiv');
  // parentDiv.setAttribute('tabindex', '0');
  createTile(parentDiv, data);
}


function keyboardNavigation(data){
  document.addEventListener('keydown', function(e){
    checkClass(e);
    if (document.activeElement.id == 9) {
      console.log('after 9', document.activeElement.parentNode.firstChild.nextSibling);
      document.activeElement.parentNode.firstChild.nextSibling.focus();
    }
    console.log('active', window.activeElement);
    if (e.keyCode === 13 && document.activeElement.classList.contains('list')) {
      console.log('active', document.activeElement);
      console.log('active id', document.activeElement.id);
      var i = document.activeElement.id;
      var data2 = data[0][i];
      listenerFunction(data2);
    }
  });
}


function checkClass(e){
  var ul = document.getElementsByTagName('ul')[0];

  console.log('show ul', ul);
  if (ul.classList.contains('show') && e.keyCode === 9) {
    setTimeout(function(){
      document.getElementsByClassName('button')[0].focus();
    },0);
    // console.log('button', document.getElementsByClassName('button')[0])

    // backButton.focus();
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
  if (ul.classList.contains('list')) {
    title.classList.add('list__item--title');
  } else {
    title.classList.add('show__item--title');
  }
  var text = document.createTextNode(data.snippet.title);
  title.appendChild(text);
  ul.appendChild(title);
  setDate(data, ul);
  // addPublished(data, div);
}

function setDate(data, ul){
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var date = new Date(data.snippet.publishedAt);
  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  var newDate = 'Published on ' + day + ' ' + months[monthIndex] + ', ' + year;
  console.log('new', newDate);
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
  var ul = document.createElement('ul');
  ul.classList.add('show');
  main.appendChild(ul);
  addTitle(data, ul);
}

function addVideo(data, ul){
  console.log('getting here');
  var li = document.createElement('li');
  li.classList.add('show__item');
  var videoId = data.contentDetails.videoId;
  var iframe = document.createElement('iframe');
  iframe.classList.add('show__item--iframe');
  iframe.src = 'https://www.youtube.com/embed/' + videoId;
  li.appendChild(iframe);
  ul.appendChild(li);
  addDescription(data, ul);
  // setTimeout(checkiFrame.bind(null, iframe), 4000);
  // setTimeout(checkiFrame(iframe), 3000);
  // setTimeout('checkiFrame();', 100);
}

// function checkiFrame(iframe){
//   if (  iframe.readyState  === 200 ) {
//     console.log('iframe has loaded');
//   } else {
//     console.log('iframe hasnt loaded');
//   }
// }

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
  if (ul.classList.contains('list')) {
    published.classList.add('list__item--published');
  } else {
    published.classList.add('show__item--published');
  }
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
  if (ul.classList.contains('list')) {
    description.classList.add('list__item--description');
  } else {
    description.classList.add('show__item--description');
  }
  var text = document.createTextNode(data.snippet.description);
  description.appendChild(text);
  ul.appendChild(description);
  checkText(ul, description);
  if (ul.classList.contains('list')){
    addThumbnail(data, ul);
  }
}

function checkText(ul, description){
  if(ul.classList.contains('list') && description.innerHTML.length >157) {
    description.innerHTML = description.innerHTML.substring(0,157)+'...';
  }
}

function addThumbnail(data, ul){
  var li = document.createElement('li');
  var img = document.createElement('img');
  img.classList.add('list__item--img');
  li.appendChild(img);
  img.src = data.snippet.thumbnails.default.url;
  img.alt = data.snippet.title + ' Album artwork';
  ul.appendChild(li);
}
