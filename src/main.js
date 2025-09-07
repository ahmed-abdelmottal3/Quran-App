const advice = document.getElementById("advice");
const btn = document.getElementById("btn");

function isMobile() {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

if (!isMobile() && "Notification" in window && Notification.permission !== "granted") {
  Notification.requestPermission();
}

async function getAdvice() {
  try {
    const res = await fetch("https://api.alquran.cloud/v1/quran/quran-uthmani");
    const finalres = await res.json();

    const newAdvice = finalres.data.surahs[0].ayahs[0].text;
    advice.textContent = `"${newAdvice}"`;

    if (!isMobile() && "Notification" in window && Notification.permission === "granted") {
      new Notification("📖 آية جديدة", { body: newAdvice });
    }
  } catch (error) {
    advice.textContent = "حدث خطأ، حاول مرة أخرى!";
  }
}

getAdvice();
setInterval(getAdvice, 300000); 
btn.addEventListener("click", getAdvice);
