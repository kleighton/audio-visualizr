window.onload = function () {
    "use strict";
    var paths = document.getElementsByTagName('path');
    var visualizer = document.getElementById('visualizer');
    var mask = visualizer.getElementById('mask');
    var h = document.getElementsByTagName('h1')[0];
    var path;
    var report = 0;

    var soundAllowed = function (stream) {
      //Audio stops listening in FF without // window.persistAudioStream = stream;
      //https://bugzilla.mozilla.org/show_bug.cgi?id=965483
      //https://support.mozilla.org/en-US/questions/984179
      window.persistAudioStream = stream;
      h.innerHTML = "Thanks";
      h.setAttribute('style', 'opacity: 0;');
      var audioContent = new AudioContext();
      var audioStream = audioContent.createMediaStreamSource(stream);
      var analyser = audioContent.createAnalyser();
      audioStream.connect(analyser);
      analyser.fftSize = 1024;

      var frequencyArray = new Uint8Array(analyser.frequencyBinCount);
      visualizer.setAttribute('viewBox', '0 0 255 255');

      //Through the frequencyArray has a length longer than 255, there seems to be no
      //significant data after this point. Not worth visualizing.
      for (var i = 0; i <= 256; i++) {
        if (i == 256){
          waitDraw();
        };
        path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('stroke-dasharray', '8,2');
        mask.appendChild(path);

      }
      function waitDraw(){
        var doDraw = function () {
        requestAnimationFrame(doDraw);
        analyser.getByteFrequencyData(frequencyArray);
        var adjustedLength;
        for (var i = 0; i < 255; i++) {
          paths[i].setAttribute('d', 'M ' + (i * 1.8) + ',255 l 0,-' + Math.ceil(frequencyArray[i]));
        }

      };
      doDraw();

      };
      
    };

    var soundNotAllowed = function (error) {
      h.innerHTML = "You must allow your microphone.";
      console.log(error);
    };

   
    navigator.getUserMedia({
      audio: true
    }, soundAllowed, soundNotAllowed);

  };