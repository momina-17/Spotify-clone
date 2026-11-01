let play_btn= document.querySelector("#play_btn");
let range_bar = document.querySelector("#range-bar");
let audio = new Audio('audio/1.mp3');
let playButtons = document.querySelectorAll(".play");
let nextButton = document.querySelector("#forward");
let prevButton = document.querySelector("#backward");
let shuffleButton = document.querySelector("#shuffle");
let repeatButton = document.querySelector("#repeat");
let songcardImage = document.querySelector(".image");
let songsName = document.querySelector("#songtext");
let isShuffle = false;
let isRepeat = false;
let currentSongIndex = 0;
let songs = [
    { song: "audio/1.mp3" , name: "Starboy", image: "images/album_1.jpg" },
    { song: "audio/2.mp3" , name: "Industry Baby", image: "images/album_2.jpg" },
    { song: "audio/3.mp3" , name: "God's Plan", image: "images/album_3.jpg" },
    { song: "audio/4.mp3" , name: "Golden Hour", image: "images/album_4.jpg" },
    { song: "audio/5.mp3" , name: "OKAY", image: "images/album_5.jpg" },
    { song: "audio/6.mp3" , name: "Heat Waves", image: "images/artist_1.jpg" },
    { song: "audio/7.mp3" , name: "Until I Found You", image: "images/artist_2.jpg" },
    { song: "audio/8.mp3" , name: "Night Changes", image: "images/artist_3.jpg" },
    { song: "audio/9.mp3" , name: "Brown Munde", image: "images/artist_4.jpg" },
    { song: "audio/10.mp3" , name: "On Top", image: "images/artist_5.jpg" }
];

play_btn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        play_btn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        button = playButtons[currentSongIndex];
        if (button) {
            button.classList.remove("fa-circle-play");
            button.classList.add("fa-pause");
            currentButton = button;
        }
    } 
    else {
        audio.pause();
        play_btn.innerHTML = '<i class="fa-solid fa-play"></i>';
        button = playButtons[currentSongIndex];
        if (button) {
            button.classList.remove("fa-pause");
            button.classList.add("fa-circle-play");
        }
    }
}
);
audio.addEventListener("timeupdate", () => {
    let duration = audio.duration;
    let currentTime = audio.currentTime;
    let value = (currentTime / duration) * 100;
    range_bar.value = value;
    range_bar.style.background = `linear-gradient(to right, #fff 0%, #fff ${value}%, #444040 ${value}%, #444040 100%)`;
}
);

range_bar.addEventListener("input", () => {
    let value = range_bar.value;
    let duration = audio.duration;
    audio.currentTime = (value / 100) * duration;
    range_bar.style.background = `linear-gradient(to right, #fff 0%, #fff ${value}%, #444040 ${value}%, #444040 100%)`;
}
);
let currentButton = null;

function playmusic() {
    playButtons.forEach((button) => {
        button.classList.remove("fa-pause");
        button.classList.add("fa-circle-play");
    });
}

playButtons.forEach((button, index) => {

    button.addEventListener("click", (e) => {

        let clickedButton = e.currentTarget;

        // Agar same song dobara click ho
        if (currentButton === clickedButton && !audio.paused) {
            audio.pause();
             play_btn.innerHTML = '<i class="fa-solid fa-play"></i>';
            clickedButton.classList.remove("fa-pause");
            clickedButton.classList.add("fa-circle-play");
            return;
        }

        // Previous song pause karo
        audio.pause();

        // Sab icons reset karo
        playmusic();

        // Current song select karo
        currentButton = clickedButton;

        // Song load aur play karo
        currentSongIndex = index;
        audio.src = songs[index].song;
        songcardImage.src = songs[index].image;
        songsName.innerHTML = songs[index].name;
        audio.currentTime = 0;
        audio.play();

        play_btn.innerHTML = '<i class="fa-solid fa-pause"></i>';

        // Clicked icon pause banao
        clickedButton.classList.remove("fa-circle-play");
        clickedButton.classList.add("fa-pause");

    });

});



nextButton.addEventListener("click", () => {

    if (isShuffle) {
        currentSongIndex = Math.floor(Math.random() * songs.length);
    }
    else {
        currentSongIndex++;

        if (currentSongIndex >= songs.length) {
            currentSongIndex = 0;
        }
    }

    playSong(currentSongIndex);
});

prevButton.addEventListener("click", () => {
    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    playSong(currentSongIndex);
});

shuffleButton.addEventListener("click", () => {
   if (isShuffle) {
        isShuffle = false;
        shuffleButton.classList.remove("active");
        shuffleButton.style.color = "rgb(188, 174, 174)";
        
    }
    else {
        isShuffle = true;
        shuffleButton.classList.add("active");
        shuffleButton.style.color = "#fff";
        repeatButton.classList.remove("active");
        repeatButton.style.color = "rgb(188, 174, 174)";
    }

});
repeatButton.addEventListener("click", () => {

   if (isRepeat) {
        isRepeat = false;
        repeatButton.classList.remove("active");
        repeatButton.style.color = "rgb(188, 174, 174)";
    }
    else {
        isRepeat = true;
        repeatButton.classList.add("active");
        repeatButton.style.color = "#fff";
        shuffleButton.classList.remove("active");
        shuffleButton.style.color = "rgb(188, 174, 174)";
    }

});
audio.addEventListener("ended", () => {

    if (isRepeat) {
        audio.currentTime = 0;
        audio.play();
    }
    else {
        nextButton.click();
    }

});
function playSong(index) {
    audio.src = songs[index].song;
    songcardImage.src = songs[index].image;
    songsName.innerHTML = songs[index].name;
    currentSongIndex = index;
    audio.currentTime = 0;
    audio.play();
    play_btn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    playmusic();
    let button = playButtons[index];
    if (button) {
    button.classList.remove("fa-circle-play");
    button.classList.add("fa-pause");
    currentButton = button;
    }
}
