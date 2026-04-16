# CLAUDE.md — Гражданин мира (Визовый центр)

## Проект
Корпоративный сайт визового центра "Гражданин мира", Петрозаводск. Основатель — Александр Денисов.
Сайт задеплоен на Vercel: **grazhdaninmira.vercel.app**
GitHub: **github.com/dmitrypro07-sketch/grazhdanin-mira**

## Стек
- HTML5 + CSS3 + Vanilla JS
- Никаких фреймворков и сборщиков
- Адаптивная вёрстка (мобайл-фёрст)
- Шрифт: CenturyGothic (папка fonts/)

## Структура файлов
```
grazhdanin_mira/
├── index.html              # Главная страница (все секции)
├── css/style.css           # Все стили (~1500+ строк)
├── js/main.js              # Скрипты (15+ функций + AI чат + flip)
├── favicon.png             # Фавиконка (логотип путешественника)
├── zero-blok.png           # Фоновое фото для Hero
├── img/
│   ├── logo/               # Логотипы бренда
│   └── max-logo.png        # Лого мессенджера Max
├── kartochki_uslug/        # Фото-баннеры для карточек услуг
│   ├── uslugi_viza.png
│   ├── vnzh.png
│   ├── zagranpasport.png
│   ├── ATES.png
│   ├── scheta_i_karty.png
│   └── trud_i_ucheba.png
├── fonts/                  # CenturyGothic TTF
├── project.md
├── PLAN.md
└── CLAUDE.md
```

## Цвета бренда
- `#1F3638` — тёмный зелёный (основной)
- `#D18F59` — золотой/охра (акцент)
- `#F4F0D9` — кремовый (светлый фон)

## Секции index.html (порядок)
1. Header (sticky, бургер + overlay, телефон в nav)
2. Hero (фото zero-blok.png, частицы только десктоп, typing, флаги, счётчики)
3. Ticker (бегущая строка 18 стран)
4. Services (6 флип-карточек: лицо=фото-баннер, оборот=текст+цена)
5. How (4 шага + CTA кнопка снизу)
6. Why (6 flip-карточек)
7. About (фото + факты)
8. Countries (14 стран + флаги, все ведут на #application)
9. Reviews (8 карточек с датами и источником)
10. FAQ (аккордеон)
11. Contacts (карта OpenStreetMap точные координаты Кирова 5 + соцсети)
12. Application (форма заявки + toast подтверждения)
13. Footer (лого 56px, мобилка 44px)

## Эффекты (js/main.js)
- `initScrollProgress` — золотая полоска сверху
- `initMobileMenu` — бургер + overlay + анимация крестика
- `initSmoothScroll` — плавный скролл easeOutExpo
- `initScrollReveal` — IntersectionObserver для .reveal
- `initCounters` — анимированные числа [data-count]
- `initParticles` — canvas-частицы в hero (только window.innerWidth >= 768)
- `initTyping` — печатающий текст в hero
- `initTilt` — 3D tilt только на review-card
- `initRipple` — ripple-волна на кнопках
- `initFAQ` — аккордеон
- `initForm` — форма + toast + зелёное подтверждение внутри формы
- `initCursor` — кастомный курсор (только десктоп)
- Flip-карточки — touchstart/touchend защита от скролла (порог 10px)
- AI-чат — виджет с базовыми ответами на FAQ

## Важные правила
- Все стили — только в `css/style.css`
- Все скрипты — только в `js/main.js`
- font-size на инпутах НЕ МЕНЬШЕ 16px (иначе iOS Safari зумит)
- AI-кнопка — золотой бренд-цвет (#D18F59), не фиолетовый
- Флаги = картинки с flagcdn.com, не эмодзи
- Все CTA-кнопки ведут на `#application`, карточки стран тоже
- `#contacts` — только для карты и соцсетей

## Деплой
```
git add -A && git commit -m "описание" && git push
```
Vercel задеплоит автоматически после пуша.

## Что ждёт после деплоя
- Подключить Telegram-бот + Google Sheets к форме
- Заменить OpenStreetMap на Яндекс.Карты iframe
- Добавить видео hero-bg.mp4
- Добавить фото основателя img/about-photo.jpg
- Подключить домен
- Зарегистрировать на Яндекс.Картах, Google Maps, 2GIS

## Контакты (реальные данные)
- Телефон: +7 (902) 770-10-10
- Адрес: Петрозаводск, ул. Кирова 5, эт. 2, офис 210
- Telegram: @denisov_visa
- Max: vk.me/+79027701010
- VK: vk.com/viza_petrozavodsk

## Стиль общения
- Михалыч — владелец проекта
- Общаемся неформально, на "ты"
- Ответы короткие и по делу
