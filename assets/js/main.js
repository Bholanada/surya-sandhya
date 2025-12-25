// Загрузка мантр
let traditions = {};
fetch('assets/js/traditions.json')
  .then(response => response.json())
  .then(data => traditions = data);

// Геолокация
document.getElementById('geolocation-btn').addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        document.getElementById('city-input').value = `lat=${lat.toFixed(4)}, lon=${lon.toFixed(4)}`;
      },
      () => alert("Разрешите доступ к местоположению в настройках браузера."),
      { enableHighAccuracy: true, timeout: 5000 }
    );
  } else {
    alert("Ваш браузер не поддерживает геолокацию.");
  }
});

// Генерация расписания
document.getElementById('setup-form').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const input = document.getElementById('city-input').value;
  const traditionKey = document.getElementById('tradition').value;
  const durationMode = document.querySelector('input[name="duration"]:checked').value;
  
  // Парсим координаты из ввода
  let lat, lon;
  if (input.includes('lat=')) {
    const coords = input.split(', ');
    lat = parseFloat(coords[0].split('=')[1]);
    lon = parseFloat(coords[1].split('=')[1]);
  } else {
    alert("Введите координаты в формате: lat=53.1833, lon=45.0000");
    return;
  }

  // Расчёт Brahma Muhurta на 30 дней
  const schedule = [];
  const now = new Date();
  const tradition = traditions[traditionKey];
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() + i);
    
    // Расчёт восхода/заката через SunCalc
    const times = SunCalc.getTimes(date, lat, lon);
    const sunrise = times.sunrise;
    
    // Brahma Muhurta: 96 минут + 15 минут на подготовку
    const brahmaStart = new Date(sunrise.getTime() - (96 + 15) * 60000);
    const brahmaEnd = new Date(sunrise.getTime() - 15 * 60000);
    
    schedule.push({
      date: date.toLocaleDateString('ru-RU'),
      sunrise: sunrise.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      brahmaStart: brahmaStart.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      brahmaEnd: brahmaEnd.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      practices: [
        `${brahmaStart.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })} — Подготовка`,
        `${brahmaStart.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })} — Brahma Muhurta начинается`,
        `${new Date(brahmaStart.getTime() + (durationMode === 'repetitions' ? 21 : 15) * 60000).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })} — ${tradition.morning.practice}`
      ]
    });
  }

  // Отображение расписания
  let html = `<h2>Расписание на 30 дней для ${tradition.name}</h2><table border="1" style="width:100%; border-collapse: collapse;">`;
  html += `<tr>
    <th>Дата</th>
    <th>Восход</th>
    <th>Brahma Muhurta</th>
    <th>Практики</th>
  </tr>`;
  
  schedule.forEach(day => {
    html += `<tr>
      <td>${day.date}</td>
      <td>${day.sunrise}</td>
      <td style="background:#f9d77e">${day.brahmaStart} – ${day.brahmaEnd}</td>
      <td>${day.practices.join('<br>')}</td>
    </tr>`;
  });
  
  html += `</table><br>
    <button id="pdf-btn">Скачать PDF</button>
    <button id="copy-btn">Копировать в буфер</button>`;
  
  document.querySelector('main').innerHTML = html;
  
  // Экспорт в PDF (заглушка)
  document.getElementById('pdf-btn').addEventListener('click', () => {
    alert("PDF будет доступен в финальной версии. Сейчас расписание отображено выше.");
  });
  
  // Копирование
  document.getElementById('copy-btn').addEventListener('click', () => {
    const tempInput = document.createElement('input');
    tempInput.value = schedule.map(d => `${d.date}: ${d.brahmaStart}-${d.brahmaEnd}`).join('\n');
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    alert("Расписание скопировано!");
  });
});
