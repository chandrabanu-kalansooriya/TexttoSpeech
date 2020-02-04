const synth = window.speechSynthesis;

const textInput = document.querySelector('#text-input');
const textForm = document.querySelector('form');
const voiceSelect = document.querySelector('#voice-select');
const rateValue = document.querySelector('#rate-value');
const rate = document.querySelector('#rate');
const pitchValue = document.querySelector('#pitch-value');
const pitch = document.querySelector('#pitch');

let voices = [];

const getVoices = () => {
    voices = synth.getVoices();
    
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})`
        option.setAttribute('data-name', voice.name);
        option.setAttribute('data-lang', voice.lang);
        voiceSelect.appendChild(option)
    });
}

getVoices();

if(synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}

const speak = () => {
    if(synth.speaking) {
        console.error('Already ');
        return;
    }

    if(textInput.value !== '') {
        const speakText = new SpeechSynthesisUtterance(textInput.value);
    
        speakText.onend = e => {
            console.log('done speaking...')
        }

        speakText.onerror = e => {
            console.log('error...')
        }

        const selectedVoice = voiceSelect.selectOptions[0]
        .getAttribute('data-name');

        voices.forEach(voice => {
            if(voice.name === selectedVoice) {
                speakText.voice = voice;
            }
        });

        speakText.rate = rate.value;
        speakText.pitch = pitch.value;

        synth.speak(speakText);
    }
}

textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.blur();
});

rate.addEventListener('change', e => rateValue.textContent = rate.value);

pitch.addEventListener('change', e => pitchValue.textContent = pitch.value);

voiceSelect.addEventListener('change', e => speak());