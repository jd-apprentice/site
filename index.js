// ----------------- Variables ----------------- //
const aboutMeText = document.querySelector('#about-me');
const audioPlayerButton = document.querySelector('#audioPlayerButton');

/**
 * @type {HTMLAudioElement}
 */
const audioPlayer = document.querySelector('#audioPlayer');

const defaultText = `Hihi! Jonathan here`;
const aboutMeUrl = 'https://raw.githubusercontent.com/jd-apprentice/jd-apprentice/main/aboutme';
let isPlaying = false

// ----------------- Functions ----------------- //
/**
 * @param {string} text
 */
function addIcon(text) {
    return text + ' 🎵';
};

/**
 * @param {string} style - The color of the button
 */
function returnStyle(style) {
    return `cursor-pointer mt-4 mx-2 px-4 py-2 bg-${style}-500 text-white rounded-xl border-2 border-black`;
};

/**
 * @description Obtains the text from the given url
 * @param {string} url
 */
async function fetchText(url) {
    const response = await fetch(url);
    const text = await response.text();
    return text;
}

// ----------------- Event Listeners ----------------- //
audioPlayerButton.addEventListener('click', () => {
    if (!isPlaying) {
        audioPlayer.play();
        audioPlayerButton.textContent = addIcon('pause');
        audioPlayerButton.className = returnStyle('blue');
        isPlaying = !isPlaying;
        return;
    };

    audioPlayer.pause();
    audioPlayerButton.textContent = addIcon('play');
    audioPlayerButton.className = returnStyle('red');
    isPlaying = !isPlaying;
});

// ----------------- Main ----------------- //
audioPlayer.volume = 0.2;
fetchText(aboutMeUrl).then((text) => aboutMeText.textContent = text ?? defaultText);
