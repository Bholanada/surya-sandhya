// РАБОЧАЯ ГЕОЛОКАЦИЯ (как было до ошибок)
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
    function() {
      alert("Разрешите геолокацию в настройках браузера");
    }
  );
});

// Минимальный расчёт расписания
document.getElementById('setup-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const input = document.getElementById('city-input').value;
  const coords = input.split(',');
  const lat = parseFloat(coords[0]);
  const lon = parseFloat(coords[1]);
  
  if (isNaN(lat) || isNaN(lon)) {
    alert("Введите координаты: 53.1833,45.0000");
    return;
  }
  
  // Проверка SunCalc
  if (!window.SunCalc) {
    alert("Ошибка: SunCalc не загружен");
    return;
  }
  
  const now = new Date();
  const times = window.SunCalc.getTimes(now, lat, lon);
  document.querySelector('main').innerHTML = `
    <h2>Тест: восход в Пензе</h2>
    <p>Восход: ${times.sunrise.toLocaleTimeString('ru-RU')}</p>
    <p>Координаты: ${lat}, ${lon}</p>
    <button onclick="location.reload()">Назад</button>
  `;
});
