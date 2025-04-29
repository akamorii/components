FROM python:3.11

# Устанавливаем зависимости и переменные окружения
ENV POETRY_VERSION=1.8.2

# Устанавливаем poetry
RUN pip install --upgrade pip && \
    pip install poetry==${POETRY_VERSION}

# Устанавливаем рабочую директорию
WORKDIR "/monitoring(diplom)"

# Копируем pyproject.toml и poetry.lock (для кэширования зависимостей)
COPY api/pyproject.toml api/poetry.lock ./api/

# Устанавливаем зависимости БЕЗ установки текущего проекта
RUN cd api && poetry config virtualenvs.create false && poetry install --no-root --only=main

# Копируем остальной проект
COPY . .

# Запуск
CMD ["python", "start_project.py"]