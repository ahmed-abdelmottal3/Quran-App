const advice = document.getElementById("advice");
const btn = document.getElementById("btn");

function isMobile() {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

if (!isMobile() && "Notification" in window && Notification.permission !== "granted") {
  Notification.requestPermission();
}

async function getAyah() {
  try {
    const res = await fetch("https://api.alquran.cloud/v1/quran/quran-uthmani");
    const data = await res.json();

    const surahs = data.data.surahs;
    const randomSurah = surahs[Math.floor(Math.random() * surahs.length)];
    const randomAyah = randomSurah.ayahs[Math.floor(Math.random() * randomSurah.ayahs.length)];
    const ayahText = randomAyah.text;

    const displayText = `﴿${ayahText}﴾ [${randomSurah.englishName} - ${randomAyah.numberInSurah}]`;
    advice.textContent = displayText;

    // إشعار يظهر على الكمبيوتر فقط
    if (!isMobile() && "Notification" in window && Notification.permission === "granted") {
      new Notification("📖 آية جديدة", { body: ayahText });
    }
  } catch (error) {
    advice.textContent = "حدث خطأ، حاول مرة أخرى!";
    console.error(error);
  }
}

getAyah();

setInterval(getAyah, 300000);

btn.addEventListener("click", getAyah);
