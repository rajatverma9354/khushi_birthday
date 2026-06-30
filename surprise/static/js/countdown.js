document.addEventListener("DOMContentLoaded", function () {
    const birthdayDate = new Date(birthday);
    const loginBox = document.querySelector(".login-box");
    const gateMessage = document.getElementById("gateMessage");
    const unlockButton = document.getElementById("unlockButton");
    const countdownSection = document.getElementById("countdown-section");

    function setLoginOpen(isOpen) {
        if (!loginBox || !unlockButton) return;
        loginBox.classList.toggle("locked", !isOpen);
        countdownSection?.classList.toggle("birthday-ready", isOpen);
        unlockButton.disabled = false;
        unlockButton.dataset.ready = isOpen ? "true" : "false";
        if (gateMessage) {
            gateMessage.textContent = isOpen
                ? "Birthday aa gaya... ab secret unlock ho sakta hai ❤️"
                : "Try kar lijiye... Shayad aaj khul jaye 😉";
        }
    }

    function updateCountdown() {
        const distance = birthdayDate - new Date();

        if (distance <= 0) {
            ["days", "hours", "minutes", "seconds"].forEach(function (id) {
                const node = document.getElementById(id);
                if (node) node.textContent = "00";
            });
            setLoginOpen(true);
            clearInterval(timer);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").textContent = String(days).padStart(2, "0");
        document.getElementById("hours").textContent = String(hours).padStart(2, "0");
        document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
        document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
        setLoginOpen(false);
    }

    const timer = setInterval(updateCountdown, 1000);
    updateCountdown();
});
