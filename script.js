// Check if the browser supports Web Speech API
if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    const status = document.getElementById('status');
    const transcript = document.getElementById('transcript');

    let isRecording = false;

    startBtn.addEventListener('click', () => {
        if (!isRecording) {
            recognition.start();
            status.textContent = "Recording... Click 'Stop Recording' to end.";
            startBtn.disabled = true;
            stopBtn.disabled = false;
            isRecording = true;
        }
    });

    stopBtn.addEventListener('click', () => {
        if (isRecording) {
            recognition.stop();
            status.textContent = "Recording stopped.";
            startBtn.disabled = false;
            stopBtn.disabled = true;
            isRecording = false;
        }
    });

    recognition.onresult = (event) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcriptText = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                transcript.value += transcriptText + ' ';
            } else {
                interimTranscript += transcriptText;
            }
        }
        status.textContent = 'Interim Transcript: ' + interimTranscript;
    };

    recognition.onerror = (event) => {
        console.error("Speech Recognition Error: ", event.error);
        status.textContent = "Error: " + event.error;
        startBtn.disabled = false;
        stopBtn.disabled = true;
        isRecording = false;
    };

} else {
    alert('Your browser does not support the Web Speech API');
    status.textContent = "Web Speech API not supported by this browser.";
}
