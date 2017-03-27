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
  displayThumbnail(main, data);
}

function displayThumbnail(main, data){
  data.forEach(function(){
    var div = document.createElement('div');
    div.classList.add('index');
    main.appendChild(div);
  });
}
