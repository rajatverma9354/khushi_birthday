document.addEventListener("DOMContentLoaded", async () => {
    const shayariElement = document.getElementById("dailyShayari");
    const songNameElement = document.getElementById("songName");
    const audio = document.getElementById("dailySong");

    if (!shayariElement || !songNameElement || !audio) return;

    function getTodayInIst() {
        const parts = new Intl.DateTimeFormat("en-US", {
            timeZone: "Asia/Kolkata",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }).formatToParts(new Date());
        const dateParts = Object.fromEntries(
            parts
                .filter(part => part.type !== "literal")
                .map(part => [part.type, part.value])
        );

        return `${dateParts.year}-${dateParts.month}-${dateParts.day}`;
    }

    try {
        const response = await fetch("/static/data/daily_content.json");
        if (!response.ok) throw new Error("Daily content not found");

        const data = await response.json();
        const todayString = getTodayInIst();
        const sortedContent = data
            .filter(item => item.date && item.song)
            .sort((a, b) => a.date.localeCompare(b.date));

        let todayContent = sortedContent.find(item => item.date === todayString);

        if (!todayContent) {
            todayContent = [...sortedContent].reverse().find(item => item.date <= todayString);
        }

        if (!todayContent) {
            todayContent = sortedContent[0];
        }

        if (!todayContent) throw new Error("Daily content is empty");

        shayariElement.textContent = todayContent.shayari;
        songNameElement.textContent = todayContent.song_name;
        audio.src = todayContent.song;
        audio.load();
    } catch (error) {
        console.error("Unable to load daily content.", error);

        shayariElement.textContent = "Aaj bhi aapki muskurahat sabse pyari hai ❤️";
        songNameElement.textContent = "Default Song";
        audio.removeAttribute("src");
        audio.load();
    }
});
