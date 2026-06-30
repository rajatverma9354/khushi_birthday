window.birthdayConfetti = function (big) {
    if (!window.confetti || !confettiEnabled) return;

    const count = big ? 260 : 130;
    const defaults = {
        particleCount: count,
        spread: big ? 95 : 70,
        origin: { y: 0.65 },
        colors: ["#ff4fa0", "#9d4dff", "#d6b3ff", "#ffffff"],
    };

    confetti(defaults);
    setTimeout(function () {
        confetti({ ...defaults, particleCount: Math.floor(count / 2), angle: 60, origin: { x: 0, y: 0.75 } });
        confetti({ ...defaults, particleCount: Math.floor(count / 2), angle: 120, origin: { x: 1, y: 0.75 } });
    }, 350);
};
