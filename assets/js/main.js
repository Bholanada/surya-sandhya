// Ждём полной загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
  
  // Геолокация (рабочая)
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

  // Расчёт расписания
  document.getElementById('setup-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // ПРОВЕРКА: Доступна ли SunCalc?
    if (typeof SunCalc === 'undefined') {
      alert("Ошибка: Библиотека SunCalc не загружена. Обновите страницу (Ctrl+F5).");
      return;
    }
    
    const input = document.getElementById('city-input').value.trim();
    const coords = input.split(',');
    
    if (coords.length < 2) {
      alert("Введите координаты: 53.1833,45.0000 (Пенза)");
      return;
    }
    
    const lat = parseFloat(coords[0]);
    const lon = parseFloat(coords[1]);
    
    if (isNaN(lat) || isNaN(lon)) {
      alert("Неверный формат координат. Пример: 53.1833,45.0000");
      return;
    }
    
    // РАСЧЁТ
    const now = new Date();
    const times = SunCalc.getTimes(now, lat, lon);
    
    // ФОРМИРОВАНИЕ Brahma Muhurta
    const brahmaStart = new Date(times.sunrise.getTime() - 96 * 60000);
    const brahmaEnd = new Date(times.sunrise.getTime());
    
    // ВЫВОД
    document.querySelector('main').innerHTML = `
      <h2>✅ Расписание для ${input}</h2>
      <p><strong>Восход:</strong> ${times.sunrise.toLocaleTimeString('ru-RU')}</p>
      <p><strong>Brahma Muhurta:</strong> ${brahmaStart.toLocaleTimeString('ru-RU')} – ${brahmaEnd.toLocaleTimeString('ru-RU')}</p>
      <button onclick="location.reload()" style="margin-top:20px;background:#f9d77e;padding:10px;border:none">
        Вернуться к форме
      </button>
    `;
  });
});
