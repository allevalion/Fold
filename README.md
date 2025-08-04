# Fold

<!-- markdownlint-disable MD001 MD033 -->

<p align="center">
  <img src="./src/assets/svg/favicon.svg" alt="Fold Logo">
</p>

Fold — это e-commerce сайт, специализирующийся на изготовленных вручную бумажных самолетах. Каждый самолет тщательно спроектирован для оптимальных летных характеристик и эстетической привлекательности. Проект демонстрирует современный и доступный веб-интерфейс с плавными анимациями и интуитивной навигацией.

<p align="center">
  <a href="https://allevalion.github.io/Fold/" target="_blank" style="display:inline-block; padding:14px 26px; background-color:#338ff2; color:#fff; border-radius:16px; font-family:'Plus Jakarta Sans', sans-serif; font-weight:700; text-decoration:none; font-size:18px; box-shadow:0 2px 8px rgba(0,0,0,0.1); transition:background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;">
    🚀 Открыть демо на GitHub Pages
  </a>
</p>

## Особенности

- Адаптивный дизайн для всех устройств
- Плавные анимации
- Поиск товаров по названию
- Интерактивная корзина с возможностью изменения количества товаров
- Несколько категорий для удобной навигации по товарам
- Фильтрация товаров на странице магазина
- Подробные страницы с описанием, ценой и параметрами самолетов
- Разделы "О нас" и "Контакты" с анимацией при прокрутке
- Современный интерфейс с фокусом на минимализм и чистоту
- Быстрая загрузка страниц благодаря оптимизации ассетов
- Поддержка 404-страницы с мягкой навигацией обратно в каталог
- Простое оформление заказа (checkout)
- Кроссбраузерная совместимость (Chrome, Safari, Firefox, Edge)
- Оптимизировано для экранных читалок и навигации с клавиатуры

## Используемые технологии

- HTML5, CSS3, JavaScript
- Vite для быстрой разработки
- Prettier и Stylelint для качества кода
- Git для контроля версий

## Структура проекта [(src/)](./src)

```plaintext
# HTML-страницы верхнего уровня
│   404.html             # Страница ошибки
│   about.html           # Раздел "О нас"
│   cart.html            # Корзина пользователя
│   checkout.html        # Оформление заказа
│   contact.html         # Страница с формой обратной связи
│   index.html           # Главная страница
│   products.json        # Данные о товарах (используется JS)
│   secret.html          # Секретная страница
│   shop.html            # Каталог всех товаров

├───assets               # Все ресурсы проекта: шрифты, изображения, иконки
│   │   favicon.ico      # Иконка сайта для браузера
│   ├───fonts            # Шрифты
│   │       fonts.css                    # Подключение шрифтов
│   │       PlusJakartaSans-*.ttf       # Вариативные шрифты проекта
│   ├───img              # Изображения общего назначения
│   │   │   apple-touch-icon.png        # Иконка для iOS
│   │   │   first-plane.webp            # Первый самолет (страница "О нас")
│   │   │   hero-background.webp        # Фоновое изображение главной
│   │   ├───card-images     # Превью товаров по категориям
│   │   │   ├───artistic-planes         # Арт-самолеты
│   │   │   │       mythic-artistic.webp
│   │   │   ├───classic-gliders         # Классические самолеты
│   │   │   │       dayflight-classic.webp
│   │   │   │       shadow-classic.webp
│   │   │   └───high-speed              # Скоростные
│   │   │           shadow-high-speed.webp
│   │   └───team-members     # Фото команды
│   │           alex-morgan.webp
│   │           jami-chen.webp
│   │           mila-verne.webp
│   │           rafael-ito.webp
│   └───svg              # Векторные иконки SVG
│           cart.svg                     # Иконка корзины
│           favicon.svg                  # Логотип сайта

├───css                  # Все стили проекта
│   │   *.css            # Стили, привязанные к страницам
│   │   variables.css    # Цвета, размеры, шрифты (переменные проекта)
│   └───common           # Общие модули
│           animations.css               # Анимации fade-in
│           floating-button.css          # Стили для всплывающей кнопки
│           footer.css                   # Подвал сайта
│           header.css                   # Шапка сайта
│           notifications.css            # Всплывающие уведомления
│           reset.css                    # Normalize и сброс стилей

├───js                   # JavaScript логика
│   │   *.js             # Скрипты для каждой страницы
│   ├───common           # Повторно используемые модули
│   │       header.js                  # Управление меню/логикой шапки
│   │       notifications.js           # Уведомления
│   └───utils            # Вспомогательные утилиты
│           cartUtils.js               # Работа с корзиной через localStorage
│           floatingButton.js          # Управление всплывающей кнопкой

└───product              # Отдельные страницы товаров
        # Каждая страница — карточка конкретного самолета
        aether.html
        arrow.html
        bullet.html
        cloudsurfer.html
        condor.html
        dragonfly.html
        eagle.html
        falcon.html
        hummingbird.html
        mirage.html
        nightshade.html
        origami.html
        phoenix.html
        raptor.html
        silverwing.html
        stingray.html
        swift.html
        thunderbolt.html
        voyager.html
        winddancer.html
        zenith.html
```

## Установка и запуск проекта

### Установка

Клонируйте репозиторий:

```bash
git clone https://github.com/allevalion/Fold.git
```

Перейдите в папку проекта:

```bash
cd Fold
```

Установите зависимости:

```bash
npm install
```

### Режим разработки

Запуск локального сервера:

```bash
npm run dev
```

Сборка проекта для продакшена:

```bash
npm run build
```

Предпросмотр собранного проекта:

```bash
npm run preview
```

### Проверка качества кода

Проверка форматирования:

```bash
npm run check
```

Форматирование всего проекта:

```bash
npm run format
```

Проверка CSS-стилей:

```bash
npm run lint
```

Автоматическое исправление ошибок в CSS:

```bash
npm run lintfix
```

Запуск всех проверок:

```bash
npm run checkAll
```

Автоисправление всех найденных проблем:

```bash
npm run fixAll
```
