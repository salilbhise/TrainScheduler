$(document).ready(function(){

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCzFM_4aP6m-4lzU0EB0UsZw29YAwXm3XU",
    authDomain: "train-scheduler-bf22d.firebaseapp.com",
    databaseURL: "https://train-scheduler-bf22d.firebaseio.com",
    projectId: "train-scheduler-bf22d",
    storageBucket: "train-scheduler-bf22d.appspot.com",
    messagingSenderId: "52621676133"
  };

  firebase.initializeApp(config);
  
  // Create variable to reference database
  var database = firebase.database();

  // Setting a listener on submit to validate form 
  $("#submit").on("click", function (event) {
	event.preventDefault();

  





}); 