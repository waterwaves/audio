//    scriptProcessor.onaudioprocess = function (e) {
//        if (0 && cnt > 3) {
//            scriptProcessor.onaudioprocess = null;
//        }
//        cnt++;
//        var input = e.inputBuffer.getChannelData(0);
////        var output = e.outputBuffer.getChannelData(0);
////        for (var i = 0; i < e.inputBuffer.length; i++) {
////            output[i] = input[i];
////        }
//        channel.push(new Float32Array(input));
//    };
//    audio_source.connect(scriptProcessor);

function mergeBuffers(channelBuffer, recordingLength) {
    var result = new Float32Array(recordingLength);
    var offset = 0;
    for (var i = 0; i < channelBuffer.length; i++) {
        var buf = channelBuffer[i];
        result.set(buf, offset);
        offset += buf.length;
    }
    return result;
}

function writeUTFBytes(view, offset, string){ 
  var lng = string.length;
  for (var i = 0; i < lng; i++){
    view.setUint8(offset + i, string.charCodeAt(i));
  }
