import sqlite3 as sq
import sys
import os
from dotenv import load_dotenv

# dotenv_path = os.path.abspath(
#     os.path.join(os.path.dirname(__file__), "../../.env")
# )
# load_dotenv(dotenv_path=dotenv_path)

from dotenv import load_dotenv
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "../../.env"))
# load_dotenv()


# sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from db.db_init import db_start



class Db:
    _instance = None
    # _DB_PATH = os.getenv('DB_PATH')
    # _DB_PATH = './../db/components.db'


    def __new__(cls):
        if not hasattr(cls, '_instance') or cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance


    def __init__(self):
        if not hasattr(self, '_initialized'):
            dotenv_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../.env"))
            load_dotenv(dotenv_path=dotenv_path)

            raw_path = os.getenv('DB_PATH')
            if raw_path is None:
                raise ValueError("DB_PATH не задан в .env!")

            # Перевод относительного пути в абсолютный относительно src/
            base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))  # src/
            abs_db_path = os.path.abspath(os.path.join(base_dir, raw_path))
            
            if not os.path.exists(abs_db_path):
                raise FileNotFoundError(f"Файл БД не найден по пути: {abs_db_path}")

            self._DB_PATH = abs_db_path
            self._initialized = True  # предотвращает повторную инициализацию


    def __del__(self):
        type(self)._instance = None
        

    def create_entity(self, table_name, **kwargs):
        try:
            with sq.connect(self._DB_PATH) as con:
                keys = list(kwargs.keys())
                values = list(kwargs.values())
                columns = ', '.join(keys)
                placeholders = ", ".join(["?"] * len(keys))
                con.execute(
                    f"INSERT INTO {table_name} ({columns}) VALUES ({placeholders})",
                    values
                )
                con.commit()
        except Exception as e:
            raise Exception(f'db error -> {str(e)}')


    def fetch_data(self, table_name, **kwargs):
        try:
            with sq.connect(self._DB_PATH) as con:
                cursor = con.execute(f"SELECT * FROM {table_name}")
                return cursor.fetchall()
        except Exception as e:
            raise Exception(f'db error -> {str(e)} -> {self._DB_PATH} -> {os.getcwd()}')


    def delete_entity(self, table_name, **kwargs):
        try:
            with sq.connect(self._DB_PATH) as con:
                keys = list(kwargs.keys())
                values = list(kwargs.values())
                condition = f"{keys[0]}=?"
                con.execute(f"DELETE FROM {table_name} WHERE {condition}", (values[0],))
                con.commit()
                cursor = con.execute(f"SELECT * FROM {table_name}")
                return cursor.fetchall()
        except Exception as e:
            raise Exception(f'db error -> {str(e)}')