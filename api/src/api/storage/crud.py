import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from db.operations import Db
from storage.schemas import storage_elem

table = 'storage'

def get_storage():
    connection = Db()
    try:
        result = connection.fetch_data(table_name=table)
        return {
            'success': True,
            'storage': result
        }
    except Exception as e:
        # print()
        return {
            'succes': False,
            'Exception': {
                'args': e.args,
                'type': e.__class__.__name__,
                'traceback': str(e.__traceback__),
                'exept': str(e)
            }
        }
       
        
def delete_elem(elem_id):
    connection = Db()
    try:
        result = connection.delete_entity(table_name=table, id=elem_id)
        return {
            'success': True,
            'sites': result
        }
    except Exception as e:
        # print()
        return {
            'succes': False,
            'Exception': {
                'args': e.args,
                'type': e.__class__.__name__,
                'traceback': str(e.__traceback__),
                'exept': str(e)
            }
        }
        
        
def add_storage_entity(element: storage_elem):
    done_element = element.model_dump()
    connection = Db()
    try:
        connection.create_entity(table_name=table,articul = element.articul, name = element.name,unit = element.unit, count=element.count, date = element.date)
        return {
            'success': True,
            'element': done_element
        }
    except Exception as e:
        # print()
        return {
            'succes': False,
            'Exception': {
                'args': e.args,
                'type': e.__class__.__name__,
                'traceback': str(e.__traceback__),
                'exept': str(e)
            }
        }