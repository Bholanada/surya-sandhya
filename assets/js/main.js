// ВСЕ МАНТРЫ ВНУТРИ КОДА (обход CORS)
const traditions = {
  "sri_vaishnavism": {
    "name": "Шри-Вайшнавизм",
    "morning": {
      "text": "विष्णुं शरणं नित्यं वन्दे विश्वरूपं जगत्पतिम्।\nवासुदेवं सनातनं नमामि पुरुषोत्तमम्॥",
      "translit": "Vishnum sharanaṁ nityaṁ vande vishvarūpaṁ jagatpatim | Vāsudevam sanātanaṁ namāmi purushottamam ||",
      "translation": "«Вечно прибегаю к прибежищу Вишну...»",
      "practice": "108 повторений джапой или пение в стиле *сварасампади*"
    },
    "evening": {
      "text": "ॐ नमो नारायणाय",
      "translit": "Om Namo Nārāyanāya",
      "translation": "«Поклонение Нараяне — источнику всех существ».",
      "practice": "21 повторение с фокусом на дыхании"
    }
  },
  "gaudiya_vaishnavism": {
    "name": "Гаудия-вайшнавизм",
    "morning": {
      "text": "हरे कृष्ण हरे कृष्ण, कृष्ण कृष्ण हरे हरे\nहरे राम हरे राम, राम राम हरे हरे॥",
      "translit": "Hare Kṛṣṇa Hare Kṛṣṇa, Kṛṣṇa Kṛṣṇa Hare Hare | Hare Rāma Hare Rāma, Rāma Rāma Hare Hare ||",
      "translation": "Маха-мантра для очищения сознания",
      "practice": "Минимум 16 кругов на чётках + 10 минут медитации на звук"
    },
    "evening": {
      "text": "यशोदा कुमारं नन्दलालं गोपालं वन्दे॥",
      "translit": "Yaśodā kumāraṁ nandalālaṁ gopālaṁ vande ||",
      "translation": "«Поклоняюсь Гопале — мальчику Яшоды...»",
      "practice": "Пение в стиле *мангаджатам* для смягчения эго"
    }
  },
  "shaivism": {
    "name": "Шиваизм",
    "morning": {
      "text": "ॐ नमः शिवाय",
      "translit": "Om Namaḥ Śivāya",
      "translation": "«Поклонение Шиве — благому...»",
      "practice": "108 повторений с визуализацией внутреннего света"
    },
    "evening": {
      "text": "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्।\nउर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात्॥",
      "translit": "Om tryambakaṁ yajāmahe sugandhiṁ puṣṭi-vardhanam | Urvarukamiva bandhanān mṛtyor mukṣīya mā’mṛtāt ||",
      "translation": "«Почитаем Трёхглазого (Шиву)...»",
      "practice": "11 повторений, сидя на земле"
    }
  },
  "shaktism": {
    "name": "Шактизм",
    "morning": {
      "text": "ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे॥",
      "translit": "Om Aiṁ Hrīṁ Klīṁ Cāmuṇḍāyai Vicce ||",
      "translation": "«Священные слоги, пробуждающие энергию Кали-Чамунды...»",
      "practice": "27 повторений + медитация на красный цвет"
    },
    "evening": {
      "text": "या देवी सर्वभूतेषु निद्रारूपेण संस्थिता।\nनमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः॥",
      "translit": "Yā devī sarvabhūteṣu nidrārūpeṇa saṁsthitā | Namastasyai namastasyai namastasyai namo namaḥ ||",
      "translation": "«Той Богине, что пребывает во всех существах в форме сна...»",
      "practice": "Пение в полной темноте"
    }
  },
  "smarta": {
    "name": "Смарта-традиция",
    "morning": {
      "text": "ॐ आप्यायन्तु नमो भगवन्ति वसवो विश्वे समुद्राः\nसरस्वती च। राजा वैश्रवणो दधत्विदं मे वसु॥",
      "translit": "Om āpyāyantu namo bhagavanti vasavo viśve samudrāḥ | Sarasvatī ca | Rājā vaiśravaṇo dadhatv idaṁ me vasu ||",
      "translation": "«Пусть все силы даруют мне изобилие...»",
      "practice": "Пение стоя, лицом к востоку"
    },
    "evening": {
      "text": "ॐ शान्तिः शान्तिः शान्तिः",
      "translit": "Om śāntiḥ śāntiḥ śāntiḥ",
      "translation": "«Мир. Мир. Мир».",
      "practice": "Трижды шёпотом, касаясь лба, груди и коленей"
    }
  }
};

// Геолокация
document.getElementById('geolocation-btn').addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        document.getElementById('city-input').value = `${lat.toFixed(4)},${lon.toFixed(4)}`;
      },
      (error) => {
        alert(`Ошибка геолокации: ${error.message}. Используйте Пензу: 53.1833,45.0000`);
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  } else {
    alert("Ваш браузер не поддерживает геолокацию. Введите Пензу: 53.1833,45.0000");
  }
});

// Генерация расписания
document.getElementById('setup-form').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const input = document.getElementById('city-input').value;
  const traditionKey = document.getElementById('tradition').value;
  const durationMode = document.querySelector('input[name="duration"]:checked').value;
  
  // Парсим координаты
  let coords = input.split(',');
  if (coords.length < 2) {
    alert("Введите координаты как: 53.1833,45.0000 (широта, долгота)");
    return;
  }
  
  const lat = parseFloat(coords[0]);
  const lon = parseFloat(coords[1]);
  
  if (isNaN(lat) || isNaN(lon)) {
    alert("Неверный формат координат. Пример: 53.1833,45.0000");
    return;
  }

  // Расчёт Brahma Muhurta на 30 дней
  const schedule = [];
  const now = new Date();
  const tradition = traditions[traditionKey];
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() + i);
    
    // Расчёт восхода через SunCalc
    const times = SunCalc.getTimes(date, lat, lon);
    const sunrise = times.sunrise;
    
    // Brahma Muhurta: 96 минут + 15 минут на подготовку
    const brahmaStart = new Date(sunrise.getTime() - (96 + 15) * 60000);
    const brahmaEnd = new Date(sunrise.getTime() - 15 * 60000);
    
    // Вычисляем время практик
    const practiceDuration = durationMode === 'repetitions' ? 21 : 15; // минуты
    const practiceEnd = new Date(brahmaStart.getTime() + practiceDuration * 60000);
    
    schedule.push({
      date: date.toLocaleDateString('ru-RU'),
      sunrise: sunrise.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      brahmaStart: brahmaStart.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      brahmaEnd: brahmaEnd.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      practices: [
        `${brahmaStart.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })} — Подготовка`,
        `${brahmaStart.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })} — Brahma Muhurta`,
        `${practiceEnd.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })} — ${tradition.morning.practice}`
      ]
    });
  }

  // Отображение расписания
  let content = document.createElement('div');
  content.innerHTML = `
    <h2>Расписание на 30 дней для ${tradition.name}</h2>
    <div style="overflow-x:auto;">
      <table border="1" style="width:100%; border-collapse: collapse; margin-top:20px;">
        <tr>
          <th style="padding:8px;background:#f0f0f0">Дата</th>
          <th style="padding:8px;background:#f0f0f0">Восход</th>
          <th style="padding:8px;background:#f9d77e">Brahma Muhurta</th>
          <th style="padding:8px;background:#f0f0f0">Практики</th>
        </tr>
        ${schedule.map(day => `
        <tr>
          <td style="padding:8px">${day.date}</td>
          <td style="padding:8px">${day.sunrise}</td>
          <td style="padding:8px;background:#f9d77e">${day.brahmaStart} – ${day.brahmaEnd}</td>
          <td style="padding:8px">${day.practices.join('<br>')}</td>
        </tr>`).join('')}
      </table>
    </div>
    <div style="margin-top:20px">
      <button id="pdf-btn" style="background:#f9d77e;padding:10px;border:none;margin-right:10px">Скачать PDF (скоро)</button>
      <button id="copy-btn" style="background:#e6e6fa;padding:10px;border:none">Копировать</button>
    </div>
    <p style="margin-top:20px;color:#666;font-size:0.9em">Данные рассчитаны для координат: ${lat.toFixed(4)}, ${lon.toFixed(4)}</p>
  `;
  
  document.querySelector('main').innerHTML = '';
  document.querySelector('main').appendChild(content);
  
  // Копирование
  document.getElementById('copy-btn').addEventListener('click', () => {
    const text = schedule.map(d => 
      `${d.date}: Brahma Muhurta ${d.brahmaStart}-${d.brahmaEnd}\n` +
      `Практики: ${d.practices.join('\n')}`
    ).join('\n\n');
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        alert("Расписание скопировано в буфер обмена!");
      });
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      alert("Расписание скопировано!");
    }
  });
});
