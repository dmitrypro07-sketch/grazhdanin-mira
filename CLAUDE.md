# CLAUDE.md — Гражданин мира (Визовый центр)

## Проект
Корпоративный сайт визового центра "Гражданин мира", Петрозаводск. Основатель — Александр Денисов. Сайт с вау-эффектами на чистом HTML/CSS/JS.

## Стек
- HTML5 + CSS3 + Vanilla JS
- Никаких фреймворков и сборщиков
- Адаптивная вёрстка (мобайл-фёрст)
- Шрифт: CenturyGothic (папка fonts/)

## Структура файлов
```
grazhdanin_mira/
├── index.html         # Главная страница (все секции)
├── css/style.css      # Все стили (~1200 строк)
├── js/main.js         # Скрипты (14 функций + AI чат + flip)
├── img/
│   ├── logo/          # Логотипы бренда
│   └── max-logo.png   # Лого мессенджера Max
├── fonts/             # CenturyGothic TTF
├── project.md
├── PLAN.md
└── CLAUDE.md
```

## Цвета бренда
- `#1F3638` — тёмный зелёный (основной)
- `#D18F59` — золотой/охра (акцент)
- `#F4F0D9` — кремовый (светлый фон)

## Секции index.html (порядок)
1. Header (sticky, бургер)
2. Hero (видео, частицы, typing, флаги, счётчики)
3. Ticker (бегущая строка 18 стран)
4. Services (6 карточек с ценами)
5. How (4 шага)
6. Why (6 flip-карточек)
7. About (фото + факты)
8. Countries (14 стран + флаги)
9. Reviews (6 карточек)
10. FAQ (аккордеон)
11. Contacts (карта OpenStreetMap + соцсети)
12. Application (форма заявки)
13. Footer

## Эффекты (js/main.js)
- `initScrollProgress` — золотая полоска сверху
- `initMobileMenu` — бургер + анимация крестика
- `initSmoothScroll` — плавный скролл easeOutExpo
- `initScrollReveal` — IntersectionObserver для .reveal
- `initCounters` — анимированные числа [data-count]
- `initParticles` — canvas-частицы в hero
- `initTyping` — печатающий текст в hero
- `initTilt` — 3D tilt на карточках
- `initRipple` — ripple-волна на кнопках
- `initFAQ` — аккордеон
- `initForm` — форма (пока заглушка)
- `initCursor` — кастомный курсор (только десктоп)
- Flip-карточки — hover + клик (мобилка)
- AI-чат — виджет с базовыми ответами

## Правила разработки
- Все стили — только в `css/style.css`
- Все скрипты — только в `js/main.js`
- Изображения — в `img/`
- Не трогать порядок секций без причины
- Флаги = картинки с flagcdn.com, не эмодзи

## Команды запуска
```
Открыть index.html в браузере — готово.
```

## Что ждёт после деплоя
- Подключить Telegram-бот (токен от @BotFather)
- Подключить Google Sheets через Apps Script
- Заменить OpenStreetMap на Яндекс.Карты iframe
- Добавить видео hero-bg.mp4
- Зарегистрировать на Яндекс.Картах, Google Maps, 2GIS

## Стиль общения
- Михалыч — владелец проекта
- Общаемся неформально, на "ты"
- Ответы короткие и по делу
