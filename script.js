const DATABASE_URL = "https://script.google.com/macros/s/AKfycby1MEMIbtvlfczHam5HWhd6QK1Bz4aZkb09wDJLim1JDI36j1DLRSEFb76GTuI1dlwJtA/exec";

function changeMusic(path) {
    const audio = document.getElementById('bg-music');
    audio.src = path;
    audio.play().catch(() => console.log("Нажми на страницу, чтобы звук заработал"));
}

async function sendToCloud() {
    const name = document.getElementById('user-name').value;
    const achievements = document.getElementById('user-achievements').value; // Забираем достижения
    const message = document.getElementById('user-msg').value;
    
    if(!name || !message) return alert("Пожалуйста, заполни хотя бы имя и пожелание!");

    document.getElementById('status').innerText = "Сохраняю твою историю...";
    
    try {
        await fetch(DATABASE_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify({ 
                name: name, 
                achievements: achievements, // Добавляем в отправку
                message: message 
            })
        });
        document.getElementById('status').innerText = "Всё сохранено! ✨";
        // Очищаем поля
        document.getElementById('user-achievements').value = "";
        document.getElementById('user-msg').value = "";
    } catch (e) {
        document.getElementById('status').innerText = "Ошибка отправки.";
    }
}

// Снег
const canvas = document.getElementById('main-canvas');
const ctx = canvas.getContext('2d');
let snowflakes = [];

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    snowflakes = Array.from({length: 100}, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 3 + 1,
        v: Math.random() * 1 + 0.3
    }));
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.beginPath();
    snowflakes.forEach(f => {
        ctx.moveTo(f.x, f.y);
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        f.y += f.v;
        if(f.y > canvas.height) f.y = -5;
    });
    ctx.fill();
    requestAnimationFrame(draw);
}

function updateTimer() {
    const now = new Date();
    const next = new Date(2026, 0, 1);
    const diff = next - now;
    
    if (diff <= 0) {
        document.getElementById('timer').innerText = "С НОВЫМ ГОДОМ!";
        return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff / 3600000) % 24);
    const m = Math.floor((diff / 60000) % 60);
    const s = Math.floor((diff / 1000) % 60);
    
    document.getElementById('timer').innerText = `${d}д ${h}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
    
    const yearStart = new Date(now.getFullYear(), 0, 1);
    const progress = ((now - yearStart) / (next - yearStart)) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';
}

window.onload = () => {
    init(); draw();
    setInterval(updateTimer, 1000);
    // Автозапуск музыки при первом клике
    document.body.onclick = () => {
        const audio = document.getElementById('bg-music');
        if(audio.paused) audio.play();
    };
};
window.onresize = init;

// ... (весь предыдущий JS код) ...

// Функции для Моих Достижений
function addAchievement() {
    const achievementList = document.getElementById('achievement-list');
    const newAch = prompt("Что нового ты достиг в 2025?");
    if (newAch) {
        const li = document.createElement('li');
        li.textContent = newAch;
        achievementList.appendChild(li);
    }
}

// Функция для скриншота
function captureAndDownload() {
    const captureZone = document.getElementById('capture-zone'); // Область для скриншота
    
    // Временно скрываем кнопки скриншота и добавления достижений, чтобы они не попали на скриншот
    const btnScreenshot = document.querySelector('.btn-screenshot');
    const btnAddAch = document.querySelector('.btn-add-ach');
    if (btnScreenshot) btnScreenshot.style.display = 'none';
    if (btnAddAch) btnAddAch.style.display = 'none';

    html2canvas(captureZone, {
        allowTaint: true, // Позволяет обрабатывать изображения с других доменов (для фона, если есть)
        useCORS: true,     // Разрешает загрузку ресурсов через CORS
        backgroundColor: null // Прозрачный фон, чтобы был виден фон страницы
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'MyNewYear2026.png'; // Имя файла
        link.href = canvas.toDataURL('image/png'); // Преобразование канваса в изображение
        link.click(); // Скачивание изображения

        // Возвращаем кнопки на место
        if (btnScreenshot) btnScreenshot.style.display = 'block';
        if (btnAddAch) btnAddAch.style.display = 'block';
    }).catch(err => {
        console.error("Ошибка при создании скриншота: ", err);
        alert("Не удалось сделать скриншот.");
        // Возвращаем кнопки даже в случае ошибки
        if (btnScreenshot) btnScreenshot.style.display = 'block';
        if (btnAddAch) btnAddAch.style.display = 'block';
    });
}

// ... (остальной JS код, включая window.onload) ...

