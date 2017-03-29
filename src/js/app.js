getData();

function getData(){
  var req = new XMLHttpRequest();
  req.open('GET', 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails,status&maxResults=10&playlistId=PLSi28iDfECJPJYFA4wjlF5KUucFvc0qbQ&key=AIzaSyCuv_16onZRx3qHDStC-FUp__A6si-fStw');
  req.onload = function() {
    if (req.status === 200) {
      var data = req.responseText;
      var jsonResponse = JSON.parse(data);
      setUpPage(jsonResponse.items);
      keyboardNavigation(jsonResponse.items);
    } else {
      console.log('Request failed.  Returned status of ' + req.status);
    }
  };
  req.send();
}

function setUpPage(data){
  console.log(data);
  var main = document.getElementById('main');
  var title = document.createElement('h1');
  // title.setAttribute('tabindex', '0');
  var parentDiv = document.createElement('ul');
  title.classList.add('playlist-text');
  var text = document.createTextNode('My YouTube playlist');
  title.appendChild(text);
  main.appendChild(parentDiv);
  parentDiv.appendChild(title);
  parentDiv.classList.add('parentDiv');
  // parentDiv.setAttribute('tabindex', '0');
  displayTile(parentDiv, data);
}


function keyboardNavigation(data){
  // console.log('data', data[2]);
  // document.addEventListener('keydown', function(e){
  //   if (e.keyCode === 9) {
  //     console.log('this', this);
  // var focus = document.activeElement;
  document.addEventListener('keydown', function(e){
    if (e.keyCode === 13) {
      console.log('active', document.activeElement);
      console.log('active id', document.activeElement.id);
      var i = document.activeElement.id;
      var data2 = data[i];
      // console.log(data2);
      listenerFunction(data2);
      // console.log('enter', activeElement.first);
      // document.activeElement.focus();
    }
  });
}
// });
// }

function displayTile(parentDiv, data){
  var idCounter = 0;
  data.forEach(function(data){
    var div = document.createElement('li');
    div.classList.add('list', 'col-s-9', 'col-m-7', 'col-l-7');
    div.setAttribute('id', idCounter++);
    div.setAttribute('tabindex', '0');
    div.setAttribute('role', 'link');
    parentDiv.appendChild(div);
    addListener(div, data);
    addTitle(data, div);
  });
}

function addTitle(data, div){
  var title = document.createElement('h1');
  title.classList.add('title');
  var text = document.createTextNode(data.snippet.title);
  title.appendChild(text);
  div.appendChild(title);
  setDate(data, div);
  // addPublished(data, div);
}

function setDate(data, div){
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  // var num = new DateTime(data.snippet.publishedAt);
  var date = new Date(data.snippet.publishedAt);
  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  var newDate = 'Published on ' + day + ' ' + months[monthIndex] + ', ' + year;
  console.log('new', newDate)
  addPublished(newDate, data, div);
}

function addListener(div, data){
  if (div) {
    div.onclick = function(){
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
  var div = document.createElement('div');
  div.classList.add('show');
  main.appendChild(div);
  addTitle(data, div);
}

function addVideo(data, div){
  var videoId = data.contentDetails.videoId;
  var iframe = document.createElement('iframe');
  iframe.classList.add('video');
  iframe.src = 'https://www.youtube.com/embed/' + videoId;
  div.appendChild(iframe);
  addDescription(data, div);
  setTimeout(checkiFrame.bind(null, iframe), 4000);
  // setTimeout(checkiFrame(iframe), 3000);
  // setTimeout('checkiFrame();', 100);
}

function checkiFrame(iframe){
  if (  iframe.readyState  === 200 ) {
    console.log('iframe has loaded');
  } else {
    console.log('iframe hasnt loaded');
  }
}

function backToButton(main){
  var button = document.createElement('button');
  button.innerHTML = '< Back to list of videos';
  main.appendChild(button);
  button.onclick = function() {
    main.innerHTML = '';
    getData();
  };
}

function addPublished(newDate, data, div){
  var published = document.createElement('p');
  published.classList.add('published');
  var text = document.createTextNode(newDate);
  published.appendChild(text);
  div.appendChild(published);
  if (div.classList.contains('show')){
    addVideo(data, div);
  } else {
    addDescription(data, div);
  }
}

function addDescription(data, div){
  var description = document.createElement('p');
  description.classList.add('description');
  var text = document.createTextNode(data.snippet.description);
  description.appendChild(text);
  div.appendChild(description);
  checkText(div, description);
  if (div.classList.contains('list')){
    addThumbnail(data, div);
  }
}

function checkText(div, description){
  if(div.classList.contains('list') && description.innerHTML.length >157) {
    description.innerHTML = description.innerHTML.substring(0,157)+'...';
  }
}

function addThumbnail(data, div){
  var img = document.createElement('img');
  img.src = data.snippet.thumbnails.default.url;
  img.alt = data.snippet.title + ' Album artwork';
  div.appendChild(img);
}
