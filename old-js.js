// var globalData = [];
// getData();
// hoverTile();
// keyboardNavigation(globalData);
//
// function getData(){
//   var req = new XMLHttpRequest();
//   req.open('GET', 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails,status&maxResults=10&playlistId=PLSi28iDfECJPJYFA4wjlF5KUucFvc0qbQ&key=AIzaSyCuv_16onZRx3qHDStC-FUp__A6si-fStw');
//   req.onload = function() {
//     if (req.status === 200) {
//       var data = req.responseText;
//       var jsonResponse = JSON.parse(data);
//       setUpPage(jsonResponse.items);
//       globalData.push(jsonResponse.items);
//     } else {
//       console.log('Request failed.  Returned status of ' + req.status);
//     }
//   };
//   req.send();
// }
//
// function setUpPage(data){
//   var main = document.getElementById('main');
//   var ul = document.createElement('ul');
//   main.appendChild(ul);
//   ul.classList.add('list');
//   createTile(ul, data);
// }
//
//
// function keyboardNavigation(data){
//   document.addEventListener('keydown', function(e){
//     if (e.keyCode === 9 && document.activeElement.id === 9) {
//       document.activeElement.parentNode.firstChild.nextSibling.focus();
//     }
//     if (e.keyCode === 13 && document.activeElement.classList.contains('list__item')) {
//       var i = document.activeElement.id;
//       var data2 = data[0][i];
//       listenerFunction(data2);
//     }
//     checkClass(e);
//   });
// }
//
// function checkClass(e){
//   var ul = document.getElementsByTagName('ul')[0];
//   if (ul.classList.contains('show') && e.keyCode === 9) {
//     setTimeout(function(){
//       document.getElementsByClassName('button')[0].focus();
//     },0);
//   }
// }
//
// function createTile(ul, data){
//   var idCounter = 0;
//   data.forEach(function(data, index){
//     var li = document.createElement('li');
//     li.classList.add('list__item', 'col-s-9', 'col-m-8', 'col-l-7');
//     li.setAttribute('id', index+!);
//     li.setAttribute('tabindex', '0');
//     li.setAttribute('role', 'link');
//     ul.appendChild(li);
//     addListener(li, data);
//     addTitle(data, li);
//   });
// }
//
// function addTitle(data, li){
//   var title = document.createElement('h2');
//   addClass(li, title, 'list__item--title', 'show__item--title');
//   var text = document.createTextNode(data.snippet.title);
//   title.appendChild(text);
//   li.appendChild(title);
//   setDate(data, li);
// }
//
// function setDate(data, li){
//   var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//   var date = new Date(data.snippet.publishedAt);
//   var day = date.getDate();
//   var monthIndex = date.getMonth();
//   var year = date.getFullYear();
//   var newDate = 'Published on ' + day + ' ' + months[monthIndex] + ', ' + year;
//   addPublished(newDate, data, li);
// }
//
// function addListener(li, data){
//   if (li) {
//     li.onclick = function(){
//       listenerFunction(data);
//     };
//   }
// }
//
// function listenerFunction(data) {
//   var main = document.getElementById('main');
//   main.innerHTML = '';
//   openShowPage(main, data);
// }
//
// function openShowPage(main, data){
//   backToButton(main);
//   var ul = document.createElement('ul');
//   // ul.classList.add('ul');§
//   main.appendChild(ul);
//   // var ul = document.createElement('ul');
//   ul.classList.add('show');
//   var li = document.createElement('li');
//   li.classList.add('show__item');
//   ul.appendChild(li);
//   // parentDiv.appendChild(ul);
//   addTitle(data, li);
//   // checkiFrame();
// }
//
// function addVideo(data, li){
//   // var li = document.createElement('li');
//   // li.classList.add('show__item');
//   var videoId = data.contentDetails.videoId;
//   var iframe = document.createElement('iframe');
//   iframe.classList.add('show__item--iframe');
//   iframe.src = 'https://www.youtube.com/embed/' + videoId;
//   // li.appendChild(iframe);
//   li.appendChild(iframe);
//   addDescription(data, li);
// }
//
// function backToButton(main){
//   var button = document.createElement('button');
//   button.classList.add('button');
//   button.setAttribute('tabindex', '0');
//   button.innerHTML = '< Back to list of videos';
//   main.appendChild(button);
//   button.onclick = function() {
//     main.innerHTML = '';
//     getData();
//   };
// }
//
// function addPublished(newDate, data, li){
//   var published = document.createElement('h3');
//   addClass(li, published, 'list__item--published', 'show__item--published');
//   var text = document.createTextNode(newDate);
//   published.appendChild(text);
//   li.appendChild(published);
//   if (li.classList.contains('show__item')){
//     addVideo(data, li);
//   } else {
//     addDescription(data, li);
//   }
// }
//
// function addDescription(data, li){
//   var description = document.createElement('p');
//   addClass(li, description, 'list__item--description', 'show__item--description');
//   var text = document.createTextNode(data.snippet.description);
//   description.appendChild(text);
//   li.appendChild(description);
//   checkText(li, description);
//   if (li.classList.contains('list__item')){
//     addThumbnail(data, li);
//   }
// }
//
// function checkText(li, description){
//   if(li.classList.contains('list__item') && description.innerHTML.length >123) {
//     description.innerHTML = description.innerHTML.substring(0,123)+'...';
//   }
// }
//
// function addThumbnail(data, li){
//   var img = document.createElement('img');
//   img.classList.add('list__item--img');
//   img.src = data.snippet.thumbnails.high.url;
//   img.alt = data.snippet.title + ' Album artwork';
//   li.appendChild(img);
// }
//
// function addClass(li, element, listClass, showClass) {
//   if (li.classList.contains('list__item')) {
//     element.classList.add(listClass);
//   } else {
//     element.classList.add(showClass);
//   }
// }
//
// function hoverTile() {
//   const container = document.getElementsByTagName('main')[0];
//   // console.log(container);
// }
