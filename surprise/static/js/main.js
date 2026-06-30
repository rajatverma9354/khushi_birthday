document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        const loading = document.getElementById("loading-screen");
        if (loading) loading.classList.add("hide");
    }, 2600);

    const button = document.getElementById("unlockButton");
    const message = document.getElementById("loginMessage");
    const cursorGlow = document.querySelector(".cursor-glow");
    const heartCursor = document.getElementById("heartCursor");
    const cuteNote = document.getElementById("cuteNote");
    const cuteNotes = [
        "Aap smile kar rahi hain na? Good, surprise ka kaam ho gaya ❤️",
        "Bas itna yaad rakhiye: aaj ka din sirf aapke naam.",
        "Thoda blush allowed hai... birthday rule hai 💖",
        "Someone really wanted this page to feel like you.",
    ];

    document.addEventListener("pointermove", function (event) {

        if (cursorGlow) {
            cursorGlow.style.left = event.clientX + "px";
            cursorGlow.style.top = event.clientY + "px";
        }

        if (heartCursor) {
            heartCursor.style.left = event.clientX + "px";
            heartCursor.style.top = event.clientY + "px";
        }

    });

    document.addEventListener("click", function (event) {
        if (!document.body.classList.contains("surprise-open")) return;
        const sparkle = document.createElement("span");
        sparkle.className = "tap-sparkle";
        sparkle.textContent = "♡";
        sparkle.style.left = event.clientX + "px";
        sparkle.style.top = event.clientY + "px";
        document.body.appendChild(sparkle);
        setTimeout(function () {
            sparkle.remove();
        }, 900);
    });

    function typeText(node, text, speed) {
        if (!node || !text) return;
        node.textContent = "";
        let index = 0;
        const timer = setInterval(function () {
            node.textContent += text[index];
            index += 1;
            if (index >= text.length) clearInterval(timer);
        }, speed);
    }

    function startCuteNotes() {
        if (!cuteNote) return;
        let index = 0;

        function showNote() {
            cuteNote.textContent = cuteNotes[index % cuteNotes.length];
            cuteNote.classList.add("show");
            index += 1;
            setTimeout(function () {
                cuteNote.classList.remove("show");
            }, 3600);
        }

        setTimeout(showNote, 1800);
        setInterval(showNote, 9000);
    }

    function unlockExperience() {
        document.body.classList.add("surprise-open");
        document.getElementById("countdown-section").style.display = "none";
        document.getElementById("experience").style.display = "block";
        document.getElementById("musicPlayer").classList.add("show");
        document.getElementById("hero-section").scrollIntoView({ behavior: "smooth" });

        typeText(document.querySelector(".typing-line"), document.querySelector(".typing-line").dataset.text, 35);
        typeText(document.getElementById("letterText"), document.getElementById("letterText")?.dataset.letter || "", 28);
        startCuteNotes();

        if (window.startBirthdayMusic) window.startBirthdayMusic();
        if (window.birthdayConfetti) window.birthdayConfetti();
    }

    if (button) {
        button.addEventListener("click", function () {
            if (button.dataset.ready !== "true") {
                message.textContent = "Abhi nahi... surprise birthday ke din hi khulega 😊";
                return;
            }

            const name = document.getElementById("girlName").value.trim().toLowerCase();
            const password = document.getElementById("password").value.trim();

            if (name !== correctName) {
                message.textContent = "Hmm... ye surprise kisi aur ke naam se nahi khulega 😊";
                return;
            }

            if (password !== correctPassword) {
                message.textContent = "Almost! Cute password ko thoda aur yaad kariye 💖";
                return;
            }

            message.textContent = "Welcome, " + birthdayName + " ❤️";
            if (window.pauseDailySong) window.pauseDailySong();
            if (window.startBirthdayMusic) window.startBirthdayMusic();
            setTimeout(unlockExperience, 450);
        });
    }

    document.querySelectorAll(".gallery-item").forEach(function (item) {
        item.addEventListener("click", function () {
            const lightbox = document.getElementById("lightbox");
            const image = document.getElementById("lightboxImage");
            image.src = item.dataset.full;
            image.alt = item.querySelector("img").alt;
            lightbox.classList.add("show");
        });
    });

    document.getElementById("closeLightbox")?.addEventListener("click", function () {
        document.getElementById("lightbox").classList.remove("show");
    });

    document.querySelectorAll(".secret-card").forEach(function (card) {
        card.addEventListener("click", function () {
            card.classList.add("revealed");
            card.querySelector("span").textContent = card.dataset.message;
        });
    });

    document.getElementById("finaleButton")?.addEventListener("click", function () {
        if (window.birthdayConfetti) window.birthdayConfetti(true);
    });

    document.getElementById("meltPhotoButton")?.addEventListener("click", function () {
        document.querySelector(".melt-photo")?.classList.add("show");
    });

    document.getElementById("replyForm")?.addEventListener("submit", function (event) {
        event.preventDefault();

        const form = event.currentTarget;
        const submitter = event.submitter;
        const status = document.getElementById("replyStatus");
        const data = new FormData(form);

        if (submitter?.name) data.set(submitter.name, submitter.value);

        form.classList.add("sending");
        status.textContent = "Sending your answer...";

        fetch(form.action, {
            method: "POST",
            body: data,
            headers: { "X-Requested-With": "XMLHttpRequest" },
        })
            .then(function (response) {
                if (!response.ok) throw new Error("Reply failed");
                return response.json();
            })
            .then(function (payload) {
                status.textContent = payload.message || "Reply saved ❤️";
                form.classList.remove("sending");
                form.classList.add("sent");
                if (data.get("answer") === "yes" && window.birthdayConfetti) {
                    window.birthdayConfetti(true);
                }
            })
            .catch(function () {
                status.textContent = "Reply save nahi hua. Ek baar aur try kariye.";
                form.classList.remove("sending");
            });
    });
});
