getData();

function getData(){
  var req = new XMLHttpRequest();
  req.open('GET', 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails,status&maxResults=10&playlistId=PLSi28iDfECJPJYFA4wjlF5KUucFvc0qbQ&key=AIzaSyCuv_16onZRx3qHDStC-FUp__A6si-fStw');
  req.onload = function() {
    if (req.status === 200) {
      var data = req.responseText;
      var jsonResponse = JSON.parse(data);
      setUpPage(jsonResponse.items);
    } else {
      console.log('Request failed.  Returned status of ' + req.status);
    }
  };
  req.send();
}

function setUpPage(data){
  var main = document.getElementById('main');
  var title = document.createElement('h1');
  var text = document.createTextNode('My YouTube Playlist');
  title.appendChild(text);
  main.appendChild(title);
  displayTile(main, data);
}

function displayTile(main, data){
  data.forEach(function(data){
    var div = document.createElement('div');
    div.classList.add('index');
    main.appendChild(div);
    addTitle(data, div);

  });
}

function addTitle(data, div){
  var title = document.createElement('h1');
  title.classList.add('title');
  var text = document.createTextNode(data.snippet.title);
  title.appendChild(text);
  div.appendChild(title);
  addPublished(data, div);
}

function addPublished(data, div){
  var published = document.createElement('p');
  published.classList.add('published');
  var text = document.createTextNode(data.contentDetails.videoPublishedAt);
  published.appendChild(text);
  div.appendChild(published);
  addDescription(data, div);
}

function addDescription(data, div){
  var description = document.createElement('p');
  description.classList.add('description');
  var text = document.createTextNode(data.snippet.description);
  description.appendChild(text);
  div.appendChild(description);
  checkText(description);
  addThumbnail(data, div);
}

function checkText(description){
  console.log(description.innerHTML.length);
  if(description.innerHTML.length >157) {
    description.innerHTML = description.innerHTML.substring(0,157)+'...';
  }
}

function addThumbnail(data, div){
  var img = document.createElement('img');
  img.src = data.snippet.thumbnails.default.url;
  div.appendChild(img);
}
