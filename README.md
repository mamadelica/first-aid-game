# Перша допомога — Навчальна гра

Браузерна гра-симулятор, де гравець відпрацьовує навички першої допомоги.  
Задається реальна ситуація, гравець обирає дії — і залежно від вибору постраждалого врятовано або він гине.

---

## Технології

- **React 19** + **Vite**
- **React Router v7** — навігація між сторінками
- **CSS Modules** — ізольовані стилі компонентів
- **JSON** — весь контент (сценарії, тексти, варіанти відповідей)

---

## Структура проєкту

```
first-aid-game/
├── index.html
├── vite.config.js
├── package.json
│
└── src/
    ├── main.jsx               # Точка входу
    ├── App.jsx                # Маршрути
    │
    ├── styles/
    │   └── index.css          # CSS-змінні, reset
    │
    ├── context/
    │   └── GameContext.jsx    # Глобальний стан гри (useReducer)
    │
    ├── hooks/
    │   └── useScenario.js     # Хелпери для роботи зі сценаріями
    │
    ├── data/
    │   └── scenarios.json     # ВСІ тексти та логіка гри
    │
    ├── pages/
    │   ├── HomePage/          # Список сценаріїв для вибору
    │   ├── GamePage/          # Ігровий процес (ситуація + вибір)
    │   └── ResultPage/        # Результат: врятовано / загинув
    │
    └── components/
        ├── ScenarioCard/      # Картка з ситуацією та фідбеком
        ├── ChoiceButton/      # Кнопка вибору дії
        ├── ProgressBar/       # Прогрес кроків
        └── OutcomeScreen/     # Екран результату з балами
```

---

## Запуск

```bash
npm install
npm run dev
```

Відкрий [http://localhost:5173](http://localhost:5173)

---

## Сценарії

Всі сценарії живуть у `src/data/scenarios.json`. Структура одного сценарію:

```json
{
  "id": "cardiac-arrest",
  "title": "Зупинка серця",
  "description": "Короткий опис для картки на головній",
  "icon": "❤️",
  "difficulty": "medium",
  "firstStepId": "ca-step-1",

  "steps": [
    {
      "id": "ca-step-1",
      "stepNumber": 1,
      "totalSteps": 4,
      "situation": "Текст ситуації, яку бачить гравець",
      "choices": [
        {
          "id": "ca-1-a",
          "text": "Текст варіанту відповіді",
          "isCorrect": true,
          "points": 25,
          "feedback": "Пояснення після вибору",
          "nextStepId": "ca-step-2"
        },
        {
          "id": "ca-1-b",
          "text": "Неправильна дія",
          "isCorrect": false,
          "points": 0,
          "feedback": "Чому це неправильно",
          "nextStepId": "outcome-failure"
        }
      ]
    }
  ],

  "outcomes": {
    "success": {
      "id": "outcome-success",
      "type": "success",
      "title": "Постраждалого врятовано!",
      "description": "Деталі результату",
      "emoji": "🚑"
    },
    "failure": {
      "id": "outcome-failure",
      "type": "failure",
      "title": "Постраждалий помер",
      "description": "Деталі результату",
      "emoji": "💔"
    }
  }
}
```

### Як додати новий сценарій

1. Додай об'єкт у масив `scenarios` у `src/data/scenarios.json`
2. Задай унікальні `id` для сценарію, кроків і варіантів
3. `nextStepId` може бути або `id` наступного кроку, або `"outcome-success"` / `"outcome-failure"`
4. Більше нічого не чіпати — гра підхопить сценарій автоматично

---

## Готові сценарії

| Сценарій | Складність | Кроків |
|---|---|---|
| Зупинка серця (СЛР + AED) | Середній | 4 |
| Задуха (прийом Хаймліха) | Легкий | 3 |
| Сильна кровотеча | Легкий | 3 |

---

## Ліцензія

MIT — для освітніх цілей.
