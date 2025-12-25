document.addEventListener('DOMContentLoaded', function() {
  // Геолокация
  document.getElementById('geolocation-btn').addEventListener('click', function() {
    if (!navigator.geolocation) {
      alert("Геолокация не поддерживается");
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      function(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        document.getElementById('city-input').value = `${lat.toFixed(4)},${lon.toFixed(4)}`;
      },
      function(error) {
        alert("Разрешите геолокацию в настройках браузера");
      }
    );
  });

  // МАНТРЫ ДЛЯ ТРАДИЦИЙ
  const traditions = {
    "sri_vaishnavism": { name: "Шри-Вайшнавизм", practice: "108 повторений джапой" },
    "gaudiya_vaishnavism": { name: "Гаудия-вайшнавизм", practice: "16 кругов на чётках + медитация" },
    "shaivism": { name: "Шиваизм", practice: "108 повторений Ом Намах Шивая" },
    "shaktism": { name: "Шактизм", practice: "27 повторений мантры Чамунды" },
    "smarta": { name: "Смарта-традиция", practice: "Пение мантры Сарасвати" }
  };

  // Расчёт расписания
  document.getElementById('setup-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Проверка загрузки SunCalc
    if (typeof SunCalc === 'undefined') {
      alert("Ошибка: Обновите страницу (Ctrl+F5)");
      return;
    }
    
    const input = document.getElementById('city-input').value.trim();
    const coords = input.split(',');
    const lat = parseFloat(coords[0]);
    const lon = parseFloat(coords[1]);
    
    if (isNaN(lat) || isNaN(lon) || coords.length < 2) {
      alert("Введите координаты как: 53.1833,45.0000");
      return;
    }
    
    const traditionKey = document.getElementById('tradition').value;
    const durationMode = document.querySelector('input[name="duration"]:checked').value;
    const tradition = traditions[traditionKey];
    const practiceDuration = durationMode === 'repetitions' ? 21 : 15; // минуты
    
    // Генерация расписания на 30 дней
    let html = `<h2>Расписание для ${tradition.name}</h2><table border="1" style="width:100%;border-collapse:collapse;margin:20px 0;">`;
    html += `<tr><th>Дата</th><th>Восход</th><th>Brahma Muhurta</th><th>Практики</th></tr>`;
    
    const now = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(now);
      date.setDate(now.getDate() + i);
      
      const times = SunCalc.getTimes(date, lat, lon);
      const sunrise = times.sunrise;
      const brahmaStart = new Date(sunrise.getTime() - 96*60000);
      const practiceEnd = new Date(brahmaStart.getTime() + practiceDuration*60000);
      
      html += `
        <tr>
          <td>${date.toLocaleDateString('ru-RU')}</td>
          <td>${sunrise.toLocaleTimeString('ru-RU', {hour12:false})}</td>
          <td style="background:#f9d77e">${brahmaStart.toLocaleTimeString('ru-RU', {hour12:false})}–${sunrise.toLocaleTimeString('ru-RU', {hour12:false})}</td>
          <td>${practiceEnd.toLocaleTimeString('ru-RU', {hour12:false})} — ${tradition.practice}</td>
        </tr>
      `;
    }
    
    html += `</table><button onclick="location.reload()" style="background:#f9d77e;padding:10px;border:none;margin-top:20px;">Вернуться</button>`;
    document.querySelector('main').innerHTML = html;
  });
});
