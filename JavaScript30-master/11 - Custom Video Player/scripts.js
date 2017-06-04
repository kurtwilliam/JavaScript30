// GET ELEMENTS

// Save all of the video player elements into variables to call upon later
const player = document.querySelector('.player');
const video = player.querySelector('.viewer ');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// BUILD FUNCTIONS

// Toggle play - if its paused stop play video, otherwise reverse
function togglePlay() {
	if (video.paused) {
		video.play()
	} else {
		video.pause()
	}
}

// Switch out the button depending on whether the video is playing or not
function updateButton() {
	const icon = this.paused ? '►' : '❚ ❚';
	toggle.textContent = icon;
}

// Skip ahead by the data value of the button elements when called
function skip(){
	video.currentTime += parseFloat(this.dataset.skip);
}

// makes the range for the sliders update when called
function handleRangeUpdate(){
	video[this.name] = this.value;
}

// Updates the css styles for the width of the progress bar every time its called - changes the width of the bar
function handleProgress(){
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`
}

// updates the time setting for how long the video is 
function scrub(e){
	const scrubTime = (e.offsetX / progress.offsetWidth ) * video.duration;
	video.currentTime = scrubTime; 

}

// HOOK UP EVENT LISTENERS

// Pause, play and video time for the scrubber event listener
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

// toggles the play button on click
toggle.addEventListener('click', togglePlay);

// every time skip button is pressed runs skip function
skipButtons.forEach(button => button.addEventListener('click', skip));
// skipButtons.forEach(button => button.addEventListener('keyDown', skip)); R39 L37

// updates the range inputs value if you click the input bar
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))

// Sets default mousedown to false so it doesn't update when you run your mouse over it
let mousedown = false;

// on click updates the position of the scrubber
progress.addEventListener('click',scrub);

// updates the scrubber if you click and drag the mouse
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mouseup', () => mousedown = false)