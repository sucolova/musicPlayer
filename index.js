// still todo:
// - auto next song after end of current song
// - click on progressbar jumps to section in song
// - make code more understandable
//    - add classes - make more functions with stuff that repeats itself
//    - write comments- also in .css and .html
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

const playList = [
  { audio: './music/kroko.mp3', cover: './pictures/kroko.jpg', title: 'krokojackas df gh jijikljljh' },
  { audio: './music/doom.mp3', cover: './pictures/doom.jpg', title: 'doom mfdoom dangermouse' },
  { audio: './music/freddie.mp3', cover: './pictures/freddie.jpg', title: 'freddie gibbs ganfster g bunny rabbit' },
  { audio: './music/biggy.mp3', cover: './pictures/biggy.jpg', title: 'biggy smalls' },
];

// initial setupt: load first song when side loads

audio.src = playList[track].audio;
image.src = playList[track].cover;
title.innerText = playList[track].title;

// get duration after song loaded
let duration;

audio.onloadeddata = () => {
  duration = audio.duration;
};

// check if a song is playing

function isPlaying() { // returns true if playBtn is visible
  if (playBtn.classList[1] === 'fa-play') return true;
  return false;
}

// reset the progressbar:
// -- CSS aninations don't have a value to set for this, so i have to clone, delete and replace the info element'

function resetAnimation() {
  const clone = info.cloneNode(true);
  playerContainer.replaceChild(clone, info);
  info = document.getElementById('info');
}

// reset progressbar when song has finished
audio.onended = () => {
  resetAnimation();
};

// Button event listeners:

playBtn.addEventListener('click', () => {
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
});

forwardBtn.addEventListener('click', () => {
  if (track >= playList.length - 1) { // check if last song
    track = 0;
  } else {
    track += 1;
  }
  audio.src = playList[track].audio;
  image.src = playList[track].cover;
  title.innerText = playList[track].title;
  if (!isPlaying()) audio.play(); // if pauseBtn is visible, play the song
  resetAnimation(); // set back the progressbar
});

backBtn.addEventListener('click', () => {
  if (track <= 0) {
    track = playList.length - 1;
  } else {
    track -= 1;
  }
  audio.src = playList[track].audio;
  image.src = playList[track].cover;
  title.innerText = playList[track].title;
  if (!isPlaying()) audio.play();
  resetAnimation();
});
