// ----------------- Variables ----------------- //
const aboutMeText = document.querySelector('#about-me');
const audioPlayerButton = document.querySelector('#audioPlayerButton');
const audioPlayer = document.querySelector('#audioPlayer');
const playPauseLabel = document.querySelector('#playPauseLabel');
const songs = JSON.parse(audioPlayer.dataset.songs);
const aboutMeUrl = 'https://raw.githubusercontent.com/jd-apprentice/jd-apprentice/main/aboutme';
const defaultText = `Infrastructure specialist with experience in on-premise environments, hypervisors, and systems administration. 
Passionate about building real projects—whether for fun or to deliver value. 
Currently working as a Senior Application Security Engineer.`;
const playIcon = '<i class="fas fa-play"></i>'
const pauseIcon = '<i class="fas fa-pause"></i>'
let isPlaying = false;

// ----------------- Helpers ----------------- //
const updatePlayPauseIcon = () => playPauseLabel.innerHTML = audioPlayer.paused
    ? playIcon
    : pauseIcon;

function setAudioSource(index) {
    audioPlayer.src = songs[index];
    audioPlayer.play();
    updatePlayPauseIcon();
}

// ----------------- Event Listeners ----------------- //
audioPlayerButton.addEventListener('click', (event) => {
    event.stopPropagation();
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

    const action = audioPlayer.paused ? 'play' : 'pause';
    audioPlayer[action]();

    updatePlayPauseIcon();
    isPlaying = !audioPlayer.paused;
});

audioPlayer.addEventListener('play', () => {
    document.body.classList.add('music-playing');
    isPlaying = true;
});
audioPlayer.addEventListener('pause', () => {
    document.body.classList.remove('music-playing');
    isPlaying = false;
});
audioPlayer.addEventListener('ended', () => {
    document.body.classList.remove('music-playing');
    const current = songs.findIndex(song => audioPlayer.currentSrc.endsWith(song));
    const next = (current + 1) % songs.length;
    setAudioSource(next);
});

// Initial setup
audioPlayer.volume = 0.1;
songs.forEach(song => {
    const source = document.createElement('source');
    source.src = song;
    source.type = 'audio/mp3';
    audioPlayer.appendChild(source);
});
setAudioSource(0);
