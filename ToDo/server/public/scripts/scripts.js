// start display hidden
document.getElementById("clickShow").style.display = " none ";


//appname
document.getElementById("appName1").innerHTML =
"navigator.appName is " + navigator.appName;
//codename
document.getElementById("codeName1").innerHTML =
"navigator.appCodeName is " + navigator.appCodeName;
//enging
document.getElementById("broEng").innerHTML =
"navigator.product is " + navigator.product;
//Version
document.getElementById("broVer").innerHTML = navigator.appVersion;
//url
document.getElementById("pagURL").innerHTML =
"Page location is " + window.location.href;
//host
document.getElementById("pagHost").innerHTML =
"Page hostname is " + window.location.hostname;
//port
document.getElementById("pagPort").innerHTML =
"Port number is " + window.location.port;
//showing the stuff button
function showButton() {
    var x = document.getElementById('clickShow');
    if (x.style.display === 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
}
// Music Area
var myMusic  = [];

function insert(){

var titleInput = document.getElementById('song').value;
var artistInput = document.getElementById('artist').value;
var song = {
  name:titleInput,
  artist:artistInput
  };
  myMusic[myMusic.length] = song;
  var display = "<b>El Music List</b><br>";

for(var i = 0; i < myMusic.length; i++) {
     display +=  '<span class="song-name">' + myMusic[i].name + '</span><span class="artist" >' + myMusic[i].artist + '</span><br>';
  }

document.getElementById('wareeny').innerHTML = display;
}

var monthNames = ["January", "February", "March", "April", "May", "June",
 "July", "August", "September", "October", "November", "December"];
 
 /*
 getDate()
 getMonth()
 getFullYear()
*/
var parse = function() {
    
var date =  document.getElementById("datee").value;
var d = new Date(date);
document.getElementById("wtff").innerHTML = "the java script date is : " +  d;

var today = new Date();
var morsy = 
(today.getTime() - d.getTime()) / 86400000;
var n = morsy.toFixed(0);
document.getElementById("wtff2").innerHTML = "the date diff is " + n;


document.getElementById("wtff3").innerHTML = "Pretty Date :" + monthNames[d.getMonth()] + "    " +  d.getDate() + ", " + d.getFullYear();


};





















