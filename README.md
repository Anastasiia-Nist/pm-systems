# pm-systems
# Project Management Systems

# 🛠️ Установка и запуск проекта

## 📦 Зависимости

Для запуска проекта требуется установленный **Docker** и **Docker Compose**.

- [Установка Docker](https://www.docker.com/get-started)
- [Установка Docker Compose](https://docs.docker.com/compose/install/)

### 🔍 Проверка версий

Убедитесь, что Docker и Docker Compose установлены корректно и доступны в терминале:

```bash
docker --version
docker-compose --version
```

## 🐳 Запуск через Docker Compose

```bash
docker-compose up --build
```

После запуска приложение будет оступно по адресу:
- Бекенд http://127.0.0.1:8080
- Фронтенд http://127.0.0.1:5173

## 🧪Запуск фронтенда локально:

### Бекенд
- Разверните сервер бекенда как описано в [инструкции](https://github.com/avito-tech/tech-internship/blob/main/Tech%20Internships/Frontend/Frontend-trainee-assignment-spring-2025/server/README.md)
### Фронтенд
- Перейдите в папку frontend
```bash
cd frontend
```
- Установите зависимости
```bash
npm install
```
- Запустите проект
```bash
npm run dev
```
После запуска приложение будет оступно по адресу:
- Бекенд http://127.0.0.1:8080
- Фронтенд http://localhost:5173

## 💡 Технологии

Проект построен с использованием современного стека инструментов, обеспечивающего быструю разработку, типобезопасность и удобство поддержки:

| Технология              | Назначение                                                                |
|-------------------------|---------------------------------------------------------------------------|
| **TypeScript**          | Статическая типизация                                                     |
| **Vite**                | Современный сборщик                                                       |
| **Zustand**             | state-менеджер для React                                                  |
| **@dnd-kit/core**       | Библиотека для drag-and-drop                                              |
| **react-toastify**      | Всплывающие уведомления                                                   |
| **ESLint + Prettier**   | Автоформатирование кода                                                   |
| **Docker Compose**      | Быстрый запуск всех сервисов одной командой                               |

## 📁 Проект выложен на сервер и доступен по ссылке [pm-systems](http://109.172.31.240/)