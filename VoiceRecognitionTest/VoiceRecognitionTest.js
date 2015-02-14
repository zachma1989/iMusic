/**
 * Created by zachma on 2/9/15.
 */

var final_transcript = '';
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
        var interim_transcript = '';

        // test for object structure
        var objectTest = '';

        for (var i = 0; i < event.results.length; i++) {
            objectTest += event.results[i][0].transcript;
            //objectTest += event.results[i].length + '|';
            //objectTest += event.results[i][0].confidence;
        }

        objectTest_span.innerHTML = objectTest;

    };
}

var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
    return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

function capitalize(s) {
    return s.replace(s.substr(0,1), function(m) { return m.toUpperCase(); });
}

function startDictation(event) {
    if (recognizing) {
        recognition.stop();
        return;
    }
    final_transcript = '';
    recognition.lang = 'en-US';
    recognition.start();
    final_span.innerHTML = '';
    interim_span.innerHTML = '';
}