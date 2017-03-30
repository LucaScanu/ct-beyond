"use strict";function getData(){var e=new XMLHttpRequest;e.open("GET","https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails,status&maxResults=10&playlistId=PLSi28iDfECJPJYFA4wjlF5KUucFvc0qbQ&key=AIzaSyCuv_16onZRx3qHDStC-FUp__A6si-fStw"),e.onload=function(){if(200===e.status){var t=e.responseText,n=JSON.parse(t);setUpPage(n.items),globalData.push(n.items)}else console.log("Request failed.  Returned status of "+e.status)},e.send()}function setUpPage(e){console.log(e);var t=document.getElementById("main"),n=document.createElement("h1"),a=document.createElement("div");n.classList.add("playlist-text");var i=document.createTextNode("My YouTube playlist");n.appendChild(i),t.appendChild(a),a.appendChild(n),a.classList.add("parentDiv"),createTile(a,e)}function keyboardNavigation(e){console.log("data keyboard",e),document.addEventListener("keydown",function(t){if(9==document.activeElement.id&&(console.log("after 9",document.activeElement.parentNode.firstChild.nextSibling),document.activeElement.parentNode.firstChild.nextSibling.focus()),console.log("active",window.activeElement),13===t.keyCode&&document.activeElement.classList.contains("list")){console.log("active",document.activeElement),console.log("active id",document.activeElement.id);var n=document.activeElement.id;listenerFunction(e[0][n])}})}function createTile(e,t){var n=0;t.forEach(function(t){var a=document.createElement("div");a.classList.add("list","col-s-9","col-m-7","col-l-7"),a.setAttribute("id",n++),a.setAttribute("tabindex","0"),a.setAttribute("role","link"),e.appendChild(a),addListener(a,t),addTitle(t,a)})}function addTitle(e,t){var n=document.createElement("h1");n.classList.add("title");var a=document.createTextNode(e.snippet.title);n.appendChild(a),t.appendChild(n),setDate(e,t)}function setDate(e,t){var n=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],a=new Date(e.snippet.publishedAt),i=a.getDate(),o=a.getMonth(),d=a.getFullYear(),l="Published on "+i+" "+n[o]+", "+d;console.log("new",l),addPublished(l,e,t)}function addListener(e,t){e&&(e.onclick=function(){listenerFunction(t)})}function listenerFunction(e){var t=document.getElementById("main");t.innerHTML="",openShowPage(t,e)}function openShowPage(e,t){backToButton(e);var n=document.createElement("div");n.classList.add("show"),e.appendChild(n),addTitle(t,n)}function addVideo(e,t){var n=e.contentDetails.videoId,a=document.createElement("iframe");a.classList.add("video"),a.src="https://www.youtube.com/embed/"+n,t.appendChild(a),addDescription(e,t),setTimeout(checkiFrame.bind(null,a),4e3)}function checkiFrame(e){200===e.readyState?console.log("iframe has loaded"):console.log("iframe hasnt loaded")}function backToButton(e){var t=document.createElement("button");t.innerHTML="< Back to list of videos",e.appendChild(t),t.onclick=function(){e.innerHTML="",getData()}}function addPublished(e,t,n){var a=document.createElement("p");a.classList.add("published");var i=document.createTextNode(e);a.appendChild(i),n.appendChild(a),n.classList.contains("show")?addVideo(t,n):addDescription(t,n)}function addDescription(e,t){var n=document.createElement("p");n.classList.add("description");var a=document.createTextNode(e.snippet.description);n.appendChild(a),t.appendChild(n),checkText(t,n),t.classList.contains("list")&&addThumbnail(e,t)}function checkText(e,t){e.classList.contains("list")&&t.innerHTML.length>157&&(t.innerHTML=t.innerHTML.substring(0,157)+"...")}function addThumbnail(e,t){var n=document.createElement("img");n.src=e.snippet.thumbnails.default.url,n.alt=e.snippet.title+" Album artwork",t.appendChild(n)}var globalData=[];getData(),keyboardNavigation(globalData),console.log("data array",globalData);