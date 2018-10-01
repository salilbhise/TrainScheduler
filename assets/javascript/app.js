$(document).ready(function () {

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

    // Displaying current time new to train schedule 
    $("#currentTime").html(moment().format("hh:mm a"));

    // Create variable to reference database

    var database = firebase.database();

    var trainName = "";
    var dest = "";
    var firstTrainTime = "";
    var frequencyMin = 0;


    // Function to add train upon click
    $("#add-train").on("click", function (event) {

        event.preventDefault();

        trainName = $("#train-name").val().trim();
        dest = $("#destination").val().trim();
        firstTrainTime = $("#first-train-time").val();
        frequencyMin = $("#frequency-min").val().trim();

        $("#train-name").val("");
        $("#destination").val("");
        $("#first-train-time").val("");
        $("#frequency-min").val("");

        database.ref().push({
            trainName: trainName,
            destination: dest,
            firstTrainTime: firstTrainTime,
            frequencyMin: frequencyMin
        });
    });


    database.ref().on("child_added", function (childSnap) {

        // Gives the duration in minutes from the beginning of day until first train
        var firstTrainTimeVariable = moment.duration(childSnap.val().firstTrainTime).asMinutes()

        // Current time in hh:mm format
        var timeNow = moment().format("HH:mm");

        // Current time in minutes
        var currentMin = moment.duration(timeNow).asMinutes();

        // Minutes passed from first train time to current time
        var numMin = (moment.duration(timeNow).asMinutes() - firstTrainTimeVariable);

        // Frequency of trains
        var freq = childSnap.val().frequencyMin;

        // Time until next train
        var remaining = numMin % freq;

        // Minutes away from next train
        var minAway = freq - remaining;

        // Next train arrival in minutes
        var answer = currentMin + minAway;

        // Function that converts next train arrival minutes to hh:mm a
        function getTimeFromMin(mins) {
            if (mins >= 24 * 60 || mins < 0) {
            }
            var h = mins / 60 | 0;
            var m = mins % 60 | 0;

            return moment.utc().hours(h).minutes(m).format("hh:mm A");
        }

        $("#newTrains").find("tbody:last").after("<tr><td>" +
            childSnap.val().trainName + "</td><td>" +
            childSnap.val().destination + "</td><td>" +
            childSnap.val().frequencyMin + "</td><td>" +
            getTimeFromMin(answer) + "</td><td>" +
            minAway + "</td></tr>");

    }, function (errorObject) {
        console.log("Submit failed: " + errorObject.code)
    });
});
