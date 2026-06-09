// ── Audio Player (73 songs, shuffled) ──
const audio    = document.getElementById('audioPlayer');
const playBtn  = document.getElementById('playPauseLabel');
const prevBtn  = document.getElementById('prevButton');
const nextBtn  = document.getElementById('nextButton');
const songName = document.getElementById('songName');

const SONGS = [
  "1 - 03 トリアングルム.mp3",
  "1 - 04 摂理.mp3",
  "17. You'll Be Under My Wheels (Need For Speed Most Wanted Soundtrack).mp3",
  "1. Hopeless call - Soul Hackers 2 OST.mp3",
  "45.A Critical Moment The Eminence In Shadow OST.mp3",
  "56.In Time Of War The Eminence In Shadow OST.mp3",
  "AFK Journey - Edge of the World - Edited.mp3",
  "Alight (Storm).mp3",
  "A Lone Prayer.mp3",
  "Battle! Lear - Pokémon Masters EX OST.mp3",
  "Battle! (Legendary) - Pokémon_ Let's Go, Pikachu! & Let's Go, Eevee!.mp3",
  "Battle! Vs. Moebius – Xenoblade Chronicles 3_ Original Soundtrack OST 3.mp3",
  "BlazBlue_ Cross Tag Battle OST - Crossing Fate.mp3",
  "Chrono Cross OST - Between Life and Death ~ Boss Battle Theme.mp3",
  "Counterattack Begins - Lycoris Recoil [OST].mp3",
  "Crimson Blitz.mp3",
  "Cynthia Battle! (Sinnoh Champion) Pokémon Masters Theme.mp3",
  "[D4] 3. Vow and Promise - Granblue Fantasy Relink OST.mp3",
  "Dark Souls 3 The Ringed City DLC ~ Slave Knight Gael.mp3",
  "Dream of Butterfly.mp3",
  "Dynamite Battle.mp3",
  "Endwalker Theme - Footfalls - FFXIV _ Final Fantasy XIV.mp3",
  "Evan Call - Knife to the Throat.mp3",
  "(EXTENDED VER) Ravings (feat. Sleep1st) Sparxie Trailer Song_Honkai_ Star Rail 4.0 OST.mp3",
  "FF14 - Through The Maelstrom Of Inundation (Leviathan x Eden's Gate).mp3",
  "FFXIV OST - Heroes (Thordan and the Knights Of The Round's Theme).mp3",
  "FFXIV OST - Return to Oblivion.mp3",
  "FFXIV_Shadowbringers The Twinning (a Long Fall) - Dual Mix (info in Desc).mp3",
  "FF XIV - Weight of the World (Prelude Version).mp3",
  "Final Fantasy Brave Exvius - Onslaught.mp3",
  "Final Fantasy X - Enemy Assault.mp3",
  "Fire Emblem Echoes_ Shadows of Valentia Twilight of the Gods.mp3",
  "Fire Emblem_ Three Houses OST - At What Cost.mp3",
  "Flame Of Hope - Tales Of Arise Soundtrack.mp3",
  "Flowering Night - Touhou 10.5_ Scarlet Weather Rhapsody OST.mp3",
  "God knows - Haruhi Suzumiya.mp3",
  "Godskin Apostles.mp3",
  "Grandia 3 グランディア III OP - In The Sky by Miz.mp3",
  "Hatsune Miku - Tsukimiyo Rabbit 【月見夜ラビット】.mp3",
  "Helldivers 2 Main Theme~ A Cup Of LiberTea.mp3",
  "Initial D-I NEED YOUR LOVE.mp3",
  "Initial D - No one sleep in tokyo.mp3",
  "Kill la Kill - Don't Lose Your Way.mp3",
  "LiEat OST - Liar.mp3",
  "Lily - Scarlet Rose.mp3",
  "Lycoris Recoil『リコリス・リコイル』OST - Counterattack Start _ 反撃開始 (Cover).mp3",
  "Madan no Ou to Vanadis OP Full.mp3",
  "Mary Skelter 2 OST One More Red Nightmare.mp3",
  "Mili - Paper Bouquet _ _The Executioner and Her Way of Life_ Opening [Full].mp3",
  "Natsume Chiaki - Hanairo Biyori.mp3",
  "Noah - Face trial.mp3",
  "Nodkrai Battle Theme 1 [To Light the Aeon Dark] - Genshin Impact 6.0 OST.mp3",
  "NO GAME NO LIFE Opening - ノーゲーム・ノーライフ - This Game - Konomi Suzuki.mp3",
  "OP Absolute Duo Full - Absolute Soul.mp3",
  "Persona 3 Reload - Pull the Trigger -reload- (remix by _Mosq).mp3",
  "Persona 3 The Battle for Everyone's Souls.mp3",
  "Proi Proi · Aquila Boss Theme · Phase 3 (Boss Battle Version) - Honkai Star Rail 3.3.mp3",
  "Punishing Gray Raven x BRS Ost - Blazing Simulacrum Battle [PGR X Black Rock Shooter].mp3",
  "Radiant Dawn - Guilty Gear Strive OST (Queen Dizzy Theme).mp3",
  "Ruby Rose Medley.mp3",
  "Serpent Eating the Horizon.mp3",
  "Shingeki no Kyojin OST 1 Attack on Titan (Armored Titan Music_Theme).mp3",
  "Tales of Berseria _ OP ● Opening Theme FULL _ BURN.mp3",
  "Tales of Zestiria (OP _ Opening Theme FULL) - [White Light].mp3",
  "The Desire to Triumph (Common Battle BGM).mp3",
  "The Magic Within.mp3",
  "The Way Of The Embodied Dragon - Tales Of Berseria Music EXTENDED.mp3",
  "Time to Avoid Battle + Decisive Battle III - Octopath Traveler_ Champions Of The Continent.mp3",
  "Ultimate Battle - Instrumental (HQ) - Dragon Ball Super OST.mp3",
  "Wildfire [Honkai Star Rail] OST (Cocolia Boss Battle).mp3",
  "Wings Of Fire (Initial D Soundtrack).mp3",
  "With You Once More • Cyrene Character Trailer Theme OST.mp3",
  "Ys Seven - Vacant Interference.mp3",
];

let order = [];  // shuffled indices
let current = -1;

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildOrder() {
  order = shuffle([...Array(SONGS.length).keys()]);
  current = -1;
}

function nextIndex() {
  current++;
  if (current >= order.length) {
    buildOrder();  // reshuffle when exhausted
    current = 0;
  }
  return order[current];
}

function prevIndex() {
  current--;
  if (current < 0) {
    buildOrder();
    current = order.length - 1;
  }
  return order[current];
}

function displayName(name) {
  // Strip .mp3, truncate if too long
  const cleaned = name.replace(/\.mp3$/i, '');
  return cleaned.length > 50 ? cleaned.slice(0, 47) + '...' : cleaned;
}

function setAudioSource(index) {
  audio.src = 'assets/' + SONGS[index];
  audio.play().catch(() => {});
  updatePlayIcon();
  songName.textContent = displayName(SONGS[index]);
}

function updatePlayIcon() {
  playBtn.textContent = audio.paused ? '\u25B6' : '\u23F8';
}

// ── Event Listeners ──
playBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  if (audio.paused) { audio.play(); }
  else { audio.pause(); }
});

prevBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  setAudioSource(prevIndex());
});

nextBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  setAudioSource(nextIndex());
});

audio.addEventListener('play',   updatePlayIcon);
audio.addEventListener('pause',  updatePlayIcon);
audio.addEventListener('ended', () => setAudioSource(nextIndex()));

// ── Init ──
audio.volume = 0.1;
buildOrder();
setAudioSource(nextIndex());
