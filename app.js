// Check browser support
if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
    alert('Your browser does not support Speech Recognition. Please use a compatible browser like Chrome.');
} else {
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

    var recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'en-IN';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    var diagnostic = document.getElementById('text');
    var i = 0;

    document.getElementById("playButton").addEventListener("click", function () {
        if (i == 0) {
            document.getElementById("playButton").src = "img/record-button-thumb.png";
            document.querySelector(".instruction").innerText = "Recording...";
            recognition.start();
            i = 1;
        } else {
            document.getElementById("playButton").src = "img/mic-1.png";
            document.querySelector(".instruction").innerText = "Click on the mic to start recording";
            recognition.stop();
            i = 0;
        }
    });

    recognition.onresult = function (event) {
        var last = event.results.length - 1;
        var convertedText = event.results[last][0].transcript;
        diagnostic.value += convertedText + '\n';
        console.log('Confidence: ' + event.results[0][0].confidence);
    };

    recognition.onnomatch = function (event) {
        diagnostic.value = 'I didn’t recognize that.';
    };

    recognition.onerror = function (event) {
        diagnostic.value = 'Error occurred in recognition: ' + event.error;
    };
}
