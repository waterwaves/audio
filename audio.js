var stream;
var audio_context = new window.AudioContext();
var analyser = audio_context.createAnalyser();
analyser.fftSize = 1024;
analyser.smoothingTimeConstant = 0;
var analyserBufferLength = analyser.fftSize;

var drawAnimation;

var successCallback = function(localStream) {
    debug('You allowed microphone.');
    stream = localStream;
    var audio_source = audio_context.createMediaStreamSource(stream);

    audio_source.connect(analyser);
    analyser.connect(audio_context.destination);
    
    //======================Draw the graph=======================
    var barGraph = new Graph($('canvas')[0]);
    barGraph.mask = false;
    
    var dataArray = new Uint8Array(analyserBufferLength);
    function draw() {
        analyser.getByteTimeDomainData(dataArray);
        barGraph.clear();
        for (var i = 0; i < analyserBufferLength; i += 1) {
            barGraph.drawLine(i, 1, dataArray[i]);
        }
        drawAnimation = window.requestAnimationFrame(draw);
    }
    draw();
};

var errorCallback = function() {
    console.warn('shit! It is broken!');
};

$(document).ready(function() {
    $('#start').click(function(e) {
        debug("Starting GetUserMedia");
        if (!stream || stream.ended) {
            navigator.webkitGetUserMedia({audio: true, video: false}, successCallback, errorCallback);
        }
    });

    $('#stop').click(function(e) {
        debug(stream);
        if (stream) {
            stream.stop();
        }
        if (drawAnimation) {
            window.cancelAnimationFrame(drawAnimation);
        }
        debug('Stream has been stopped.');
    });
});


function debug(msg) {
    var dt = new Date();
    var printable_dt = [dt.getFullYear(), dt.getMonth() + 1, dt.getDate()].join('/') + ' '
        + [dt.getHours(), dt.getMinutes(), dt.getSeconds()].join(':');
    if (typeof msg === 'object' ) {
        msg = JSON.stringify(msg, undefined, 2);
        msg = msg.replace(/\n/g, '<br>');
    }
    $('#debug').append($('<span>').html(printable_dt + ' - ' + msg).append($('<br>')));
}