const advice = document.getElementById("advice");
const btn = document.getElementById("btn");

if ("Notification" in window && Notification.permission !== "granted") {
    Notification.requestPermission();
}

async function getAyah() {
    try {
        const res = await fetch("http://api.alquran.cloud/v1/quran/quran-uthmani");
        const data = await res.json();

        const surahs = data.data.surahs;
        const randomSurah = surahs[Math.floor(Math.random() * surahs.length)];
        const randomAyah = randomSurah.ayahs[Math.floor(Math.random() * randomSurah.ayahs.length)];
        const ayahText = randomAyah.text;
        const displayText = `﴿${ayahText}﴾ [${randomSurah.englishName} - ${randomAyah.numberInSurah}]`;
        advice.textContent = displayText;

        if ("Notification" in window && Notification.permission === "granted") {
            new Notification("📖 آية جديدة", { body: ayahText });
        }
    } catch (error) {
        advice.textContent = "Something went wrong, try again!";
        console.error(error);
    }
}

getAyah();

setInterval(getAyah, 300000);

btn.addEventListener("click", getAyah);
