document.addEventListener("DOMContentLoaded", async () => {
    const shayariElement = document.getElementById("dailyShayari");
    const songNameElement = document.getElementById("songName");
    const audio = document.getElementById("dailySong");

    if (!shayariElement || !songNameElement || !audio) return;

    try {
        const response = await fetch("/static/data/daily_content.json");
        if (!response.ok) throw new Error("Daily content not found");

        const data = await response.json();
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const dd = String(today.getDate()).padStart(2, "0");
        const todayString = `${yyyy}-${mm}-${dd}`;
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
