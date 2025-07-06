// ----------------- Variables ----------------- //
const aboutMeText = document.querySelector('#about-me');
const audioPlayerButton = document.querySelector('#audioPlayerButton');
const audioPlayer = document.querySelector('#audioPlayer');
const playPauseLabel = document.querySelector('#playPauseLabel');
const songs = JSON.parse(audioPlayer.dataset.songs);
const aboutMeUrl = 'https://raw.githubusercontent.com/jd-apprentice/jd-apprentice/main/aboutme';
const defaultText = `Hihi! Jonathan here`;
let isPlaying = false;

// ----------------- Helpers ----------------- //
function setAudioSource(index) {
    audioPlayer.src = songs[index];
    audioPlayer.play();
    updatePlayPauseIcon();
}

function updatePlayPauseIcon() {
    playPauseLabel.innerHTML = audioPlayer.paused
        ? `<i class="fas fa-play"></i>`
        : `<i class="fas fa-pause"></i>`;
}

// ----------------- Event Listeners ----------------- //
audioPlayerButton.addEventListener('click', (event) => {
    const currentSongIndex = songs.findIndex(song => audioPlayer.currentSrc.endsWith(song));

    if (event.target.closest('#prevButton')) {
        const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        setAudioSource(prevIndex);
        return;
    }

    if (event.target.closest('#nextButton')) {
        const nextIndex = (currentSongIndex + 1) % songs.length;
        setAudioSource(nextIndex);
        return;
    }

    // Toggle Play/Pause
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }

    updatePlayPauseIcon();
    isPlaying = !audioPlayer.paused;
});

audioPlayer.addEventListener('ended', () => {
    const current = songs.findIndex(song => audioPlayer.currentSrc.endsWith(song));
    const next = (current + 1) % songs.length;
    setAudioSource(next);
});

audioPlayer.volume = 0.2;

// Initial setup
songs.forEach(song => {
    const source = document.createElement('source');
    source.src = song;
    source.type = 'audio/mp3';
    audioPlayer.appendChild(source);
});
setAudioSource(0);

// Load about me content
fetch(aboutMeUrl)
    .then(res => res.text())
    .then(text => aboutMeText.textContent = text || defaultText)
    .catch(() => aboutMeText.textContent = defaultText);
