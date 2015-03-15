/**
 * Created by Zachary Ma on 3/14/2015.
 */

$("#jumpToTime").click( function() {
    play();
});

function play() {

    $("#jquery_jplayer_1").jPlayer("play", 23);

    //console.log("after play");
}

function stop() {

    $("#jquery_jplayer_1").jPlayer("stop");
}

function pausePlayer() {

    $("#jquery_jplayer_1").jPlayer("pause");
}

function resumePlayer() {
    $("#jquery_jplayer_1").jPlayer("play");
}

function volumeDown() {
    $("#jquery_jplayer_1").jPlayer("volume",0.5);
}

function volumeUp() {
    $("#jquery_jplayer_1").jPlayer("volume",1);
}