document.getElementById("audio-button").onclick = function() {
  var myaudio = document.getElementById("myaudio");
  if (myaudio.paused) {
      myaudio.play();
      this.innerHTML = "<i class='fas fa-pause fa-xl'></i>";
  } else {
      myaudio.pause();
      this.innerHTML = "<i class='fas fa-play fa-xl'></i>";
  }
};




const audio = document.getElementById('myaudio');
const volumeSlider = document.getElementById('volume-slider');
const volumeDisplay = document.getElementById('volume-display');

volumeSlider.addEventListener('input', function() {
    audio.volume = this.value;
    volumeDisplay.textContent = `Громкость: ${Math.round(this.value * 100)}%`;
});






const box = document.getElementById("enlargeBox");

box.addEventListener("mouseover", function () {
  this.style.transform = "scale(1.1)";
  this.style.transition = 'transform 0.4s ease';
});

box.addEventListener("mouseout", function () {
  this.style.transform = "scale(1)";
  this.style.transition = 'transform 1s ease';
});

// const playButtons = document.querySelectorAll('.bi.fa-play-circle');
// const audios = document.querySelectorAll('audio');

// // Добавляем обработчики событий
// playButtons.forEach((button, index) => {
//   button.addEventListener('click', function() {
//     // Воспроизводим соответствующее аудио
//     audios[index].play();
//   });
// });



var currentAudio = null;
var currentPlayButton = null;

function togglePlayPause(listItem) {
  // Получаем иконку и аудио элемент из списка
  const playButton = listItem.querySelector('i');
  const audio = listItem.querySelector('audio');

  // Останавливаем все аудио файлы и сбрасываем время воспроизведения на начало
  document.querySelectorAll('audio').forEach(a => {
    if (a !== audio) {
      a.pause();
      a.currentTime = 0;
    }
  });
  document.querySelectorAll('.songItem i').forEach(icon => {
    if (icon !== playButton) {
      icon.classList.remove('fa-pause-circle');
      icon.classList.add('fa-play-circle');
    }
  });


  // Проверяем, находится ли аудио в паузе или нет
  if (audio.paused) {
    // Воспроизводим аудио и меняем иконку на паузу
    audio.play();
    playButton.classList.remove('fa-play-circle');
    playButton.classList.add('fa-pause-circle');
    currentAudio = audio;
    currentPlayButton = playButton;
    updateCurrentTrackInfo(listItem);
    document.getElementById('play-pause-icon').classList.remove('fa-play');
    document.getElementById('play-pause-icon').classList.add('fa-pause');
  } else {
    // Ставим аудио на паузу и меняем иконку на воспроизведение
    audio.pause();
    playButton.classList.remove('fa-pause-circle');
    playButton.classList.add('fa-play-circle');
    currentAudio = null;
    currentPlayButton = null;
    document.getElementById('play-pause-icon').classList.remove('fa-pause');
    document.getElementById('play-pause-icon').classList.add('fa-play');
  }
}

function updateCurrentTrackInfo(listItem) {
  const trackInfo = listItem.querySelector('h5').textContent;
  document.getElementById('current-track-info').textContent = trackInfo;
}

document.getElementById('audio-button').addEventListener('click', function() {
  if (currentAudio) {
    if (currentAudio.paused) {
      currentAudio.play();
      currentPlayButton.classList.remove('fa-play-circle');
      currentPlayButton.classList.add('fa-pause-circle');
      document.getElementById('play-pause-icon').classList.remove('fa-play');
      document.getElementById('play-pause-icon').classList.add('fa-pause');
    } else {
      currentAudio.pause();
      currentPlayButton.classList.remove('fa-pause-circle');
      currentPlayButton.classList.add('fa-play-circle');
      document.getElementById('play-pause-icon').classList.remove('fa-pause');
      document.getElementById('play-pause-icon').classList.add('fa-play');
    }
  }
});





var currentAudio = null;

function togglePlayPause(songItem) {
  const audioId = songItem.querySelector('audio').id;
  const audio = document.getElementById(audioId);
  const progressSlider = songItem.querySelector('input[type="range"]');
  const progressText = songItem.querySelector('.progress-text');
  const playButton = songItem.querySelector('i');

  // Сбросить время воспроизведения предыдущего трека
  if (currentAudio && currentAudio !== audio) {
    currentAudio.pause();
    currentAudio.currentTime = 0; // Сбросить время текущего аудио
    const currentProgressSlider = currentAudio.parentNode.parentNode.querySelector('input[type="range"]');
    const currentProgressText = currentAudio.parentNode.parentNode.querySelector('.progress-text');
    currentProgressSlider.value = 0;
    currentProgressText.textContent = '0%';
    currentProgressSlider.style.background = `linear-gradient(to right, #4CAF50 0%, #ddd 0%)`;
  }
// Обработчик для ползунка
  progressSlider.addEventListener('input', () => {
    const progress = progressSlider.value;
    const duration = audio.duration;
    audio.currentTime = (progress / 100) * duration;
    progressText.textContent = `${Math.round(progress)}%`;
    progressSlider.style.background = `linear-gradient(to right, #4CAF50 ${progress}%, #ddd ${progress}%)`;

    // Не паузить аудио при перемотке
    if (audio.paused) {
      audio.play();
      playButton.classList.replace('fa-play-circle', 'fa-pause-circle');
    }
  });
  
  if (audio.paused) {
    audio.play();
    playButton.classList.replace('fa-play-circle', 'fa-pause-circle');
    currentAudio = audio;

    audio.addEventListener('timeupdate', () => {
      const duration = audio.duration;
      const currentTime = audio.currentTime;
      const progress = (currentTime / duration) * 100;
      progressSlider.value = progress;
      progressText.textContent = `${Math.round(progress)}%`;
      progressSlider.style.background = `linear-gradient(to right, #4CAF50 ${progress}%, #ddd ${progress}%)`;
    });

    audio.addEventListener('ended', () => {
      playButton.classList.replace('fa-pause-circle', 'fa-play-circle');
      progressSlider.value = 0;
      progressText.textContent = '0%';
      progressSlider.style.background = `linear-gradient(to right, #4CAF50 0%, #ddd 0%)`;
    });
  } else {
    audio.pause();
    playButton.classList.replace('fa-pause-circle', 'fa-play-circle');    
  }

  
}

// Добавьте обработчики событий для кнопок управления
document.querySelectorAll('.songItem').forEach((songItem) => {
  const playButton = songItem.querySelector('i');
  playButton.addEventListener('click', () => {
    togglePlayPause(songItem);
  });
});



