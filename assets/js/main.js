// Геолокация
document.getElementById('geolocation-btn').addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(4);
        const lon = position.coords.longitude.toFixed(4);
        document.getElementById('city-input').value = `Координаты: ${lat}, ${lon}`;
        alert(`Геолокация определена!\nШирота: ${lat}\nДолгота: ${lon}\n(В финальной версии здесь будет расчёт восхода)`);
      },
      () => alert("Ошибка геолокации. Разрешите доступ в настройках браузера."),
      { enableHighAccuracy: true, timeout: 5000 }
    );
  } else {
    alert("Ваш браузер не поддерживает геолокацию. Введите город вручную.");
  }
});

// Генерация расписания (заглушка)
document.getElementById('setup-form').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const city = document.getElementById('city-input').value || "Пенза";
  const tradition = document.getElementById('tradition').value;
  const duration = document.querySelector('input[name="duration"]:checked').value;
  
  // Сохраняем в localStorage для демо-версии
  localStorage.setItem('surya-sandhya-city', city);
  localStorage.setItem('surya-sandhya-tradition', tradition);
  localStorage.setItem('surya-sandhya-duration', duration);
  
  alert(`Расписание для:\nГород: ${city}\nТрадиция: ${tradition}\nДлительность: ${duration}`);
  
  // В финальной версии здесь будет переход к реальному расписанию
  window.location.href = "#";
});
