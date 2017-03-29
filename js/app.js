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
  console.log(data);
  var main = document.getElementById('main');
  var title = document.createElement('h1');
  title.setAttribute('tabindex', '0');
  var parentDiv = document.createElement('div');
  title.classList.add('playlist-text');
  var text = document.createTextNode('My YouTube playlist');
  title.appendChild(text);
  main.appendChild(parentDiv);
  parentDiv.appendChild(title);
  parentDiv.classList.add('parentDiv');
  parentDiv.setAttribute('tabindex', '0');
  displayTile(parentDiv, data);
}


function keyboardNavigation(){
  document.activeElement.parentNode.focus();
  document.addEventListener('keydown', function(e){
    if (e.keyCode === 9) {
      // document.activeElement.nextSibling.focus();
      console.log('next', document.activeElement)
    }
    console.log('active', document.activeElement);
  });
}

// function keyboardNavigation(){
//   var div = document.getElementById('0');
//   document.addEventListener('keydown', function(e){
//     e.preventDefault();
//     var code = e.keyCode || e.which;
//     if (code === 9){
//       div.focus();
//       div.classList.add('selected');
//       // console.log(div.nextElementSibling);
//     }
//     arrowKeys();
//   });
// }

function arrowKeys(){
  var parentDiv = document.getElementsByClassName('parentDiv')[0]; // targets the <ul>
  var first = parentDiv.firstChild;
  console.log('active', document.activeElement)
  console.log('first', first)
  document.addEventListener('keydown', function(e){
    e.preventDefault();
    if (e.keyCode === 9) {
      console.log('after press', document.activeElement.parentNode.firstChild.nextSibling)
    }
  });
  //   // console.log('div', div.id)
  //   // var previous = div;
  //   // console.log('previous', selected.id);
  //   var selected = document.getElementsByClassName('selected')[0];
  //   console.log('selected', selected);
  //   document.addEventListener('keydown', function(e){
  //     e.preventDefault();
  //     var code = e.keyCode || e.which;
  //     if (code === 40 && selected.id < 9) {
  //       var next = selected.nextElementSibling;
  //       console.log(next)
  //       console.log('first next', next)
  //       // next.focus();
  //       console.log('selected', selected)
  //       console.log('next', next)
  //       selected.classList.remove('selected');
  //       next.classList.add('selected');
  //       addListener();
  //     } else if (code === 38){
  //       console.log('end');
  //     }
  //   });
}


//   var divSelected;
//   document.addEventListener('keydown', function(e) {
//     if(e.keyCode === 40){
//       if(divSelected){
//         divSelected.removeClass('selected');
//         var next = divSelected.nextElementSibling;
//         if(next.length > 0){
//           divSelected = next.addClass('selected');
//         } else {
//           console.log('no');
//         }
//       }
//     }
//   });
// }



// function arrowKeys() {
//   console.log('getting here')
//   var parentDiv = document.getElementsByClassName('parentDiv')[0]; // targets the <ul>
//   var first = parentDiv.firstChild; // targets the first <li>
//   // var maininput = document.getElementById('input');  // targets the input, which triggers the functions populating the list
//   document.onkeydown = function(e) { // listen to keyboard events
//     switch (e.keyCode) {
//       case 38: // if the UP key is pressed
//         if (document.activeElement == (first)) { break; } // stop the script if the focus is on the input or first element
//         else { document.activeElement.parentNode.previousSibling.firstChild.focus(); } // select the element before the current, and focus it
//         break;
//       case 40: // if the DOWN key is pressed
//         if (document.activeElement == parentDiv) { first.firstChild.focus(); } // if the currently focused element is the main input --> focus the first <li>
//         else { document.activeElement.parentNode.nextSibling.firstChild.focus(); } // target the currently focused element -> <a>, go up a node -> <li>, select the next node, go down a node and focus it
//       break;
//     }
//   }
// }


function displayTile(parentDiv, data){
  var idCounter = 0;
  data.forEach(function(data){
    var div = document.createElement('div');
    div.classList.add('list', 'col-s-9', 'col-m-7', 'col-l-7');
    div.setAttribute('id', idCounter++);
    div.setAttribute('tabindex', '0');
    parentDiv.appendChild(div);
    addListener(div, data);
    addTitle(data, div);
  });
  keyboardNavigation();
}

function addTitle(data, div){
  var title = document.createElement('h1');
  title.classList.add('title');
  var text = document.createTextNode(data.snippet.title);
  title.appendChild(text);
  div.appendChild(title);
  // setDate(data, div);
  addPublished(data, div);
}

// function setDate(data, div){
//   var num = document.createTextNode(data.snippet.publishedAt);
//   // console.log(num)
//   var numS = num.split(0,3);
//   // var month = num.getMonth();
//   console.log(numS);
//   // var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//   // var splitDate = date.indexOf('T');
//   // var newDate = num.substring(0, 9);
//   // var newDate = date.substr(0,9);
//   // console.log(newDate)
//   // var newDate = num.substr(num.indexOf('T'));
// }

function addListener(div, data){
  if (div) {
    div.onclick = function(){
      var main = document.getElementById('main');
      main.innerHTML = '';
      openShowPage(main, data);
    };
  }
}


// selected.addEventListener('keydown', function(e){
//   if (e.keyCode === 37) {
//     var main = document.getElementById('main');
//     main.innerHTML = '';
//     openShowPage(main, data);
//   }
// });
// }

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
  if (  iframe.readyState  == 200 ) {
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

function addPublished(data, div){
  var published = document.createElement('p');
  published.classList.add('published');
  var text = document.createTextNode(data.contentDetails.videoPublishedAt);
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
