document.addEventListener("DOMContentLoaded", function () {
    const birthdayAudio = document.getElementById("birthdayMusic");
    const dailyAudio = document.getElementById("dailySong");
    const dailyButton = document.getElementById("dailyMusicBtn");
    const musicToggle = document.getElementById("musicToggle");
    const progress = document.getElementById("musicProgress");
    const volume = document.getElementById("volumeControl");

    if (birthdayAudio) {
        birthdayAudio.volume = Number(volume?.value || 0.7);
    }

    if (dailyAudio) {
        dailyAudio.volume = 0.85;
    }

    function revealDailyContent() {
        document.getElementById("dailyContent")?.classList.add("show");
    }

    function updateDailyButton() {
        if (!dailyButton || !dailyAudio) return;

        dailyButton.innerHTML = dailyAudio.paused
            ? "🎵 Read Today's Surprise ❤️"
            : "⏸ Pause Today's Song";
    }

    function updateMusicToggle() {
        if (!musicToggle || !birthdayAudio) return;

        musicToggle.textContent = birthdayAudio.paused ? "▶" : "⏸";
        musicToggle.setAttribute(
            "aria-label",
            birthdayAudio.paused ? "Play music" : "Pause music"
        );
    }

    function pauseDailySong() {
        if (!dailyAudio || dailyAudio.paused) return;
        dailyAudio.pause();
    }

    function pauseBirthdaySong() {
        if (!birthdayAudio || birthdayAudio.paused) return;
        birthdayAudio.pause();
    }

    function playAudio(audio) {
        if (!audio || !audio.src) return;

        audio.play().catch(function (err) {
            console.log(err);
        });
    }

    if (dailyButton && dailyAudio) {
        dailyButton.addEventListener("click", function () {
            revealDailyContent();

            if (dailyAudio.paused) {
                pauseBirthdaySong();
                playAudio(dailyAudio);
            } else {
                dailyAudio.pause();
            }

            updateDailyButton();
        });

        dailyAudio.addEventListener("play", updateDailyButton);
        dailyAudio.addEventListener("pause", updateDailyButton);
        dailyAudio.addEventListener("ended", updateDailyButton);
    }

    if (birthdayAudio) {
        birthdayAudio.addEventListener("play", updateMusicToggle);
        birthdayAudio.addEventListener("pause", updateMusicToggle);

        birthdayAudio.addEventListener("timeupdate", function () {
            if (progress && birthdayAudio.duration) {
                progress.value = (birthdayAudio.currentTime / birthdayAudio.duration) * 100;
            }
        });
    }

    if (musicToggle && birthdayAudio) {
        musicToggle.addEventListener("click", function () {
            if (birthdayAudio.paused) {
                pauseDailySong();
                playAudio(birthdayAudio);
            } else {
                birthdayAudio.pause();
            }

            updateMusicToggle();
        });
    }

    if (progress && birthdayAudio) {
        progress.addEventListener("input", function () {
            if (birthdayAudio.duration) {
                birthdayAudio.currentTime = (progress.value / 100) * birthdayAudio.duration;
            }
        });
    }

    if (volume && birthdayAudio) {
        volume.addEventListener("input", function () {
            birthdayAudio.volume = Number(volume.value);
        });
    }

    window.pauseDailySong = pauseDailySong;

    window.startBirthdayMusic = function () {
        if (!birthdayAudio || birthdayAudio.dataset.autoplay === "false") return;

        pauseDailySong();
        playAudio(birthdayAudio);
        updateMusicToggle();
    };

    updateDailyButton();
    updateMusicToggle();
});
