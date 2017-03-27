getData();

function getData(){
  var req = new XMLHttpRequest();
  req.open('GET', 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails,status&maxResults=10&playlistId=PLSi28iDfECJPJYFA4wjlF5KUucFvc0qbQ&key=AIzaSyCuv_16onZRx3qHDStC-FUp__A6si-fStw');
  req.onload = function() {
    if (req.status === 200) {
      var data = req.responseText;
      var jsonResponse = JSON.parse(data);
      console.log(jsonResponse);
    } else {
      console.log('Request failed.  Returned status of ' + req.status);
    }
  };
  req.send();
}
