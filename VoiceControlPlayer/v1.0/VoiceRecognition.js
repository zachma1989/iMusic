/**
 * Created by Zachary Ma on 3/14/2015.
 */

/**
 * Created by zachma on 2/9/15.
 */

// for storing all commands
var commands = [];

var recognizing = false;

if ('webkitSpeechRecognition' in window) {

    var recognition = new webkitSpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = function() {
        recognizing = false;
    };

    recognition.onerror = function(event) {
        console.log(event.error);
    };

    recognition.onend = function() {
        recognizing = false;
    };


    // for volume
    var volumeFlag = true;

    recognition.onresult = function(event) {

        // volume down player
        if ( volumeFlag ) {
            eventHandler("volume down");
            volumeFlag = false;
        }


        // for displaying on span
        var objectTest;

        for (var i = 0; i < event.results.length; i++) {

            objectTest += event.results[i][0].transcript;

            //// for testing the confidence value
            console.log( i + ": " + event.results[i][0].transcript + "|" + event.results[i][0].confidence + "|" + event.results[i].isFinal );
        }

        if (recognizing) {

            // display interim/fianl results to UI
            document.getElementById("objectTest_span").innerHTML = objectTest;



            var currentIndex = event.resultIndex;
            var commandIndex = commands.length;

            // add final results to command array
            if (event.results[currentIndex].isFinal) {

                eventHandler( "volume up" );
                volumeFlag = true;

                commands[commandIndex] = event.results[currentIndex][0].transcript.trim();

                var keyword;
                if ( commands[commandIndex].indexOf(" ") == -1 )
                    keyword = commands[commandIndex];
                else
                    keyword = commands[commandIndex].substring(0, commands[commandIndex].indexOf(" "));

                eventHandler( keyword );

                commands.length++;
            }
        }

        // for start recognition using voice keyword
        var lastStr = objectTest.substring(objectTest.lastIndexOf(" ") + 1, objectTest.length);

        if ( lastStr.toLowerCase() === "start") {
            recognizing = true;
        }



    };

}

function startDictation(event) {

    recognition.lang = 'en-US';
    recognition.start();

}

// To process all voice command
function eventHandler( keyword ) {

    console.log(commands);
    console.log( keyword );

    switch (keyword.toLowerCase()) {

        case "play":
            play();
            break;

        case "stop":
            stop();
            break;

        case "pause":
            pausePlayer();
            break;

        case "resume":
            resumePlayer();
            break;

        case "volume down":
            volumeDown();
            break;

        case "volume up":
            volumeUp();
            break;
    }

}