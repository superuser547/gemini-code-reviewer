# Gemini Code Reviewer

Gemini Code Reviewer — это инструмент для автоматизированного анализа и рецензирования кода с использованием AI от Google Gemini. Приложение помогает выявить ошибки, дать рекомендации по улучшению, а также оценить удобочитаемость, эффективность и безопасность вашего кода.

## Особенности

- **AI рецензирование кода**: Получите подробный анализ и конструктивные рекомендации для повышения качества кода.
- **Многоязычная поддержка**:
  - Выбор языка программирования, который нужно отревьюировать.
  - Выбор языка, на котором будет представлен анализ (например, английский, русский, испанский и др.).
- **Интерфейс на React/Vite**: Простой, быстрый и отзывчивый интерфейс для удобного взаимодействия.
- **Конфигурация через переменные окружения**: Безопасное хранение и использование Gemini API ключа.
- **Модульная архитектура**: Разделение на компоненты, сервисы и типы позволяет легко масштабировать проект.

## Структура проекта

```bash
.
├── public/           # Статические файлы (HTML, стили, изображения)
├── src/              # Исходный код приложения
│   ├── components/    # React-компоненты
│   ├── services/      # Сервис для взаимодействия с Gemini API
│   ├── types.ts       # Определения TypeScript для типов данных
│   ├── constants.ts   # Константы: поддерживаемые языки для кода и рецензии
│   └── App.tsx        # Главный компонент, объединяющий функционал приложения
├── .env.local        # Переменные окружения
├── package.json      # Метаданные проекта и скрипты
└── README.md         # Документация проекта
```

## Установка

### Предварительные требования

- Node.js (версия 14 или выше)
- Менеджер пакетов (npm или yarn)
- Gemini API Key от Google (получите на официальном сайте)

### Шаги установки

1. Клонируйте репозиторий:
   ```bash
   git clone <repository-url>
   cd gemini-code-reviewer
   ```
2. Установите зависимости:
   ```bash
   npm install
   ```
3. Создайте файл `.env.local` в корневой директории и добавьте ваш API ключ:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

## Запуск приложения

### Режим разработки

Для запуска в режиме разработки выполните:
```bash
npm run dev
```
Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000).

### Сборка для продакшена

Для создания продакшен-сборки выполните:
```bash
npm run build
```
Собранные файлы появятся в директории `dist`. Это можно использовать для деплоймента на сервер или платформу развертывания статических сайтов (Netlify, Vercel и др.).

## Использование

1. Выберите язык программирования для проверки и язык, на котором хотите получить отзыв.
2. Вставьте или введите код в текстовое поле.
3. Нажмите кнопку **Review Code** для получения анализа.
4. Просмотрите результаты рецензии и, при необходимости, нажмите **Clear** для сброса ввода и вывода.

## Развертывание

После сборки проекта, разместите содержимое директории `dist` на выбранном сервере или воспользуйтесь платформой для развертывания.

## Вклад и улучшения

Мы приглашаем сообщество к сотрудничеству! Если у вас есть предложения или вы обнаружили проблему:
- Создайте issue в репозитории.
- Отправьте pull request с рекомендациями по улучшению.

## Лицензия

Проект распространяется под лицензией [MIT License](LICENSE).

## Контакты

Возникли вопросы или предложения? Свяжитесь с разработчиками через issues на GitHub или отправьте pull request.

