/**
 * Created by zachma on 2/9/15.
 */

var recognizing = false;

if ('webkitSpeechRecognition' in window) {

    var recognition = new webkitSpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = function() {
        recognizing = true;
    };

    recognition.onerror = function(event) {
        console.log(event.error);
    };

    recognition.onend = function() {
        recognizing = false;
    };

    recognition.onresult = function(event) {


        // test for object structure
        var objectTest = "";

        for (var i = 0; i < event.results.length; i++) {
            objectTest += event.results[i][0].transcript;
            //objectTest += event.results[i].length + '|';
            //objectTest += event.results[i][0].confidence;

            //console.log( "i: " + i + "string: " + event.results[i][0].transcript );
        }

        console.log("objectTest: " + objectTest);

        if (recognizing)
            document.getElementById("objectTest_span").innerHTML = objectTest;

        if (objectTest.indexOf("stop") > -1) {
            console.log("before checking: recognizing = " + recognizing);
            recognizing = false;
        }


        if (objectTest.indexOf( "start" ) > -1)
            recognizing = true;

    };
}

//var two_line = /\n\n/g;
//var one_line = /\n/g;
//function linebreak(s) {
//    return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
//}

//function capitalize(s) {
//    return s.replace(s.substr(0,1), function(m) { return m.toUpperCase(); });
//}

function startDictation(event) {

    recognition.lang = 'en-US';
    recognition.start();

}