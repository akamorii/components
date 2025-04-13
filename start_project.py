import os
import subprocess
from functools import wraps
from threading import Thread
import signal
import sys
from dotenv import load_dotenv
import webbrowser
import time

load_dotenv()

PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
processes = []  # глобальный список процессов

def in_directory(path):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            if not path:
                raise ValueError("❌ Путь не задан в переменной окружения.")
            full_path = os.path.join(PROJECT_ROOT, path)
            if not os.path.exists(full_path):
                raise FileNotFoundError(f"❌ Путь не существует: {full_path}")
            original_cwd = os.getcwd()
            try:
                os.chdir(full_path)
                print(f"➡️ Перешёл в {full_path}")
                return func(*args, **kwargs)
            finally:
                os.chdir(original_cwd)
                print(f"⬅️ Вернулся в {original_cwd}")
        return wrapper
    return decorator


def start_process(command):
    try:
        print(f"🚀 Запускаю: {' '.join(command)}")
        proc = subprocess.Popen(command)
        processes.append(proc)
        proc.wait()
    except Exception as e:
        print(f"❌ Ошибка при запуске {' '.join(command)}: {e}")
        shutdown_all()
        sys.exit(1)


def shutdown_all():
    print("🛑 Останавливаю все процессы...")
    for proc in processes:
        if proc.poll() is None:  # если ещё работает
            proc.terminate()
            try:
                proc.wait(timeout=5)
            except subprocess.TimeoutExpired:
                proc.kill()
    print("✅ Все процессы остановлены.")


@in_directory(os.getenv('REL_PROJECT_PATH_TO_BACK_ROOT'))
def run_backend():
    start_process(['uvicorn', 'main:app', '--reload'])
    time.sleep(2)

@in_directory(os.getenv('REL_PROJECT_PATH_TO_FRONT_ROOT'))
def run_frontend():
    start_process(['npm', 'start'])
    
    time.sleep(3)

    webbrowser.open("http://localhost:3000")


def handle_interrupt(signal_num, frame):
    print("\n⚠️ Прерывание (Ctrl+C). Завершение работы...")
    shutdown_all()
    sys.exit(0)


if __name__ == '__main__':
    signal.signal(signal.SIGINT, handle_interrupt)

    try:
        t1 = Thread(target=run_frontend)
        t2 = Thread(target=run_backend)

        time.sleep(2)
        t1.start()
        time.sleep(2)
        t2.start()
        time.sleep(2)

        t1.join()
        t2.join()
    except KeyboardInterrupt:
        handle_interrupt(None, None)
    except Exception as e:
        print(f"❌ Ошибка выполнения: {e}")
        shutdown_all()
        sys.exit(1)