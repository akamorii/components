import sqlite3 as db
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from dotenv import load_dotenv


load_dotenv()
DB_PATH = os.getenv('DB_PATH')


def db_start():
    with db.connect(DB_PATH) as con:
        con.execute("""
            CREATE TABLE IF NOT EXISTS storage(
                id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                articul TEXT NOT NULL,
                name TEXT NOT NULL,
                unit TEXT NOT NULL,
                count INTEGER NOT NULL,
                date TEXT NOT NULL
            )
        """)
        
        con.execute("""
            CREATE TABLE IF NOT EXISTS orders(
                id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                order_item INTEGER,
                count TEXT NOT NULL,
                deadline TEXT NOT NULL,
                FOREIGN KEY (order_item) REFERENCES storage (id)
                );
            """)
        
        con.execute("""
            CREATE TABLE IF NOT EXISTS income(
                id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                count TEXT NOT NULL,
                date TEXT,
                income_item INTEGER,
                FOREIGN KEY (income_item) REFERENCES storage (id)
                )
        """)
        
if __name__ == '__main__':
    # print(DB_PATH)
    db_start()