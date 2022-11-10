// todo:
// - click on progressbar jumps to section in song
// - make code easier to read
//    - add classes and functions for repeating code
// bugs:
//  -- the progressbar for the second song is only half the width.
//    -- i think duration doesn't get updated properly for the song after the first played song.
//

// global variables
const imageContainer = document.getElementById('imageContainer');
const playerContainer = document.getElementById('playerContainer');
const image = imageContainer.querySelector('img');
const playBtn = document.getElementById('playBtn');
const audio = document.querySelector('audio');
const forwardBtn = document.getElementById('forwardBtn');
const backBtn = document.getElementById('backBtn');
let info = document.getElementById('info');
const title = document.getElementById('title');
let track = 0;
let duration;

const playList = [
  { audio: './music/mixkit-deep-urban-623.mp3', cover: './pictures/vinyl-g932488b8a_640.png', title: 'deep urban' },
  { audio: './music/mixkit-feeling-happy-5.mp3', cover: './pictures/vinyl-gfeb813f9c_640.jpg', title: 'feeling happy mixkit' },
  { audio: './music/mixkit-sun-and-his-daughter-580.mp3', cover: './pictures/vinyl-record-gcc2dcaea3_640.png', title: 'sun and his daughter' },
  { audio: './music/mixkit-tech-house-vibes-130.mp3', cover: './pictures/vinyl-records-g635942f01_640.jpg', title: 'tech house vibes 130' },
];

// initial setupt: load first song when side loads
audio.src = playList[track].audio;
image.src = playList[track].cover;
title.innerHTML = playList[track].title;

// check if a song is playing
function isPlaying() { // returns true if playBtn is visible
  if (playBtn.classList[1] === 'fa-play') return true;
  return false;
}


// eventHandlers:
function resetAnimation() { // CSS aninations don't have a value to set for this, so i have to clone, delete and replace the info element'
  const clone = info.cloneNode(true);
  playerContainer.replaceChild(clone, info);
  info = document.getElementById('info');
}

const playPause = () => {
  if (isPlaying()) {
    playBtn.classList.remove('fa-play'); // change the button to pause
    playBtn.classList.add('fa-pause');
    image.style.animationPlayState = 'running';
    audio.play();
    info.style.transform = 'translateY(-100px)'; // move up the ifobox
    info.style.animation = `gradient ${duration}s linear`; // set the animation for the progress of the song
    info.style.animationPlayState = 'running';
  } else {
    playBtn.classList.remove('fa-pause');
    playBtn.classList.add('fa-play');
    image.style.animationPlayState = 'paused';
    audio.pause();
    info.style.transform = 'translateY(0px)'; // retrieve the infobox
    info.style.animationPlayState = 'paused';
  }
};

const nextSong = () => {
  if (track >= playList.length - 1) { // check if last song
    track = 0;
  } else {
    track += 1;
  }
  audio.src = playList[track].audio;
  image.src = playList[track].cover;
  document.getElementById('title').innerHTML = playList[track].title; // because the info node gets cloned, i have to get the title element again with document.getElementById to get a reference to the title html element.
  if (!isPlaying()) audio.play(); // if pauseBtn is visible, play the song
  resetAnimation(); // set back the progressbar
};

const prevSong = () => {
  if (track <= 0) {
    track = playList.length - 1;
  } else {
    track -= 1;
  }
  audio.src = playList[track].audio;
  image.src = playList[track].cover;
  document.getElementById('title').innerHTML = playList[track].title;
  if (!isPlaying()) audio.play();
  resetAnimation();
};

// event listeners:
audio.onloadeddata = () => {
  duration = audio.duration;
};

audio.onended = () => nextSong(); 
playBtn.addEventListener('click', playPause);
forwardBtn.addEventListener('click', nextSong);
backBtn.addEventListener('click', prevSong);
