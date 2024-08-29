document.addEventListener('DOMContentLoaded', () => {
    let speech = new SpeechSynthesisUtterance();
    const voicesDropdown = document.querySelector('select');
    const button = document.querySelector('button');
    const textarea = document.querySelector('textarea');

    function populateVoices() {
        const voices = window.speechSynthesis.getVoices();
        voicesDropdown.innerHTML = voices
            .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
            .join('');
    }

    populateVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = populateVoices;
    }

    button.addEventListener('click', () => {
        speech.text = textarea.value;
        const selectedVoice = voicesDropdown.value;
        speech.voice = speechSynthesis.getVoices().find(voice => voice.name === selectedVoice);
        window.speechSynthesis.speak(speech);
    });
});
