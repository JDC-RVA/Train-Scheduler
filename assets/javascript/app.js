$(document).ready(function(){
    var config = {
        apiKey: "AIzaSyAB5FEd_EVUYitBm1vU0ecQblf0e9OU-4M",
        authDomain: "test-9fb34.firebaseapp.com",
        databaseURL: "https://test-9fb34.firebaseio.com",
        projectId: "test-9fb34",
        storageBucket: "test-9fb34.appspot.com",
        messagingSenderId: "575791419854"
      };
    firebase.initializeApp(config);

    // A variable to reference the database.
    var database = firebase.database();

    // Variables for the onClick event
    var name;
    var destination;
    var firstTrain;
    var frequency = 0;

    function currentTime() {
        var current = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
        $("#currentTime").text(current);
        setTimeout(currentTime, 1000);
      };

      currentTime();

    $("#add-train").on("click", function() {
        event.preventDefault();
        // Storing and retreiving new train data
        name = $("#train-name").val().trim();
        destination = $("#destination").val().trim();
        firstTrain = $("#first-train").val().trim();
        frequency = $("#frequency").val().trim();

        // Pushing to database
        database.ref().push({
            name: name,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        $("form")[0].reset();
    });

    database.ref().on("child_added", function(snapshot) {
        var minAway;
        // Change year so first train comes before now
        var firstTrainNew = moment(snapshot.val().firstTrain, "hh:mm").subtract(1, "years");

        // Difference between the current and firstTrain
        var timeDifference = moment().diff(moment(firstTrainNew), "minutes");
        var remainder = timeDifference % snapshot.val().frequency;

        // Minutes until next train
        var minAway = snapshot.val().frequency - remainder;
        // Next train time
        var nextTrain = moment().add(minAway, "minutes");
        nextTrain = moment(nextTrain).format("hh:mm");

        $("#add-row").append("<tr><td>" + snapshot.val().name +
                "</td><td>" + snapshot.val().destination +
                "</td><td>" + snapshot.val().frequency +
                "</td><td>" + nextTrain + 
                "</td><td>" + minAway + "</td></tr>");

            // Handle the errors
        }, function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
    });
});