// ВСТАВЬ ССЫЛКУ ИЗ GOOGLE APPS SCRIPT СЮДА:
const DATABASE_URL = "ТВОЯ_ССЫЛКА_ИЗ_APPS_SCRIPT";

const voiceMessage = "Привет. Это капсула времени. Спасибо, что зашли. Оставьте свое имя и мысли, и они сохранятся в моей базе данных навсегда. Увидимся в 2026-м.";

// Функция отправки данных в Google Таблицу
async function sendToCloud() {
    const name = document.getElementById('user-name').value;
    const message = document.getElementById('user-msg').value;
    const status = document.getElementById('status');

    if(!name || !message) {
        alert("Пожалуйста, напиши имя и сообщение!");
        return;
    }

    status.innerText = "ОТПРАВКА В ОБЛАКО...";
    
    try {
        await fetch(DATABASE_URL, {
            method: 'POST',
            mode: 'no-cors', // Важно для работы с Google Script
            body: JSON.stringify({ name, message })
        });
        status.innerText = "ПОЛУЧЕНО! ТЫ В ИСТОРИИ. ✅";
        document.getElementById('user-msg').value = "";
    } catch (e) {
        status.innerText = "ОШИБКА СВЯЗИ С СЕРВЕРОМ.";
    }
}

// Озвучка
function speakMessage() {
    const audio = document.getElementById('bg-music');
    audio.play(); 
    audio.volume = 0.1;
    
    const ut = new SpeechSynthesisUtterance(voiceMessage);
    ut.lang = 'ru-RU';
    ut.rate = 0.9;
    ut.onend = () => audio.volume = 1.0;
    window.speechSynthesis.speak(ut);
}

// Анимация фона
const canvas = document.getElementById('main-canvas');
const ctx = canvas.getContext('2d');
let snowflakes = [];

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    snowflakes = Array.from({length: 50}, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        s: Math.random() * 2 + 1,
        v: Math.random() * 1 + 0.5
    }));
}

function animate() {
    ctx.fillStyle = '#050520';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    snowflakes.forEach(f => {
        ctx.fillRect(f.x, f.y, f.s, f.s);
        f.y += f.v;
        if(f.y > canvas.height) f.y = -5;
    });
    requestAnimationFrame(animate);
}

// Таймер
function updateTimer() {
    const now = new Date();
    const next = new Date(2026, 0, 1);
    const diff = next - now;
    
    if (diff <= 0) {
        document.getElementById('timer').innerText = "00:00:00";
        return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff / 3600000) % 24);
    const m = Math.floor((diff / 60000) % 60);
    const s = Math.floor((diff / 1000) % 60);
    
    document.getElementById('timer').innerText = `${d}d ${h}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
    
    const start = new Date(now.getFullYear(), 0, 1);
    document.getElementById('progress-fill').style.width = ((now - start) / (next - start)) * 100 + '%';
}

window.onload = () => {
    init();
    animate();
    setInterval(updateTimer, 1000);
};

window.onresize = init;