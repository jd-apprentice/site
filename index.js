const aboutMeText = document.querySelector('#about-me');
const audioPlayerButton = document.querySelector('#audioPlayerButton');
const audioPlayer = document.querySelector('#audioPlayer');

const defaultStyleButton = 'cursor-pointer mt-4 mx-2 px-4 py-2 bg-red-500 text-white rounded-xl border-2 border-black';
const defaultText = `Hihi! Jonathan here`;
const defaultState = 'play 🎵';
const secondaryState = 'pause 🎵';
const secondaryStyleButton = 'cursor-pointer mt-4 mx-2 px-4 py-2 bg-blue-500 text-white rounded-xl border-2 border-black';
const aboutMeUrl = 'https://raw.githubusercontent.com/jd-apprentice/jd-apprentice/main/aboutme';

let isPlaying = false

audioPlayerButton.addEventListener('click', () => {
    if (!isPlaying) {
        audioPlayer.play();
        audioPlayerButton.textContent = secondaryState;
        audioPlayerButton.className = secondaryStyleButton;
        isPlaying = !isPlaying;
        return;
    };

    audioPlayer.pause();
    audioPlayerButton.textContent = defaultState;
    audioPlayerButton.className = defaultStyleButton;
    isPlaying = !isPlaying;
    return;
});

audioPlayer.volume = 0.2;
const fetchText = async (url) => fetch(url).then((response) => response.text());
fetchText(aboutMeUrl).then((text) => aboutMeText.textContent = text ?? defaultText);
