$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyDTFSWcLj0Urj4Nf6Ikh7ykm7p7yypTz9M",
        authDomain: "gs-trainschedule.firebaseapp.com",
        databaseURL: "https://gs-trainschedule.firebaseio.com",
        projectId: "gs-trainschedule",
        storageBucket: "gs-trainschedule.appspot.com",
        messagingSenderId: "1014043244790"
    };
    firebase.initializeApp(config);
    var database = firebase.database();

    $("#add-train-btn").click(function () {

        event.preventDefault();
        var trainName = $("#train-name-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var firstTrain = moment($("#time-nput").val(), "HH:mm").subtract(10, "years").format("X");
        var frequency = $("#freq-input").val().trim();

        var newTrain = {
            name: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
        }

        database.ref().push(newTrain);

        alert(newTrain.name + " has been added.");

        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#time-input").val("");
        $("#freq-input").val("");
    })

    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());

        // Store everything into a variable.
        var trainName = childSnapshot.val().name;
        var destination = childSnapshot.val().destination;
        var firstTrain = childSnapshot.val().firstTrain;
        var frequency = childSnapshot.val().frequency;

        var tFrequency = frequency
        var firstTime = firstTrain

        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % tFrequency;
        console.log(tRemainder);

        // Minute Until Train
        var tMinutesTillTrain = tFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(destination),
            $("<td>").text(frequency),
            $("<td>").text(nextTrain),
            $("<td>").text(nextTrain),
        );
        $("#train-table > tbody").append(newRow);

    })
})